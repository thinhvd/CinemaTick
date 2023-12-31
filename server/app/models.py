from datetime import datetime, timedelta
from time import time
from app import db, login
from app import app

import string
import secrets
import random
from flask import url_for

from flask_login import UserMixin

import jwt

class PaginatedAPIMixin(object):
    @staticmethod
    def to_collection_dict(query, page, per_page, endpoint, **kwargs):
        resources = query.paginate(page=page, per_page=per_page,
                                   error_out=False)
        data = {
            'items': [item.to_dict() for item in resources.items],
            '_meta': {
                'page': page,
                'per_page': per_page,
                'total_pages': resources.pages,
                'total_items': resources.total
            },
            '_links': {
                'self': url_for(endpoint, page=page, per_page=per_page,
                                **kwargs),
                'next': url_for(endpoint, page=page + 1, per_page=per_page,
                                **kwargs) if resources.has_next else None,
                'prev': url_for(endpoint, page=page - 1, per_page=per_page,
                                **kwargs) if resources.has_prev else None
            }
        }
        return data

class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    password_hash = db.Column(db.String(128))

class User(PaginatedAPIMixin, UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    fullname = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phone_number = db.Column(db.String(10), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    # Relationships
    tickets = db.relationship('Ticket', backref='user', lazy='dynamic')
    bills = db.relationship('Bill', backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.fullname)

    def to_dict(self):
        data = {
            'id': self.id,
            'fullname': self.fullname,
            'email' : self.email,
            'phone_number' : self.phone_number
        }

        return data
    
    # function for reset password request
    def generate_new_pass(self):
        characters = string.ascii_letters + string.digits
        new_pass = ''.join(secrets.choice(characters) for _ in range(6))

        return new_pass

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))
    
class Movie(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    description = db.Column(db.String(200))
    poster = db.Column(db.String(200))
    duration = db.Column(db.Integer)
    genre = db.Column(db.String(10))
    rating = db.Column(db.Float)

    # Relationships

    def to_dict(self):
        data = {
            'id': self.id,
            'name' : self.name,
            'description' : self.description,
            'poster' : self.poster,
            'duration' : self.duration,
            'genre' : self.genre,
            'rating' : self.rating
        }

        return data

class Show(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    schedule = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    ticket_cost = db.Column(db.Integer)

    # Relationships
    seats = db.relationship('Seat', backref='show', lazy='dynamic')
    tickets = db.relationship('Ticket', backref='show', lazy='dynamic')
    movies = db.relationship('Movie', backref='show')

    def to_dict(self):
        data = {
            'id': self.id,
            'room_id' : self.room_id,
            'movie_id' : self.movie_id,
            'schedule' : self.schedule,
            'ticket_cost' : self.ticket_cost
        }

        return data
    

class Room(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    screen_type = db.Column(db.String(20))
    num_of_seats = db.Column(db.Integer)

    # Relationships
    shows = db.relationship('Show', backref='room', lazy='dynamic')

    def to_dict(self):
        data = {
            'id': self.id,
            'screen_type': self.screen_type,
            'num_of_seats' : self.num_of_seats,
        }

        return data

class Seat(PaginatedAPIMixin,db.Model):
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))
    status = db.Column(db.String(10))
    seat_type = db.Column(db.String(10))
    position = db.Column(db.String(5))
    price = db.Column(db.Float)
    

    # Relationships
    tickets = db.relationship('Ticket', backref='seat', lazy='dynamic')

    def to_dict(self):
        data = {
            'id': self.id,
            'show_id' : self.show_id,
            'status' : self.status,
            'seat_type' : self.seat_type,
            'position' : self.position,
            'price' : self.price,
        }

        return data

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))
    seat_id = db.Column(db.Integer, db.ForeignKey('seat.id'))
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num_of_tickets = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    schedule = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    bill_code = db.Column(db.String(6), unique=True)

    # Relationships
    tickets = db.relationship('Ticket', backref='bill', lazy='dynamic')

    def generate_bill_code(self):
        characters = string.ascii_uppercase + string.digits
        self.bill_code = ''.join(secrets.choice(characters) for _ in range(6))

    def to_dict_for_user(self):
        data = {
            'id': self.id,
            'num_of_tickets' : self.num_of_tickets,
            'total_price' : self.total_price,
            'user_id' : self.user_id,
            'schedule' : self.schedule,
            'bill_code' : self.bill_code,
        }
        return data
