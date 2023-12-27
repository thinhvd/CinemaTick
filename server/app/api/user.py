from flask import Flask, request, session, jsonify

from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required

from app.models import User, Movie, Show, Room, Seat, Ticket, Bill

from app import db
from app import jwt
from werkzeug.security import generate_password_hash, check_password_hash
from app.api.erorrs import bad_request, error_response
from app.api import bp
from app import api
from app import mail


from app.email import send_password_reset_email

from flask_cors import CORS, cross_origin

@bp.route('/api/user/signup', methods=['POST'])
@cross_origin()
def sign_up():
    data = request.get_json()
    session.permanent = True

    if 'fullname' not in data or 'email' not in data or 'password' not in data or 'phone_number' not in data:
        return bad_request('must include fullname, email and password fields')
    
    fullname = data["fullname"]
    password = data["password"]
    email = data["email"]
    phone_number = data["phone_number"]

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
    return user.password_hash

from flask_cors import CORS, cross_origin

import string, secrets

    
@bp.route('/api/user/<int:id>', methods=['GET'])
@cross_origin()
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())

@bp.route('/api/users', methods=['GET'])
@cross_origin()
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = User.to_collection_dict(User.query, page, per_page, 'api.get_users')
    return jsonify(data)

     
@bp.route('/api/user/change_pass', methods=['PUT'])
@cross_origin()
def chance_pass():
    data = request.get_json()
    if 'new_pass' not in data or 'id' not in data or 'old_pass' not in data:
        return bad_request('must include id , new_pass, old_pass fields')
    
    id = data["id"]
    new_pass = data["new_pass"]
    old_pass = data["old_pass"]
    session.permanent = True

    user = User.query.filter_by(id = id).first()
    if check_password_hash(user.password_hash, old_pass):
        user.password_hash = generate_password_hash(new_pass, 'pbkdf2')
        db.session.commit()
        return "thanh cong"
    else:
        return bad_request("Old not true")

@bp.route('/api/user/reset_pass_request', methods=['POST'])
@cross_origin()
def reset_pass_request():
    data = request.get_json()
    if 'email' not in data :
        return bad_request('must include email fields')
    email = data['email']
    user = User.query.filter_by(email=email).first()
    new_pass = user.generate_new_pass()

    if user:
        send_password_reset_email(user, new_pass)
        user.password_hash = generate_password_hash(new_pass, 'pbkdf2')
        db.session.commit()

    response = jsonify(user.to_dict())
    response.status_code = 201
    return response

@bp.route('/api/user/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_user(id):
    User.query.filter_by(id = id).delete()
    db.session.commit()
    return "thanh cong" # luon thanh cong du co hay ko co ID trong DB
