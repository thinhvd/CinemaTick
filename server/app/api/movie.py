from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 

from app.models import User, Movie, Show, Room, Seat, Ticket, Bill
from app import db
from app.api.erorrs import bad_request, error_response
from app.api import bp
from flask_cors import CORS, cross_origin

@bp.route('/api/movie/<int:id>', methods=['GET'])
@cross_origin()
def get_movie(id):
    return jsonify(Movie.query.get_or_404(id).to_dict())

@bp.route('/api/movies', methods=['GET'])
@cross_origin()
def get_movies():
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Movie.to_collection_dict(Movie.query.filter(Movie.name != "movieDeleted"), page, per_page, 'api.get_movies')
    return jsonify(data)

@bp.route('/api/movie/search', methods=['POST'])
@cross_origin()
def search_movie():
    input = request.get_json()
    if 'movie_name' not in input:
        return bad_request('must include input fields')
    
    if input['movie_name'] == "":
        return bad_request('must include input fields')
    
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Movie.to_collection_dict(Movie.query.filter(Movie.name != "movieDeleted",
                                                        Movie.name.like('%' + input['movie_name'] + '%')), page, per_page, 'api.search_movie')
    return jsonify(data)

@bp.route('/api/movies_nopage', methods=['GET'])
@cross_origin()
def get_movies_nopage():
    
    data = Movie.query.filter(Movie.name != "movieDeleted")
    datas = []
    for movie in data:
        datas.append(movie.to_dict())
    return jsonify(datas)

@bp.route('/api/movie/create', methods=['POST'])
@cross_origin()
def create():
    data = request.get_json()

    if 'name' not in data or 'description' not in data or 'poster' not in data or 'duration' not in data or 'genre' not in data:
        return bad_request('must include input data fields')
    
    if data['name'] == "" or data['description'] == "" or data['poster'] == "" or data['duration'] <= 0 or data['genre'] == "" :
        return bad_request('must include input data fields')

    movie_checker = Movie.query.filter_by(name = data["name"]).first()
    if movie_checker:
        return bad_request("Ten phim da ton tai")

    movie = Movie(name = data["name"], description = data["description"], poster = data["poster"], duration = data["duration"], genre = data["genre"], rating = 10.0)
    db.session.add(movie)
    db.session.commit()
    response = jsonify(movie.to_dict())
    response.status_code = 201
    return response

@bp.route('/api/movie/update', methods=['PUT'])
@cross_origin()
def update():
    data = request.get_json()

    if 'id' not in data or 'name' not in data or 'description' not in data or 'poster' not in data or 'duration' not in data or 'genre' not in data:
        return bad_request('must include input data fields')

    if data['name'] == "" or data['description'] == "" or data['poster'] == "" or data['duration'] <= 0 or data['genre'] == "" :
        return bad_request('must include input data fields')    
    
    movie = Movie.query.filter_by(id = data["id"]).first()
    if not movie:
        return bad_request('movie id ko ton tai')


    movie.name = data["name"]
    movie.description = data["description"]
    movie.poster = data["poster"]
    movie.duration = data["duration"]
    movie.genre = data["genre"]

    db.session.commit()
    response = jsonify(movie.to_dict())
    response.status_code = 201
    return response


@bp.route('/api/movie/<int:id>', methods=['DELETE'])
@cross_origin()
def delete_movie(id):
    movie = Movie.query.get_or_404(id)
    movie.name = "movieDeleted"
    db.session.commit()
    return "thanh cong" 



