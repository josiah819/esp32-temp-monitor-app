import React, { useCallback, useState } from "react";
import { View, Text, FlatList, RefreshControl, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { fetchDevices } from "../api";
import { getUnit, toDisplayTempC } from "../settings";
import type { RootStackParamList } from "../App";

type Nav = NativeStackNavigationProp<RootStackParamList, "Devices">;

export default function DeviceList() {
  const nav = useNavigation<Nav>();
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unit, setUnit] = useState<"C"|"F">("C");

  const load = async () => {
    try {
      setLoading(true);
      const [data, u] = await Promise.all([fetchDevices(), getUnit()]);
      setItems(data);
      setUnit(u);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => { load(); }, []));

  const renderItem = ({ item }: any) => {
    const val = toDisplayTempC(item.temperature_c, unit);
    return (
      <TouchableOpacity onPress={() => nav.navigate("Detail", { device_id: item.device_id, sensor_id: item.sensor_id })}>
        <View style={styles.row}>
          <View style={{flex:1}}>
            <Text style={styles.title}>{item.device_id}</Text>
            <Text style={styles.sub}>{item.sensor_id || "temp-1"}</Text>
          </View>
          <View style={{alignItems:"flex-end"}}>
            <Text style={styles.temp}>{val.toFixed(2)}°{unit}</Text>
            <Text style={styles.time}>{new Date(item.timestamp).toLocaleString()}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Devices</Text>
        <TouchableOpacity onPress={() => nav.navigate("Settings")}><Text style={styles.link}>Settings</Text></TouchableOpacity>
      </View>
      <FlatList
        data={items}
        keyExtractor={(x) => x.device_id + (x.sensor_id||"")}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ItemSeparatorComponent={() => <View style={{height:1, backgroundColor:"#eee"}}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:"#fff" },
  header: { paddingHorizontal:16, paddingTop:12, paddingBottom:8, flexDirection:"row", justifyContent:"space-between", alignItems:"center" },
  h1: { fontSize:20, fontWeight:"600" },
  link: { color:"#3b82f6", fontSize:16 },
  row: { padding:16, flexDirection:"row", alignItems:"center" },
  title: { fontSize:18, fontWeight:"600" },
  sub: { color:"#666" },
  temp: { fontSize:18, fontWeight:"700" },
  time: { color:"#666", fontSize:12 },
});
