import React from 'react';
import { Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';
import HistoryScreen from './HistoryScreen';
import { Ionicons } from '@expo/vector-icons';


export default createBottomTabNavigator({
  History: {
    screen: HistoryScreen,
    navigationOptions:{
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor})=> (
        <Ionicons name= "md-timer" color=
        {tintColor} size={24}/>
      )
    }
  },
  Feed: {
    screen: FeedScreen,
    navigationOptions:{
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor})=> (
        <Ionicons name= "ios-home" color=
        {tintColor} size={24}/>
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor})=> (
        <Ionicons name= "md-settings" color=
        {tintColor} size={24}/>
      )
    }
  },
},{
  tabBarOptions:{
    activeTintColor:'#007EA8',
    inactiveTintColor: 'grey',
    style: {
      backgroundColor:'white',
      borderTopWidth: 0,
      shadowOffset: {width:5, height:3},
      shadowColor: 'black',
      shadowOpacity: 0.5, 
      elevation:5
    }
  }
});

