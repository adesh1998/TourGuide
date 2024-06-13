import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const GoogleMapView = () => {
  const { width } = Dimensions.get('screen');

  return (
    <View style={styles.container}>
      <MapView
        style={[styles.map, { width: width * 0.9, height: width * 0.5 }]}
       
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: 'center',
  },
  map: {
    borderRadius: 20,
  },
});

export default GoogleMapView;
