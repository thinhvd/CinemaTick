from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie,  Show, Room, Seat, Ticket, Bill
from app import db
from app.api.erorrs import bad_request, error_response
from app.api.seat import get_seats_by_show_id
from app.api import bp
from flask_cors import CORS, cross_origin
from app.api.seat import create_seat
import datetime

@bp.route('/api/show/<int:id>', methods=['GET'])
@cross_origin()
def get_show(id):
    show = Show.query.get_or_404(id).to_dict()
    return show

@bp.route('/api/show/movie', methods=['POST'])
@cross_origin()
def get_show_for_movie_by_day():
    data = request.get_json()
    if 'movie_id' not in data or 'time' not in data:
        return bad_request("must include data fields")
    
    if data['movie_id'] <= 0 or data['time'] == "":
        return bad_request("must include data fields")
    
    shows = Show.query.filter(Show.schedule >= data['time']
                              ,Show.schedule < datetime.datetime.strptime(data['time'], "%Y-%m-%d") + datetime.timedelta(days=1)
                              ,Show.ticket_cost > 0)
    res = []
    for show in shows:
        res.append(show.to_dict())
    return res

@bp.route('/api/show/movie/<int:id>', methods=['GET'])
@cross_origin()
def get_show_for_movie(id):
    shows = Show.query.filter(Show.movie_id == id, Show.ticket_cost >= 0)
    res = []
    for show in shows:
        res.append(show.to_dict())
    return res  



@bp.route('/api/shows', methods=['GET'])
@cross_origin()
def get_shows():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Show.to_collection_dict(Show.query.filter(Show.ticket_cost > 0), page, per_page, 'api.get_shows')
    return jsonify(data)

@bp.route('/api/show/create', methods=['POST'])
@cross_origin()
def create_show():
    data = request.get_json()
    if 'room_id' not in data or 'movie_id' not in data or 'schedule' not in data or 'ticket_cost' not in data:
        return bad_request("must include data fields")
    
    if data['room_id'] <= 0 or data['movie_id'] <= 0 or data['schedule'] == "" or data['ticket_cost'] <= 0:
        return bad_request("must include data fields")

    new_show_movie = Movie.query.get(data['movie_id'])
    new_show_hours = new_show_movie.duration // 60
    new_show_minutes = new_show_movie.duration % 60
    input_schedule_str = data['schedule']
    input_schedule = datetime.datetime.strptime(input_schedule_str, '%Y/%m/%d %H:%M:%S')
    shows = Show.query.filter(Show.room_id == data['room_id']
                              ,Show.ticket_cost > 0
                              ,Show.schedule >= datetime.datetime.strptime(data['schedule'], '%Y/%m/%d %H:%M:%S').date()
                              ,Show.schedule < datetime.datetime.strptime(data['schedule'], '%Y/%m/%d %H:%M:%S').date() + datetime.timedelta(days=1))
    
    for show in shows:
        
        if show.schedule <= datetime.datetime.strptime(data['schedule'], '%Y/%m/%d %H:%M:%S') + datetime.timedelta(hours=new_show_hours, minutes=new_show_minutes) and show.schedule > datetime.datetime.strptime(data['schedule'], '%Y/%m/%d %H:%M:%S'):
            return bad_request("khung h đã bị trùng1 ")
        movie = Movie.query.get(show.movie_id)
        hours = movie.duration / 60
        minutes = movie.duration % 60
        if show.schedule + datetime.timedelta(hours=hours, minutes=minutes) >= datetime.datetime.strptime(data['schedule'], '%Y/%m/%d %H:%M:%S') and show.schedule + datetime.timedelta(hours=hours, minutes=minutes) < datetime.datetime.strptime(data['schedule'], '%Y/%m/%d %H:%M:%S') + datetime.timedelta(hours=new_show_hours, minutes=new_show_minutes):
            return bad_request("khung h đã bị trùng2 ")
    
    show = Show(room_id = data["room_id"], movie_id = data["movie_id"], schedule = data["schedule"], ticket_cost = data["ticket_cost"])
    db.session.add(show)
    db.session.commit()
    create_seat(show=show)
    response = jsonify(show.to_dict())
    response.status_code = 201
    return response

@bp.route('/api/show/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_show(id):
    show = Show.query.get_or_404(id)
    seats = Seat.query.filter(Seat.show_id == id)
    for seat in seats:
        seat.status = "delete"
    show.ticket_cost = 0
    db.session.commit()
    return "thanh cong" 