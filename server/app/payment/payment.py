import json
from flask import Flask, request, session, jsonify, render_template, redirect
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required
from app import db
from app import jwt
from app.api.erorrs import bad_request, error_response
from app.models import User, Movie,  Show, Room, Seat, Ticket,  Bill
from app.payment import bp
from app import auth

from datetime import datetime, timedelta, timezone

from flask_cors import CORS, cross_origin

from config import Config
from app.payment.vnpay import vnpay

@bp.route('/payment', methods=['GET','POST'])
@cross_origin()
@jwt_required()
def payment():
    if request.method == 'POST':
        data = request.get_json()

        #Process input data and build url payment
        order_type = 190001 # Vé xem phim
        order_id = datetime.now().strftime('%Y%m%d%H%M%S')
        amount = data['price']
        order_desc = data['message'] # "THONG TIN VE: seat id:[], movie name:, show id: "
        current_user = get_jwt_identity()
        order_desc = order_desc + f", user id: {current_user}"

        bank_code = ""
        language = 'vn'
        ipaddr = get_client_ip(request)

        vnp = vnpay()
        vnp.requestData['vnp_Version'] = '2.1.0'
        vnp.requestData['vnp_Command'] = 'pay'
        vnp.requestData['vnp_TmnCode'] = Config.VNPAY_TMN_CODE
        vnp.requestData['vnp_Amount'] = str(100 * int(amount))
        vnp.requestData['vnp_CurrCode'] = 'VND'
        vnp.requestData['vnp_TxnRef'] = order_id
        vnp.requestData['vnp_OrderInfo'] = order_desc
        vnp.requestData['vnp_OrderType'] = order_type
        vnp.requestData['vnp_Locale'] = language
                # Check bank_code, if bank_code is empty, customer will be selected bank on VNPAY
        
        if bank_code and bank_code != "":
            vnp.requestData['vnp_BankCode'] = bank_code

        vnp.requestData['vnp_CreateDate'] = datetime.now().strftime('%Y%m%d%H%M%S')  # 20150410063022
        vnp.requestData['vnp_IpAddr'] = ipaddr
        vnp.requestData['vnp_ReturnUrl'] = Config.VNPAY_RETURN_URL
        vnpay_payment_url = vnp.get_payment_url(Config.VNPAY_PAYMENT_URL, Config.VNPAY_HASH_SECRET_KEY)
        print(vnpay_payment_url)
        response = {
            "payment_url": vnpay_payment_url
        }
        return jsonify(response)
    

@bp.route('/payment_return', methods=['GET','POST'])
@cross_origin()
def payment_return():
    inputData = request.args
    if inputData:
        vnp = vnpay()
        vnp.responseData = inputData.to_dict()
        order_id = inputData['vnp_TxnRef']
        amount = int(inputData['vnp_Amount']) / 100
        order_desc = inputData['vnp_OrderInfo']
        vnp_TransactionNo = inputData['vnp_TransactionNo']
        vnp_ResponseCode = inputData['vnp_ResponseCode']
        vnp_TmnCode = inputData['vnp_TmnCode']
        vnp_PayDate = inputData['vnp_PayDate']
        vnp_BankCode = inputData['vnp_BankCode']
        vnp_CardType = inputData['vnp_CardType']
        if vnp.validate_response(Config.VNPAY_HASH_SECRET_KEY):
            if vnp_ResponseCode == '00':
                payment_info = order_desc
                # Tách seat_id
                seat_id_start = payment_info.find("seat id:[") + len("seat id:[")
                seat_id_end = payment_info.find("]", seat_id_start)
                seat_id_str = payment_info[seat_id_start:seat_id_end]
                seat_id = [int(x.strip()) for x in seat_id_str.split(',')]

                # Tách movie_name
                movie_name_start = payment_info.find("movie name:") + len("movie name:")
                movie_name_end = payment_info.find(",", movie_name_start)
                movie_name = payment_info[movie_name_start:movie_name_end].strip()

                # Tách show_id
                show_id_start = payment_info.find("show id:") + len("show id:")
                show_id_end = payment_info.find(",", show_id_start)
                show_id_str = payment_info[show_id_start:show_id_end].strip()
                show_id = int(show_id_str)

                # Tách user_id
                user_id_start = payment_info.find("user id:") + len("user id:")
                user_id_str = payment_info[user_id_start:].strip()
                current_user_id = int(user_id_str)
                
                # Lấy giờ hiện tại cho lịch tạo bill
                utc_now = datetime.utcnow()
                utc_offset = timedelta(hours=7)
                utc_plus_7 = utc_now + utc_offset
                current_datetime = utc_plus_7.strftime('%Y-%m-%d %H:%M:%S')

                seats = []
                positions = []
                for s_id in seat_id:
                    seat = Seat.query.get(s_id)
                    if seat is None:
                        return bad_request('seat_id not true')
                    
                    if seat.status == 'occupied':
                        return bad_request('GHẾ HIỆN TẠI ĐÃ CÓ NGƯỜI KHÁC ĐẶT')
                    seats.append(seat)
                
                show = Show.query.get(seats[0].to_dict()['show_id']).to_dict()

                for seat in seats:
                    positions.append(seat.position)
                    seat.status = 'occupied'

                # creat bill
                bill = Bill(num_of_tickets = len(seat_id), total_price = amount, user_id = current_user_id, 
                            schedule = current_datetime, bill_code = None)
                
                bill.generate_bill_code()
                db.session.add(bill)
                db.session.commit()
                
                # creat ticket
                for seat in seats:
                    ticket = Ticket(show_id = show['id'], seat_id = seat.id, bill_id = bill.id, user_id = current_user_id)
                    db.session.add(ticket)
                db.session.commit()

                bill_data = bill.to_dict_for_user()
                bill_data['positions'] = positions
                bill_data['movie_name'] = movie_name

                #return jsonify(bill_data)
                return render_template( 'payment_return.html', title="Kết quả thanh toán",
                                                               result = "Thành công", order_id= order_id,
                                                               amount = amount,
                                                               order_desc = order_desc,
                                                               vnp_TransactionNo = vnp_TransactionNo,
                                                               vnp_ResponseCode = vnp_ResponseCode,
                                                               movie_name = bill_data['movie_name'],
                                                               num_of_ticket = bill_data['num_of_tickets'],
                                                                schedule = bill_data['schedule'],
                                                                bill_code = bill_data['bill_code'],
                                                                show_schedule = show['schedule'],
                                                                positions = ', '.join(bill_data['positions'])
                                                               )

            else:
                #return f"Thanh toán lỗi, mã lỗi: {vnp_ResponseCode}"
                return render_template( 'payment_return.html', title= "Kết quả thanh toán",
                                                               result= "Lỗi", order_id= order_id,
                                                               amount= amount,
                                                               order_desc= order_desc,
                                                               vnp_TransactionNo= vnp_TransactionNo,
                                                               vnp_ResponseCode= vnp_ResponseCode)
        else:
            return f"Sai checksum, mã lỗi {vnp_ResponseCode}"

def get_client_ip(request):
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.remote_addr
    return ip


