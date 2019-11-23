import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';
import HistoryScreen from './HistoryScreen';
import Icon from 'react-native-vector-icons/Ionicons';


export default createBottomTabNavigator({
  History: {
    screen: HistoryScreen,
    navigationOptions:{
      tabBarLabel: 'History',
      tabBarIcon: ({tintColor})=> (
        <Icon name= "md-timer" color=
        {tintColor} size={24}/>
      )
    }
  },
  Feed: {
    screen: FeedScreen,
    navigationOptions:{
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor})=> (
        <Icon name= "ios-home" color=
        {tintColor} size={24}/>
      )
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions:{
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor})=> (
        <Icon name= "md-settings" color=
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

