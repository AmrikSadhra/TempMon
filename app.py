#!/usr/bin/env python
from threading import Thread
from datetime import datetime

import os

from app import app, RoomData
from random import randint
import time
import schedule as schedule


def run_periodic():
    while 1:
        schedule.run_pending()
        time.sleep(1)


def update_temperature():
    temperature_record = RoomData.TempRecord(date=datetime.now(), temperature=randint(0, 30))
    print("Updating Database at {} with temperature of {} C".format(temperature_record.date, temperature_record.temperature))
    temperature_record.save()


if __name__ == '__main__':
    # Two threads are started in debug mode, meaning two db updates; to avoid disabling debug reloader, only do db update on main thread
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        schedule.every(1).minutes.do(update_temperature)
        t = Thread(target=run_periodic)
        t.daemon = True
        t.start()
    app.run()
