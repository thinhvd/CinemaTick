from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie,  Show, Room, Seat, Ticket,  Bill, Admin
from app import db
from app.api.erorrs import bad_request, error_response
from app.api import bp
from flask_cors import CORS, cross_origin
from werkzeug.security import generate_password_hash, check_password_hash

@bp.route('/api/admin/signup', methods=['POST'])
@cross_origin()
def sign_up_admin():
    data = request.get_json()
    session.permanent = True

    if 'username' not in data or 'password' not in data:
        return bad_request('must include username and password fields')
    
    username = data['username']
    password = data['password']

    if (username == "" or password == ""):
        return bad_request('must include username and password fields')


    found_admin = Admin.query.filter_by(username = username).first()
    if found_admin: 
        return bad_request('please use a different username address')
    
    # Hash passwork
    password_hash = generate_password_hash(password, 'pbkdf2')


    # add admin
    admin = Admin(username = username, password_hash = password_hash)
    db.session.add(admin)
    db.session.commit()
    response = jsonify(admin.to_dict())
    response.status_code = 201
    return response


@bp.route('/api/admin/login', methods=['POST'])
@cross_origin()
def login_admin():
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return bad_request('must include username and password fields')
    

    username = data["username"]
    password = data["password"]

    if (username == "" or password == ""):
        return bad_request('must include username and password fields')
    session.permanent = True

    admin = Admin.query.filter_by(username = username).first()
    
    if admin:
        if check_password_hash(admin.password_hash, password):
            data = admin.to_dict()
            response = jsonify(data)
            response.status_code = 201
            return response
        else:
            return bad_request("username or password not true")
    else:
        return bad_request("username or password not true")
