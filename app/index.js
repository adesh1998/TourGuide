// import { StyleSheet,View, Text } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import TabNavigation from './Navigations/TabNavigation'
// import * as Location from 'expo-location';
// import {UserLocationContext} from './Context/UserLocationContext'

// export default function Index() {
//   const [location, setLocation] = useState(null); // Adjust type as per actual location data structure
//   const [errorMsg, setErrorMsg] = useState(null); // Initialize with null

//   useEffect(() => {
//     (async () => {
      
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location);
//       console.log(location)
//     })();
//   }, []);
//   return (
//     <View style={styles.container}>
//       <UserLocationContext.Provider value={{location,setLocation}}/>
//     <NavigationContainer independent={true}>
//     <TabNavigation />
//   </NavigationContainer>
//   </View>
//   )
// }

// const styles = StyleSheet.create({

//   container:{
//     flex:1,
//     backgroundColor:'#fff',
//   }

// })
