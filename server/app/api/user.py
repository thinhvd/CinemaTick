from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
from app.models import User, Movie, Review, Show, Room, Seat, Ticket, Drink, Bill
from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from app.api.erorrs import bad_request, error_response
from app.api import bp

@bp.route('/api/user/sign_up', methods=['POST'])
def sign_up():
    data = request.get_json()
    session.permanent = True

    if 'username' not in data or 'email' not in data or 'password' not in data:
        return bad_request('must include username, email and password fields')
    
    username = data["username"]
    password = data["password"]
    email = data["email"]
    phone_number = data["phone_number"]

    found_user = User.query.filter_by(username = username).first()
    if found_user: 
        return bad_request('please use a different username')

    found_user = User.query.filter_by(email = email).first()
    if found_user: 
        return bad_request('please use a different email address')

    found_user = User.query.filter_by(phone_number = phone_number).first()
    if found_user: 
        return bad_request('please use a different phone number')
    
    # Hash passwork
    password_hash = generate_password_hash(password)
    # add user
    user = User(username = username, email = email, phone_number = phone_number, password_hash = password_hash)
    db.session.add(user)
    db.session.commit()
    response = jsonify(user.to_dict())
    response.status_code = 201
    return response

@bp.route('/api/user/<int:id>', methods=['GET'])
def get_user(id):
    return jsonify(User.query.get_or_404(id).to_dict())

@bp.route('/api/users', methods=['GET'])
def get_users():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = User.to_collection_dict(User.query, page, per_page, 'get_users')
    return jsonify(data)

@bp.route('/api/user/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'username' not in data or 'password' not in data:
        return bad_request('must include username and password fields')
    

    username = data["username"]
    password = data["password"]
    session.permanent = True

    user = User.query.filter_by(username = username).first()
    
    if user :
        if check_password_hash(user.passwork_hash, password):
            response = jsonify(user.to_dict())
            response.status_code = 201
            return response
        else:
            return bad_request("username or password not true")
    else:
        return bad_request("username or password not true")
     
@bp.route('/api/user/chance_pass', methods=['PUT'])
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
        user.password_hash = generate_password_hash(new_pass)
        db.session.commit()
        return "thanh cong"
    else:
        return bad_request("Old not true")

@bp.route('/api/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    User.query.filter_by(id = id).delete()
    db.session.commit()
    return "thanh cong" # luon thanh cong du co hay ko co ID trong DB