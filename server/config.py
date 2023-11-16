import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'vu-ngu'
    SQLALCHEMY_DATABASE_URI = "mysql://fall2324w20g8:cinematick8@10.110.77.167/fall2324w20g8_cinemtatick"
    
    