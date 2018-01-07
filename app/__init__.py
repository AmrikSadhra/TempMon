from datetime import datetime, timedelta

from flask import Flask, jsonify
from flask import render_template
from models import db

app = Flask(__name__)
app.config.from_object("app_config.Config")
db.init_app(app)

"""
Routes.
"""


@app.route('/api/get-temperature')
def get_temperature():
    data = models.RoomData.objects(date__gt=datetime.now() - timedelta(days=1)).only('date', 'temperature')
    return jsonify(data)


@app.route('/')
def index():
    return render_template('index.html')
