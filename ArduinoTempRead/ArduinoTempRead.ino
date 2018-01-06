#include <SoftwareSerial.h>

SoftwareSerial mySerial(10, 11); // RX, TX

void setup() {
  analogReference(INTERNAL);
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  // Set the data rate for the SoftwareSerial port
  mySerial.begin(9600);
}

void loop() { // run over and over
 // Getting the voltage reading from the temperature sensor
 int reading = analogRead(A0);  
 
  // now print out the temperature
 float temperatureC = reading/9.31;
 
 Serial.println(temperatureC); 
 mySerial.println(temperatureC); 
 delay(1000);
}

 

