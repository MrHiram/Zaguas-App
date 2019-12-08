import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Linking } from 'expo';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import AuthCheckScreen from './app/screens/AuthCheckScreen';
import AuthScreen from './app/screens/AuthScreen';
import SetupScreen from './app/screens/SetupScreen';
import ValidateEmailScreen from './app/screens/ValidateEmailScreen';
import ResetPasswordScreen from './app/screens/ResetPasswordScreen';
import AddPetScreen from './app/screens/AddPetScreen';

import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import en from './app/languages/en';
import es from './app/languages/es';
import LocalStorage from './app/services/LocalStorage';

import DynamicTabNavigatorScreen from './app/screens/DynamicTabNavigatorScreen';
import MainStyles from './app/styles/MainStyles';
import DarkTheme from './app/styles/DarkTheme';
import LightTheme from './app/styles/LightTheme';

i18n.fallbacks = true;
i18n.translations = { es, en };
i18n.locale = Localization.locale;

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
  },
);

const AppSwitch = createSwitchNavigator(
  {
    AuthCheck: {
      screen: AuthCheckScreen,
      path: 'auth'
    },
    App: {
      screen: DynamicTabNavigatorScreen,
      path: 'ProfileScreen'
    },
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
  state = {
    locale: Localization.locale,
    darkThemeOn: true,
    colorTheme: DarkTheme
  };

  componentDidMount() {
    this.init();
  }

  init = async () => {
    let localeStored = await LocalStorage.retrieve('locale');
    let darkThemeOn = await LocalStorage.retrieve('darkThemeOn');
    if (localeStored != null) {
      this.setState({
        locale: localeStored,
        colorTheme: darkThemeOn == 'true' ? DarkTheme : LightTheme, //cambiar
        darkThemeOn: darkThemeOn == 'true' ? true : false, //cambiar
      });
    }
  }

  setLocale = locale => {
    this.setState({ locale });
    LocalStorage.save('locale', locale);
  };

  t = (scope, options) => {
    return i18n.t(scope, { locale: this.state.locale, ...options });
  };

  setDarkThemeOn = (darkThemeOnParam) => {
    this.setState({
      colorTheme: darkThemeOnParam ? DarkTheme : LightTheme,
      darkThemeOn: darkThemeOnParam
    });
    LocalStorage.save('darkThemeOn', darkThemeOnParam ? 'true' : 'false');
  }

  render() {
    const prefix = Linking.makeUrl('/');
    return <AppContainer
      uriPrefix={prefix}
      screenProps={{
        t: this.t,
        locale: this.state.locale,
        setLocale: this.setLocale,
        colorTheme: this.state.colorTheme,
        darkThemeOn: this.state.darkThemeOn,
        setDarkThemeOn: this.setDarkThemeOn
      }} />;
  }
}