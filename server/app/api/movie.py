from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy 
<<<<<<< HEAD
from app.models import User, Movie, Show, Room, Seat, Ticket, Bill
=======
from app.models import User, Movie, Review, Show, Room, Seat, Ticket, Drink, Bill
>>>>>>> 8ee759442f944388b06f246d7b73263c7a0b9e41
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
<<<<<<< HEAD
    # page = request.args.get('page', 1, type=int)
    # per_page = min(request.args.get('per_page', 10, type=int), 100)
    # data = Movie.to_collection_dict(Movie.query, page, per_page, 'api.get_movies')
    # return jsonify(data)

    data = Movie.query.all()
    datas = []
    for movie in data:
        datas.append(movie.to_dict())
    return jsonify(datas)
=======
    page = request.args.get('page', 1, type=int)
    per_page = min(request.args.get('per_page', 10, type=int), 100)
    data = Movie.to_collection_dict(Movie.query, page, per_page, 'api.get_movies')
    return jsonify(data)
>>>>>>> 8ee759442f944388b06f246d7b73263c7a0b9e41

@bp.route('/api/movie/create', methods=['POST'])
@cross_origin()
def create():
    data = request.get_json()

    if 'name' not in data or 'description' not in data or 'poster' not in data or 'duration' not in data or 'genre' not in data:
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

    if 'id' not in data:
        return bad_request("must have movie id")    
    
    movie = Movie.query.filter_by(id = data["id"]).first()
    if not movie:
        return bad_request('movie id ko ton tai')


    if 'name' in data:
        movie.name = data["name"]

    if 'description' in data:
        movie.description = data["description"]

    if 'poster' in data:
        movie.poster = data["poster"]

    if 'duration' in data:
        movie.duration = data["duration"]

    if 'genre' in data:
        movie.genre = data["genre"]

    db.session.commit()
    response = jsonify(movie.to_dict())
    response.status_code = 201
    return response

# @bp.route('/api/movie/delete', methods=['DELETE'])
# @cross_origin()
# Có nên khi xóa phim sẽ xóa hết review,... liên quan đến phim ko
