import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import type { RootStackParamList } from "../App";
import { fetchHistory } from "../api";
import { VictoryChart, VictoryLine, VictoryAxis, VictoryZoomContainer } from "victory-native";
import { getUnit, toDisplayTempC } from "../settings";

type R = RouteProp<RootStackParamList, "Detail">;

export default function DeviceDetail() {
  const route = useRoute<R>();
  const { device_id } = route.params;
  const [pts, setPts] = useState<{x:number, y:number}[]>([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState<"C"|"F">("C");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [data, u] = await Promise.all([fetchHistory(device_id), getUnit()]);
      setUnit(u);
      const mapped = (data || []).map((p: any) => ({ x: new Date(p.t), y: toDisplayTempC(p.v, u) }));
      setPts(mapped);
      setLoading(false);
    })();
  }, [device_id]);

  if (loading) return <View style={styles.center}><ActivityIndicator/></View>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{device_id}</Text>
      <VictoryChart containerComponent={<VictoryZoomContainer/>}>
        <VictoryAxis fixLabelOverlap />
        <VictoryAxis dependentAxis />
        <VictoryLine data={pts} />
      </VictoryChart>
      <Text style={styles.caption}>Values shown in °{unit}. Pinch to zoom. Drag to pan.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, padding:12, backgroundColor:"#fff" },
  title: { fontSize:18, fontWeight:"600", marginBottom:8 },
  caption: { textAlign:"center", color:"#666", marginTop:8 },
  center: { flex:1, alignItems:"center", justifyContent:"center" }
});
