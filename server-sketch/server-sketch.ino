#include <AsyncEventSource.h>
#include <AsyncJson.h>
#include <AsyncWebSocket.h>
#include <AsyncWebSynchronization.h>
#include <ESPAsyncWebSrv.h>
#include <SPIFFSEditor.h>
#include <StringArray.h>
#include <WebAuthentication.h>
#include <WebHandlerImpl.h>
#include <WebResponseImpl.h>

#include <WiFi.h>
#include <WiFiClient.h>
#include <ESPmDNS.h>
#include <Update.h>
#include "SPIFFS.h"

const char* host = "esp32";
const char* ssid = "Tangles";
const char* password = "Jiblet!1337";

#include "DHT.h"
#define dhtPin 16
DHT dht(dhtPin, DHT22); //pin, type

AsyncWebServer server(80);
 
const char* serverIndex =
"<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8' />"
"<meta name='viewport' content='width=device-width, initial-scale=1.0' />"
"<title>Temp / Humidity</title>"
"<script type='module' crossorigin src='index.d21978af.js'></script>"
"<link rel='stylesheet' href='index.6121c6dd.css'>"
"</head><body>"
"<div id='root'></div>"
"</body></html>";

float temp;
float humidity;

String numToString(float num) {
  return String(isnan(num) ? 0.0 : num);
}

void setup(void) {

  Serial.begin(115200);

  if(!SPIFFS.begin(true)){
  Serial.println("An Error has occurred while mounting SPIFFS");
  return;
}

  WiFi.begin(ssid, password);
  Serial.println("");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (!MDNS.begin(host)) {
    Serial.println("Error setting up MDNS responder!");
    while (1) {
      delay(1000);
    }
  }

  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "text/html", serverIndex);
  });

  server.on("/api", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "application/json", "{\"temp\":" + String(temp) + ", \"humidity\": " + String(humidity) + "}");
  });

  // Route to load style.css file
  server.on("/index.d21978af.js", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.d21978af.js", "text/javascript");
  });

  // Route to load style.css file
  server.on("/index.6121c6dd.css", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(SPIFFS, "/index.6121c6dd.css", "text/css");
  });

  dht.begin();
  server.begin();
}

unsigned long previousMillis = 0;
void loop(void) {
  delay(1);

  if (millis() - previousMillis >= 1000) {
    temp = dht.readTemperature();
    humidity = dht.readHumidity();
    Serial.print("Temp: ");
    Serial.print(temp);
    Serial.print(", Humidity: ");
    Serial.println(humidity);
    previousMillis = millis();
  }
}