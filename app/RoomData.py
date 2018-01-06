from mongoengine import *
import flask_mongoengine as db

db = db.MongoEngine()


def __init__(host, database, user, password):
    uri = "mongodb://%s:%s@%s/%s" % user, password, host, database
    connect(database, host=uri)


class TempRecord(db.Document):
    date = DateTimeField(required=True)
    temperature = FloatField(required=True)
