from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie,  Show, Room, Seat, Ticket, Bill
from app import db
from app.api.erorrs import bad_request, error_response
from app.api import bp
from flask_cors import CORS, cross_origin
from flask_jwt_extended import jwt_required
def create_seat(show): 
    col = 12
    start_ch = 'A'
    end_ch = 'H'

    start = ord(start_ch)
    stop = ord(end_ch) + 1
    my_range = range(start, stop)

    for ch in my_range:
        for i in range(1,col+1):    
            position = chr(ch) + str(i)
            if ((i>3 and i<10) and (ch>66 and ch<71)):
                seat = Seat(show_id = show.id, status = "empty", seat_type = "vip", price = round(show.ticket_cost * 1.25), position = position)
                db.session.add(seat)
            else :
                seat = Seat(show_id = show.id, status = "empty", seat_type = "basic", price = round(show.ticket_cost), position = position)
                db.session.add(seat)

    db.session.commit()
    

@bp.route('/api/seat/<int:id>', methods=['GET'])
@cross_origin()
@jwt_required()
def get_seat(id):
    return jsonify(Seat.query.get_or_404(id).to_dict())

@bp.route('/api/seats/<int:show_id>', methods=['GET'])
@cross_origin()
def get_seats_by_show_id(show_id):
    show = Show.query.get(show_id).to_dict()
    movie = Movie.query.get(show['movie_id']).to_dict()
    room = Room.query.get(show['room_id']).to_dict()
    seats = Seat.query.filter_by(show_id=show_id)
    datas = []
    for seat in seats:
        datas.append(seat.to_dict())

    return {
        'room' : room['id'],
        'movie_name' : movie['name'],
        'schedule' : show['schedule'],
        'datas': datas
    }
    


@bp.route('/api/seat/update', methods=['POST'])
@cross_origin()
@jwt_required()
def update_seat(): 
    data = request.get_json()
    response = []
    
    for seat_update in data:
        if 'status' not in seat_update or 'id' not in seat_update:
            return bad_request('must include input data fields')
        seat = Seat.query.get(seat_update['id'])

        if not seat:
            return bad_request('seat id ko ton tai')

        seat.status = seat_update['status']
        response.append(seat.to_dict())

    db.session.commit()
    
    response = jsonify(response)
    response.status_code = 201
    return response




