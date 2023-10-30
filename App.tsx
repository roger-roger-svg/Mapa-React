import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location"; //permissao para acessar a localizacao do usuario
import { useEffect, useState } from "react";
import MapView from "react-native-maps";

export default function App() {
  const [location, setLocation] = useState<LocationObject | null>(null);

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
      console.log("localizacao atual =>", currentPosition);
    }
  }
  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.mapa} />
    </View>
  );
}
