import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ProfileScreen from './ProfileScreen';
import FeedScreen from './FeedScreen';
import HistoryScreen from './HistoryScreen';
import SettingsScreen from './SettingsScreen';
import AddPetScreen from './AddPetScreen';

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Settings: SettingsScreen,
  AddPet: AddPetScreen
},{
  defaultNavigationOptions: {
    header: null
  },
  initialRouteName: 'Profile'
});

const TabNavigator = createBottomTabNavigator({
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
    screen: ProfileStack,
    navigationOptions:{
      tabBarLabel: 'Profile',
      tabBarIcon: ({tintColor})=> (
        <Icon name= "md-person" color=
        {tintColor} size={24}/>
      )
    }
  }, 
},{
  initialRouteName: 'Feed',
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
  },
});



const AppContainer = createAppContainer(TabNavigator);

export default () => (
    <AppContainer />
  
);


