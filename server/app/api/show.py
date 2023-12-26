from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie,  Show, Room, Seat, Ticket, Bill
from app import db
from app.api.erorrs import bad_request, error_response
from app.api.seat import get_seats_by_show_id
from app.api import bp
from flask_cors import CORS, cross_origin
from app.api.seat import create_seat

@bp.route('/api/show/<int:id>', methods=['GET'])
@cross_origin()
def get_show(id):
    show = Show.query.get_or_404(id).to_dict()
    return show



@bp.route('/api/show/movie/<int:id>', methods=['GET'])
@cross_origin()
def get_show_for_movie(id):
    shows = Show.query.filter_by(movie_id = id)
    res = []
    for show in shows:
        res.append(show.to_dict())
    return res



@bp.route('/api/shows', methods=['GET'])
@cross_origin()
def get_shows():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Show.to_collection_dict(Show.query, page, per_page, 'api.get_shows')
    return jsonify(data)

@bp.route('/api/show/create', methods=['POST'])
@cross_origin()
def create_show():
    data = request.get_json()
    if 'room_id' not in data or 'movie_id' not in data or 'schedule' not in data or 'ticket_cost' not in data:
        return bad_request("must include data fields")
    
    show = Show(room_id = data["room_id"], movie_id = data["movie_id"], schedule = data["schedule"], ticket_cost = data["ticket_cost"])
    db.session.add(show)
    db.session.commit()
    create_seat(show=show)
    response = jsonify(show.to_dict())
    response.status_code = 201
    return response