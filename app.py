#!/usr/bin/env python
from threading import Thread
from datetime import datetime
import time
import schedule as schedule
import serial
import os

from app import app, RoomData

ser = serial.Serial(
    port='/dev/ttyAMA0',
    baudrate=9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=1
)


def run_periodic():
    while 1:
        schedule.run_pending()
        time.sleep(1)


def update_temperature():
    try:
        temp_reading = float(ser.readline().rstrip())
    except serial.SerialException:
        temp_reading = 0.0

    temperature_record = RoomData.TempRecord(date=datetime.now(), temperature=temp_reading)
    print("Updating Database at {} with temperature of {} C".format(temperature_record.date, temperature_record.temperature))
    temperature_record.save()


if __name__ == '__main__':
    # Two threads are started in debug mode, meaning two db updates; to avoid disabling debug reloader, only do db update on main thread
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        schedule.every(5).seconds.do(update_temperature)
        t = Thread(target=run_periodic)
        t.daemon = True
        t.start()
    app.run()
