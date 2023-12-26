from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie,  Show, Room, Seat, Ticket,  Bill
from app import db
from app.api.erorrs import bad_request, error_response
from app.api import bp
from flask_cors import CORS, cross_origin

@bp.route('/api/room/<int:id>', methods=['GET'])
@cross_origin()
def get_room(id):
    return jsonify(Room.query.get_or_404(id).to_dict())

@bp.route('/api/rooms', methods=['GET'])
@cross_origin()
def get_rooms():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Room.to_collection_dict(Room.query, page, per_page, 'api.get_rooms')
    return jsonify(data)

@bp.route('/api/room/create', methods=['POST'])
@cross_origin()
def create_room():
    data = request.get_json()
    if 'screen_type' not in data:
        return bad_request("must include screen_type fields")
    
    room = Room(screen_type = data["screen_type"], num_of_seats = 96)
    db.session.add(room)
    db.session.commit()
    response = jsonify(room.to_dict())
    response.status_code = 201
    return response

@bp.route('/api/room/update', methods=['PUT'])
@cross_origin()
def update_room():
    data = request.get_json()
    if 'screen_type' not in data or 'id' not in data:
        return bad_request("must include screen_type and room id fields")
    
    room = Room.query.get(data["id"])
    room.screen_type = data["screen_type"]
    db.session.commit()
    response = jsonify(room.to_dict())
    response.status_code = 201
    return response

# @bp.route('/api/room/<int:id>', methods=['DELETE'])
# @cross_origin()
# def delete(id):
#     room = Room.query.get(id)
#     if not room :
#         bad_request("Id khong ton tai")
    
#     response = jsonify(room.to_dict())
#     # Xóa room thì xóa j nữa
#     db.session.delete(room)
#     db.session.commit()
#     response.status_code = 201
#     return response