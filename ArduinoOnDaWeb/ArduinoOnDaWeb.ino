int incomingByte = 0;   // for incoming serial data
bool ledStatus = false;

void setup() {
  Serial.begin(57600);
  pinMode(13, OUTPUT);
  analogReference(INTERNAL);
}

void loop() {
  Serial.println(analogRead(0));
  delay(500);    

  // send data only when you receive data:
  if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = (char) Serial.read();

    if (incomingByte == '0') {
      ledStatus = !ledStatus;
    }
  }

  if(ledStatus){
    digitalWrite(13, HIGH);
  } else {
    digitalWrite(13, LOW);
  }
}
