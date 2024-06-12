import { StyleSheet, View, Text } from 'react-native'
import React, { Profiler } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../Screen/Home';
import Fav from '../Screen/Fav';
import Profile from '../Screen/Profile';
import Search from '../Screen/Search';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function TabNavigation() {
    const Tab=createBottomTabNavigator();
  return (
   <Tab.Navigator screenOptions={{
    headerShown:false
   }}>
    <Tab.Screen name="Home" component={Home}
    options={{
        tabBarLabel:'Home',
        tabBarIcon:({color,size})=>(
            <FontAwesome name="home" size={24} color="black" />
        )
    }}
    />
    <Tab.Screen name="Search" component={Search}
     options={{
        tabBarLabel:'Search',
        tabBarIcon:({color,size})=>(
            <FontAwesome name="search" size={24} color="black" />
        )
    }}
    />
    <Tab.Screen name="Fav" component={Fav}
     options={{
        tabBarLabel:'Fav',
        tabBarIcon:({color,size})=>(
         <MaterialIcons name="favorite" size={24} color="black" />
        )
    }}
    />
    <Tab.Screen name="Profile" component={Profile}
     options={{
        tabBarLabel:'Profile',
        tabBarIcon:({color,size})=>(
            <FontAwesome name="user" size={24} color="black" />
        )
    }}
    />
   </Tab.Navigator>
  )
}
const styles=StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:'#fff',
      alignContent:'center'
  
    }
  })