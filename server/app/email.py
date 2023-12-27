
from flask_mail import Message
from app import mail, app
from flask import render_template
 
def send_email(subject, sender, recipients, text_body):
    msg = Message(subject, sender=sender, recipients=recipients)
    msg.html = text_body
    mail.send(msg)

def send_password_reset_email(user, new_pass):
    send_email('[Cinematick] Reset Your Password',
               sender=app.config['MAIL_USERNAME'],
               recipients=[user.email],
               text_body=render_template('reset_password.html',
                                         user=user, new_pass=new_pass))