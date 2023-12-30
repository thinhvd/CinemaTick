import json
from flask import Flask, request, session, jsonify, render_template, redirect
from app import db
from app import jwt
from app.api.erorrs import bad_request, error_response
from app.payment import bp
from app import auth

from datetime import datetime, timedelta, timezone

from flask_cors import CORS, cross_origin

from config import Config
from app.payment.vnpay import vnpay

@bp.route('/payment', methods=['GET','POST'])
def payment():
    if request.method == 'POST':
        data = request.get_json()
        current_datetime = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

        #Process input data and build url payment
        order_type = 190001 # Vé xem phim
        order_id = 1
        amount = data['amount']
        order_desc = "THANH TOAN VE XEM PHIM"
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
        return redirect(vnpay_payment_url)
    

@bp.route('/payment_return', methods=['GET','POST'])
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
                return render_template( 'payment_return.html', title="Kết quả thanh toán",
                                                               result= "Thành công", order_id= order_id,
                                                               amount= amount,
                                                               order_desc= order_desc,
                                                               vnp_TransactionNo= vnp_TransactionNo,
                                                               vnp_ResponseCode= vnp_ResponseCode)
            else:
                return render_template( 'payment_return.html', title= "Kết quả thanh toán",
                                                               result= "Lỗi", order_id= order_id,
                                                               amount= amount,
                                                               order_desc= order_desc,
                                                               vnp_TransactionNo= vnp_TransactionNo,
                                                               vnp_ResponseCode= vnp_ResponseCode)
        else:
            return render_template('payment_return.html',
                          title= "Kết quả thanh toán", result= "Lỗi", order_id= order_id, amount= amount,
                           order_desc= order_desc, vnp_TransactionNo= vnp_TransactionNo,
                           vnp_ResponseCode= vnp_ResponseCode, msg= "Sai checksum")
    else:
        return render_template("payment_return.html", title="Kết quả thanh toán", result="")

def get_client_ip(request):
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.remote_addr
    return ip


