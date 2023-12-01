from datetime import datetime
from app import db
from flask import url_for

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

class User(PaginatedAPIMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phone_number = db.Column(db.String(10), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    # Relationships
    tickets = db.relationship('Ticket', backref='user', lazy='dynamic')
    bills = db.relationship('Bill', backref='user', lazy='dynamic')

    def __repr__(self):
        return '<User {}>'.format(self.username)
    
    def to_dict(self):
        data = {
            'id': self.id,
            'username': self.username,
            'email' : self.email,
            'phone_number' : self.phone_number
        }

        return data


class Movie(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30))
    description = db.Column(db.String(200))
    duration = db.Column(db.Integer)
    genre = db.Column(db.String(10))
    rating = db.Column(db.Float)

    # Relationships
    reviews = db.relationship('Review', backref='movie', lazy='dynamic')

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))

class Show(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    room_id = db.Column(db.Integer, db.ForeignKey('room.id'))
    schedule = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Relationships
    seats = db.relationship('Seat', backref='show', lazy='dynamic')
    tickets = db.relationship('Ticket', backref='show', lazy='dynamic')

class Room(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    screen_type = db.Column(db.String(20))
    num_of_seats = db.Column(db.Integer)

    # Relationships
    shows = db.relationship('Show', backref='room', lazy='dynamic')

class Seat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))
    status = db.Column(db.String(10))
    seat_type = db.Column(db.String(10))
    price = db.Column(db.Float)

    # Relationships
    tickets = db.relationship('Ticket', backref='seat', lazy='dynamic')

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    show_id = db.Column(db.Integer, db.ForeignKey('show.id'))
    seat_id = db.Column(db.Integer, db.ForeignKey('seat.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Drink(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    bill_id = db.Column(db.Integer, db.ForeignKey('bill.id'))

class Bill(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    num_of_tickets = db.Column(db.Integer)
    total_price = db.Column(db.Float)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    schedule = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Relationships
    drinks = db.relationship('Drink', backref='bill', lazy='dynamic')


