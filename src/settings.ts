import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_UNIT = "unit_pref"; // "C" or "F"
export async function getUnit(): Promise<"C"|"F"> {
  const v = await AsyncStorage.getItem(KEY_UNIT);
  return (v === "F" ? "F" : "C");
}
export async function setUnit(u: "C"|"F") {
  await AsyncStorage.setItem(KEY_UNIT, u);
}

export function toDisplayTempC(valueC: number, unit: "C"|"F") {
  if (unit === "F") return valueC * 9/5 + 32;
  return valueC;
}
