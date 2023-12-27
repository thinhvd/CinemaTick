from app import app

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
<<<<<<< HEAD
    app.run(host='0.0.0.0', port=5001)
=======
    app.run(host='0.0.0.0', port=1002)
>>>>>>> 8ee759442f944388b06f246d7b73263c7a0b9e41
