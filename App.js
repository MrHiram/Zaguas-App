import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import AuthCheckScreen from './app/screens/AuthCheckScreen';
import AuthScreen from './app/screens/AuthScreen';
import HomeScreen from './app/screens/HomeScreen';
import SetupScreen from './app/screens/SetupScreen';
import ValidateEmailScreen from './app/screens/ValidateEmailScreen';

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
    Auth: AuthScreen,
    ValidateEmail: {
      screen: ValidateEmailScreen,
      path: 'validateEmail/:token'
    }
  },
  {    
    initialRouteName: 'Auth',
    defaultNavigationOptions: {
      header: null
    }
  }
);

const AppSwitch = createSwitchNavigator(
  {
    AuthCheck: AuthCheckScreen,
    App: AppStack,
    Auth: {
      screen: AuthStack,
      path: ''
    },
  }
);

const AppContainer = createAppContainer(AppSwitch);


export default class App extends React.Component {
  
  render() {
    const prefix = Linking.makeUrl('/');
    return <AppContainer uriPrefix={prefix}/>;
  }
}