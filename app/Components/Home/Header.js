// Header.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_API_KEY } from '@env'; // Import API key from .env

const Header = ({ onPlaceSelected }) => {
  const handlePlaceSelected = async (data, details = null) => {
    if (details) {
      const coordinates = {
        latitude: details.geometry.location.lat,
        longitude: details.geometry.location.lng,
      };
      onPlaceSelected(coordinates);
    }
  };

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search for places along the route"
        onPress={handlePlaceSelected}
        query={{
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
        }}
        fetchDetails={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    position: 'absolute',
    top: 20,
    left: 10,
    right: 10,
    zIndex: 1,
    elevation: 2,
  },
});

export default Header;
