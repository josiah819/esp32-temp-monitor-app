// app.config.js
export default {
  expo: {
    name: "ESP32 Temp Monitor",
    slug: "esp32-temp-monitor-app",
    scheme: "esp32temp",
    version: "0.1.0",
    extra: { API_BASE_URL: "https://esp32-node-bridge-production.up.railway.app" }, // <-- put your Railway URL here
    android: {
      package: "com.josiah.esp32tempmonitorapp" // <-- pick a unique, all-lowercase package
    }
  }
};
