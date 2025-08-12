import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeviceList from "./screens/DeviceList";
import DeviceDetail from "./screens/DeviceDetail";
import Settings from "./screens/Settings";

export type RootStackParamList = {
  Devices: undefined;
  Detail: { device_id: string, sensor_id?: string };
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Devices" component={DeviceList} options={{ title: "ESP32 Temps" }} />
        <Stack.Screen name="Detail" component={DeviceDetail} options={{ title: "Sensor" }} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
