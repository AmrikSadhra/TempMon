import time
from random import randint

from flask import Flask, jsonify
from flask import render_template
from app.models import db

app = Flask(__name__)
app.config.from_object(__name__)
app.config['MONGODB_SETTINGS'] = {
    'DB': __name__
}
app.config['SECRET_KEY'] = 'SO_SECRET_WOW'
app.debug = True

db.init_app(app)

"""
Routes.
"""


@app.route('/api/get-temperature')
def get_temperature():
    data = {"time": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime()), "temperature": randint(0, 30)}
    return jsonify(data)


@app.route('/')
def index():
    return render_template('index.html')
