// app.config.js
export default {
  expo: {
    name: "ESP32 Temp Monitor",
    slug: "esp32-temp-monitor-app",
    version: "0.1.0",
    scheme: "esp32temp",
    extra: { API_BASE_URL: "https://esp32-node-bridge-production.up.railway.app" }, // <— your Railway URL
    android: {
      package: "com.josiah.esp32tempmonitorapp", // all lowercase; must be unique
      adaptiveIcon: { backgroundColor: "#ffffff" } // no foregroundImage
    },
    // No 'icon' property -> Expo uses a default
    splash: { backgroundColor: "#ffffff", resizeMode: "contain" } // no splash.image
  }
};
