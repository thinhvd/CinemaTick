import json
from flask import Flask, request, session, jsonify
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required

from app.models import User
from app import db
from app import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from app.api.erorrs import bad_request, error_response
from app.auth import bp
from app import auth

from datetime import datetime, timedelta, timezone

from flask_cors import CORS, cross_origin

@bp.route('/api/user/signup', methods=['POST'])
@cross_origin()
def sign_up():
    data = request.get_json()
    session.permanent = True

    if 'fullname' not in data or 'email' not in data or 'password' not in data:
        return bad_request('must include fullname, email and password fields')
    
    fullname = data["fullname"]
    password = data["password"]
    email = data["email"]
    phone_number = data["phone_number"]

    if (fullname == "" or password == "" or email == "" or phone_number == ""):
        return bad_request('must include fullname, email and password fields')


    found_user = User.query.filter_by(email = email).first()
    if found_user: 
        return bad_request('please use a different email address')

    found_user = User.query.filter_by(phone_number = phone_number).first()
    if found_user: 
        return bad_request('please use a different phone number')
    
    # Hash passwork
    password_hash = generate_password_hash(password, 'pbkdf2')

    # add user
    user = User(fullname = fullname, email = email, phone_number = phone_number, password_hash = password_hash)
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    return response

@bp.route('/api/user/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return bad_request('must include email and password fields')
    

    email = data["email"]
    password = data["password"]

    if (email == "" or password == ""):
        return bad_request('must include email and password fields')
    session.permanent = True

    user = User.query.filter_by(email = email).first()
    
    if user :
        if user.fullname == "userDeleted":
            return bad_request("user đã bị xóa")
        if check_password_hash(user.password_hash, password):
            access_token = create_access_token(identity=user.id)
            data = user.to_dict()
            data['access_token'] = access_token
            response = jsonify(data)
            response.status_code = 201
            return response
        else:
            return bad_request("email or password not true")
    else:
        return bad_request("email or password not true")

@bp.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

@bp.route('/api/user/logout', methods=['POST'])
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response