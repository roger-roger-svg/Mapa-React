import React, { useState, useEffect } from "react";
import {
  Button,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Text,
} from "react-native";
import MapView, { Marker, Region, LatLng } from "react-native-maps";
import * as Location from "expo-location";
import wondersData from "./WonderData";
import { styles } from "./style";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState<Region | null>(null);
  const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);

  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const [wondersCoords, setWondersCoords] = useState(wondersData);

  const requestLocationPermissions = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await Location.getCurrentPositionAsync();
      setLocation(currentPosition);
      setInitialRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setRegion({
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      console.log("Localização atual =>", currentPosition);
    }
  };

  const goToWonder = (latitude: number, longitude: number) => {
    console.log(`Going to wonder at ${latitude}, ${longitude}`);

    setMarkerCoords({ latitude, longitude });
  };

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  return (
    <View style={styles.container}>
      {location && markerCoords && (
        <MapView
          region={{
            latitude: markerCoords?.latitude || 0,
            longitude: markerCoords?.longitude || 0,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          style={styles.mapa}
        >
          {location && markerCoords && <Marker coordinate={markerCoords} />}
        </MapView>
      )}
      <View style={styles.containerBotoes}>
        {wondersCoords.map((wonder, index) => (
          <TouchableHighlight
            key={index}
            onPress={() => goToWonder(wonder.latitude, wonder.longitude)}
          >
            <View style={styles.Botoes}>
              <Text>{`${wonder.flagIcon} Ir para ${wonder.name}`}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </View>
  );
}
