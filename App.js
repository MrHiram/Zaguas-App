import React from 'react';

import { Linking } from 'expo';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


import AuthCheckScreen from './app/screens/AuthCheckScreen';
import AuthScreen from './app/screens/AuthScreen';
import HomeScreen from './app/screens/HomeScreen';
import SetupScreen from './app/screens/SetupScreen';
import ValidateEmailScreen from './app/screens/ValidateEmailScreen';
import ResetPasswordScreen from './app/screens/ResetPasswordScreen';
import AddPetScreen from './app/screens/AddPetScreen';

const AppStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  {    
    defaultNavigationOptions: {
      header: null
    }
  }
);
const AuthStack = createStackNavigator(
  {
    AuthS: {
      screen: AuthScreen,
    }, 
    ValidateEmail: {
      screen: ValidateEmailScreen,
      path: 'validateEmail/:token'
    },
    ResetPassword: {
      screen: ResetPasswordScreen,
      path: 'resetPassword/:token'
    }
  },
  {    
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppSwitch = createSwitchNavigator(
  {
    AuthCheck:{
      screen: AuthCheckScreen,
      path: 'auth'
    },
    App: {
      screen: AppStack,
      path: 'home'},
    Auth: {
      screen: AuthStack,
      path: ''
    },
    Setup: {
      screen: SetupScreen,
      path: 'setup'
    }
  }
);

const AppContainer = createAppContainer(AppSwitch);


export default class App extends React.Component {
  
  render() {
    const prefix = Linking.makeUrl('/');
    return <AddPetScreen></AddPetScreen>
    //<AppContainer uriPrefix={prefix} />;
  }
}