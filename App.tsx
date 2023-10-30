import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { styles } from "./style";
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
} from "expo-location"; //permissao para acessar a localizacao do usuario
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

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
      {location && (
        <MapView
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.mapa}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        </MapView>
      )}
    </View>
  );
}
