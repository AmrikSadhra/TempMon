#!/usr/bin/env python
from threading import Thread
from datetime import datetime, timedelta
import time
import schedule as schedule
import serial
import os

from app import app, RoomData

# Attempt to reacquire serial connection
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
        values = []
        serial_data = ser.readline().rstrip().split(',')
        # Delimit the temperatures
        for serial_read in serial_data:
            if len(serial_read) > 0:
                values.append(float(serial_read))
        # If the Pi was too slow, leading to several values on one serial line, average them
        if len(values) > 1:
            temp_reading = sum(values) / len(values)
        elif len(values) == 1:
            temp_reading = values[0]
        else:
            raise serial.SerialException
    except serial.SerialException:
        # Attempt to reacquire serial
        ser.close()
        try:
            ser.open()
        except serial.SerialException:
            print("Error reacquiring Serial port")

        # Get the last good temp reading from the database
        try:
            last_valid_record = RoomData.TempRecord.objects(date__gt=datetime.now() - timedelta(minutes=15))[0]
            temp_reading = last_valid_record.temperature
            print("Falling back to temperature at time {}".format(str(last_valid_record.date)))
        except AttributeError:
            # If we had to create the object (didn't exist in query), there is no valid older reading, skip update and log
            print("No valid temperatures within last 15 minutes, not logging.")
            return

    temperature_record = RoomData.TempRecord(date=datetime.now(), temperature=temp_reading - 2)
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
