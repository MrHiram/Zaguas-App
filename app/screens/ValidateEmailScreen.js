import React from 'react';

import { View, ActivityIndicator, StatusBar, AsyncStorage } from 'react-native';

import LocalStorage from '../services/LocalStorage';
import Fetcher from '../services/Fetcher';

import MainStyles from '../styles/MainStyles';

export default class ValidateEmailScreen extends React.Component {

    componentDidMount() {
        this.checkToken();
    }

    checkToken = () => {
        let paramToken = this.props.navigation.getParam('token', {});

        Fetcher.getToken('checkToken', paramToken)
            .then((response) => {
                LocalStorage.saveToken(paramToken);
                this.props.navigation.navigate('App');
            })
            .catch((error) => {
                console.log(error);
                this.props.navigation.goBack();
            });
    }

    render() {
        return (
            <View style={MainStyles.containerCenter} >
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}