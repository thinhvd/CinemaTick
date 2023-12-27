from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS, cross_origin
from flask_mail import  Mail


app = Flask(__name__, static_folder='../../dist', static_url_path='/')
cors = CORS(app)
app.config.from_object(Config)

jwt = JWTManager(app)
login = LoginManager(app)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

mail = Mail(app)

from app.api import bp as api_bp
app.register_blueprint(api_bp)

from app.auth import bp as auth_bp
app.register_blueprint(auth_bp)

from app import models