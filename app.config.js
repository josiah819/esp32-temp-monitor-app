// app.config.js
export default {
  expo: {
    name: "ESP32 Temp Monitor",
    slug: "esp32-temp-monitor-app",
    version: "0.1.0",
    scheme: "esp32temp",
    extra: {
      API_BASE_URL: "https://esp32-node-bridge-production.up.railway.app",
      eas: { projectId: "e5adda6d-fdac-4c0d-88fa-6bc8283512a2" }
    },
    android: {
      package: "com.josiah.esp32tempmonitorapp", // all lowercase, must be unique
      adaptiveIcon: { backgroundColor: "#ffffff" } // no foregroundImage
    },
    // No icon/splash image paths so the build won't look for missing PNGs
    splash: { backgroundColor: "#ffffff", resizeMode: "contain" }
  }
};
