from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie,  Show, Room, Seat, Ticket,  Bill
from app import db
from app.api.erorrs import bad_request, error_response
from app.api import bp
from flask_cors import CORS, cross_origin
from datetime import datetime


@bp.route('/api/bill/hitory/user/<int:id>', methods=['GET'])
@cross_origin()
def user_hitory(id):
    bills = Bill.query.filter_by(user_id = id)
    res = []

    for bill in bills:
        bill = bill.to_dict_for_user()
        tickets = Ticket.query.filter_by(bill_id = bill['id'])
        show = Show.query.get(tickets[0].show_id)
        movie = Movie.query.get(show.movie_id)
        positions = []
        for ticket in tickets:
            positions.append(Seat.query.get(ticket.seat_id).position)
        
        bill['movie_name'] = movie.name
        bill['positions'] = positions
        res.append(bill)

    return jsonify(res)


@bp.route('/api/bill/create', methods=['POST'])
@cross_origin()
def create_bill():
    data = request.get_json()

    if 'user_id' not in data or 'seat_id' not in data:
        return bad_request('must include input data fields')

    total_price = 0
    positions = []
    tickets = []
    seats = []
    count = 0
    
    

    for seat_id in data['seat_id']:
        seat = Seat.query.get(seat_id)
        if seat is None:
            return bad_request('seat_id not true')
        
        if seat.status == 'occupied':
            return bad_request('ghe cua ban da dc dat')
        seats.append(seat)
    
    show = Show.query.get(seats[0].to_dict()['show_id']).to_dict()
    movie = Movie.query.get(show['id']).to_dict()
    for seat in seats:
        count += 1
        total_price += seat.price
        positions.append(seat.position)
        seat.status = 'occupied'

    

    bill = Bill(num_of_tickets = count, total_price = total_price, user_id = data['user_id'], schedule = show['schedule'], bill_code = None)
    db.session.add(bill)
    db.session.commit()

    bill_code = bill.generate_bill_code()

    for seat in seats:
        ticket = Ticket(show_id = show['id'], seat_id = seat_id, bill_id = bill.id, user_id = data['user_id'])
        db.session.add(ticket)

    db.session.commit()

    bill = bill.to_dict_for_user()

    bill['positions'] = positions
    bill['movie_name'] = movie['name']

    return jsonify(bill)


@bp.route('/api/bill/<int:id>', methods=['GET'])
@cross_origin()
def get_bill(id):
    bill = Bill.query.get(id).to_dict_for_user()
    tickets = Ticket.query.filter_by(bill_id = bill['id'])
    show = Show.query.get(tickets[0].show_id)
    movie = Movie.query.get(show.movie_id)
    positions = []
    for ticket in tickets:
        positions.append(Seat.query.get(ticket.seat_id).position)
    
    bill['movie_name'] = movie.name
    bill['positions'] = positions

    return jsonify(bill)

@bp.route('/api/bills', methods=['GET'])
@cross_origin()
def get_bills():
    bills = Bill.query.all()
    res = []

    for bill in bills:
        bill = bill.to_dict_for_user()
        tickets = Ticket.query.filter_by(bill_id = bill['id'])
        show = Show.query.get(tickets[0].show_id)
        movie = Movie.query.get(show.movie_id)
        positions = []
        for ticket in tickets:
            positions.append(Seat.query.get(ticket.seat_id).position)
        
        bill['movie_name'] = movie.name
        bill['positions'] = positions
        res.append(bill)

    return jsonify(res)
