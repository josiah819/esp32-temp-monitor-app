# ESP32 Temp Monitor — Mobile App (Expo)

Cross-platform (Android/iOS) app that talks to your Railway bridge.

## Features
- Device list with latest temperatures
- Detail screen with interactive chart (Victory)
- Settings: set API base URL, °C/°F toggle (default °C)

## 1) Prereqs
- Node.js 18+
- Expo CLI: `npm i -g expo`
- Android: Android Studio OR use Expo Go
- iOS: Xcode (on macOS) OR use Expo Go

## 2) Install
```bash
npm install
```

## 3) Configure
- In the app, open **Settings** and set **API Base URL** to your Railway domain, e.g.
  `https://YOUR-APP.up.railway.app`

## 4) Run (dev)
```bash
npm start
```
- Scan the QR code with **Expo Go** on your phone, or press **a** to launch Android, **i** for iOS.

## 5) Build an APK / IPA
We recommend EAS (Expo Application Services).
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview   # builds an APK you can sideload
eas build -p ios --profile preview       # requires Apple Developer account
```

## Notes
- The app expects the bridge API routes:
  - `/api/devices` → list devices
  - `/api/history/:deviceId` → history
- Data is stored in Celsius in the backend; app converts to °F if you toggle it.
