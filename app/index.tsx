import { StyleSheet,View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import TabNavigation from './Navigations/TabNavigation'


export default function Index() {
  return (
    <NavigationContainer independent={true}>
    <TabNavigation />
  </NavigationContainer>
  )
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:'#fff',
  }

})
