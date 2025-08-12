import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { getBaseUrl, setBaseUrl } from "../api";
import { getUnit, setUnit } from "../settings";

export default function Settings() {
  const [url, setUrl] = useState("");
  const [unit, _setUnit] = useState<"C"|"F">("C");

  useEffect(() => {
    (async () => {
      const [u, pref] = await Promise.all([getBaseUrl(), getUnit()]);
      setUrl(u);
      _setUnit(pref);
    })();
  }, []);

  const save = async () => {
    try {
      await setBaseUrl(url.trim());
      await setUnit(unit);
      Alert.alert("Saved", "Settings updated!");
    } catch (e:any) {
      Alert.alert("Error", e.message || "Failed to save");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>API Base URL</Text>
      <TextInput value={url} onChangeText={setUrl} autoCapitalize="none" autoCorrect={false}
        placeholder="https://your-app.up.railway.app" style={styles.input} />

      <Text style={[styles.label, {marginTop:16}]}>Temperature Unit</Text>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => _setUnit("C")} style={[styles.pill, unit==="C" && styles.pillOn]}><Text>°C</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => _setUnit("F")} style={[styles.pill, unit==="F" && styles.pillOn]}><Text>°F</Text></TouchableOpacity>
      </View>

      <TouchableOpacity onPress={save} style={styles.button}><Text style={{color:"#fff", fontWeight:"700"}}>Save</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:16, backgroundColor:"#fff" },
  label: { fontSize:16, fontWeight:"600" },
  input: { borderWidth:1, borderColor:"#ddd", borderRadius:8, padding:10, marginTop:6 },
  row: { flexDirection:"row", gap:8, marginTop:6 },
  pill: { borderWidth:1, borderColor:"#ddd", paddingVertical:8, paddingHorizontal:14, borderRadius:999 },
  pillOn: { backgroundColor:"#e5e7eb" },
  button: { backgroundColor:"#111827", padding:14, borderRadius:10, alignItems:"center", marginTop:24 }
});
