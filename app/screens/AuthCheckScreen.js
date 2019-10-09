import React from 'react';
import { View, ActivityIndicator, StatusBar, AsyncStorage, StyleSheet } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default class AuthCheckScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  }
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('accessToken');
    try {
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    return (
      <View style={MainStyles.containerCenter} >
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}