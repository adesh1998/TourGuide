import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Header = () => {
  const onChangeSearch = query => {
    // Handle search query change
  };


  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        query={{
          key: 'your api key',
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
