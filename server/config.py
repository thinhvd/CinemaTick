import os
from datetime import timedelta

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'vu-ngu'

    # Config connect to localhost db (xampp)
    # userpass = 'mysql+pymysql://root:@'
    # basedir  = '127.0.0.1'
    # dbname   = '/Cinematick'
    # SQLALCHEMY_DATABASE_URI = userpass + basedir + dbname

    SQLALCHEMY_DATABASE_URI = "mysql://fall2324w20g8:cinematick8@10.96.210.203:3306/fall2324w20g8_cinematick"

    SQLALCHEMY_TRACK_MODIFICATIONS = True
    CORS_HEADERS = 'Content-Type'

    #Config token
    JWT_SECRET_KEY = "vu-thong-minh"
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    #Config mail
    MAIL_SERVER='smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'cinematickg8@gmail.com'
    MAIL_PASSWORD = 'ctce ytln jmpq mgpb'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

    #Config VNPAY payment
    VNPAY_RETURN_URL = 'http://localhost:5001/payment_return'  # get from config
    VNPAY_PAYMENT_URL = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'  # get from config
    VNPAY_API_URL = 'https://sandbox.vnpayment.vn/merchant_webapi/merchant.html'
    VNPAY_TMN_CODE = 'NK2LD6FS'  # Website ID in VNPAY System, get from config
    VNPAY_HASH_SECRET_KEY = 'SMRBLWLQHTTFISTRMYHUMHRUXYNSWJPJ'  # Secret key for create checksum,get from config