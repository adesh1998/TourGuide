import React, { useContext, useEffect, useState } from 'react';
import { View,Text, Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { UserLocationContext } from '@/app/Context/UserLocationContext';
import Header from './Header';


const GoogleMapView = () => {
  const { width } = Dimensions.get('screen');
  const { location } = useContext(UserLocationContext);
  const [mapRegion, setMapRegion] = useState(null);

  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0421,
      });
    }
  }, [location]);

  if (!mapRegion) {
    return <View style={styles.container}><Text>Loading map...</Text></View>;
  }

  return (
    <View style={styles.container}>
  
      <MapView 
        style={[styles.map,  { width: width * 1, height: width * 2 }]}
        showsUserLocation={true}
        region={mapRegion}
      />
       <Header/>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  
});

export default GoogleMapView;
