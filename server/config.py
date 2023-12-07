import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'vu-ngu'

    # Config connect to localhost db (xampp)
    # userpass = 'mysql+pymysql://root:@'
    # basedir  = '127.0.0.1'
    # dbname   = '/Cinematick'
    # SQLALCHEMY_DATABASE_URI = userpass + basedir + dbname

    SQLALCHEMY_DATABASE_URI = "mysql://fall2324w20g8:cinematick8@10.110.77.167:3306/fall2324w20g8_cinematick"

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    CORS_HEADERS = 'Content-Type'