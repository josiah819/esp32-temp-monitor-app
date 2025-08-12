import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const KEY_URL = "api_base_url";

export async function getBaseUrl(): Promise<string> {
  const v = await AsyncStorage.getItem(KEY_URL);
  return v || "https://your-app.up.railway.app"; // change in app Settings
}

export async function setBaseUrl(url: string) {
  await AsyncStorage.setItem(KEY_URL, url);
}

export async function fetchDevices() {
  const base = await getBaseUrl();
  const res = await axios.get(base + "/api/devices");
  return res.data;
}

export async function fetchHistory(deviceId: string) {
  const base = await getBaseUrl();
  const res = await axios.get(base + "/api/history/" + encodeURIComponent(deviceId));
  return res.data;
}
