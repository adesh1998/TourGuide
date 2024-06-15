import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './app/Navigations/TabNavigation'
import * as Location from 'expo-location';
import { UserLocationContext } from './app/Context/UserLocationContext'

export default function App() {
  const [location, setLocation] = useState(null); // Adjust type as per actual location data structure
  const [errorMsg, setErrorMsg] = useState(null); // Initialize with null

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      console.log(location);
    })();
  }, []);

  return (
    <UserLocationContext.Provider value={{ location, setLocation }}>
      <View style={styles.container}>
        {errorMsg ? (
          <Text>{errorMsg}</Text>
        ) : (
          <NavigationContainer independent={true}>
            <TabNavigation />
          </NavigationContainer>
        )}
      </View>
    </UserLocationContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
