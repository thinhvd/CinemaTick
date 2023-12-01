import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'vu-ngu'
    SQLALCHEMY_DATABASE_URI = "mysql://root:Dat11371!@localhost:3306/cinematick"
    # MYSQL_HOST = 'localhost'
    # MYSQL_USER = '3306'
    # MYSQL_PASSWORD = 'Dat11371!'
    # MYSQL_DB = 'cinematick'

    