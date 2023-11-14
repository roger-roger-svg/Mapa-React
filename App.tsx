import React, { useState, useEffect } from "react";
import { Button, View, FlatList, TouchableOpacity } from "react-native";
import MapView, { Marker, Region, LatLng } from "react-native-maps";
import * as Location from "expo-location";

import { styles } from "./style";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );
  const [region, setRegion] = useState<Region | null>(null);
  const [markerCoords, setMarkerCoords] = useState<LatLng | null>(null);

  const [initialRegion, setInitialRegion] = useState<Region | null>(null);

  const [wondersCoords, setWondersCoords] = useState([
    {
      name: "Cristo Redentor",
      latitude: -22.9519,
      longitude: -43.2105,
      flagIcon: "🇧🇷",
    },
    {
      name: "Grande Muralha da China",
      latitude: 40.4319,
      longitude: 116.5704,
      flagIcon: "🇨🇳",
    },
    {
      name: "Machu Picchu",
      latitude: -13.2263,
      longitude: -72.4973,
      flagIcon: "🇵🇪",
    },
    {
      name: "Chichén Itzá",
      flagIcon: "🇲🇽",
      latitude: 20.6843,
      longitude: -88.5678,
    },

    {
      name: "Coliseu",
      flagIcon: "🇮🇹",
      latitude: 41.8902,
      longitude: 12.4922,
    },
    {
      name: "Taj Mahal",
      flagIcon: "🇮🇳",
      latitude: 27.1751,
      longitude: 78.0421,
    },
    {
      name: "Ruínas de Petra",
      flagIcon: "🇯🇴",
      latitude: 30.3285,
      longitude: 35.4428,
    },
  ]);

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
      <View style={styles.containerBotoes}>
        {wondersCoords.map((wonder, index) => (
          <Button
            key={index}
            title={`${wonder.flagIcon} Ir para ${wonder.name}`}
            onPress={() => goToWonder(wonder.latitude, wonder.longitude)}
          />
        ))}
      </View>
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
    </View>
  );
}
