import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'; // Import MapViewDirections
import { UserLocationContext } from '../Context/UserLocationContext';
import Header from '../Components/Home/Header';
import { GOOGLE_MAPS_API_KEY } from '@env';
import BottomSheets from '../Components/Home/BottomSheets';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Home() {
  const { location } = useContext(UserLocationContext);
  const [mapRegion, setMapRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [origin, setOrigin] = useState(null); // Origin state to be set after location is fetched

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0421,
      });

      // Set origin once location is available
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  }, [location]);

  const handlePlaceSelected = (coordinates) => {
    // Update destination coordinates
    setDestination(coordinates);
  };

  if (!mapRegion || !origin) {
    return <View style={styles.container}><Text>Loading map...</Text></View>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header onPlaceSelected={handlePlaceSelected} />

        <MapView
          style={[styles.map, {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
          }]}
          showsUserLocation={true}
          region={mapRegion}
        >
          {origin && (
            <Marker
              coordinate={origin}
              title="Starting Point"
            />
          )}
          {destination && (
            <Marker
              coordinate={destination}
              title="Destination Point"
            />
          )}
          {origin && destination && (
            <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_API_KEY} // Replace with your Google Maps API key
              strokeWidth={4}
              strokeColor="red"
              mode="DRIVING" // Specify the mode as per your requirement
            />
          )}
        </MapView>
        <BottomSheets origin={origin} destination={destination} />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
