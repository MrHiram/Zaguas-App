import React from 'react';
import { Text, View, ImageBackground, Image, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainStyles from '../styles/MainStyles';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';

export default class AuthScreen extends React.Component {
    render() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                style={MainStyles.scrollView}
                extraHeight={100}>
                <ImageBackground
                    source={require('../../assets/fondo_login.png')}
                    resizeMode='cover'
                    style={MainStyles.mainBackgroundImage} />
                <Image
                    source={require('../../assets/logo_white.png')}
                    resizeMode='contain'
                    style={MainStyles.mainLogo} />
                <View
                    style={MainStyles.mainCard}>
                    <LoginContainer />
                    {/*<RegisterContainer/>*/}
                </View>
            </KeyboardAwareScrollView>
        );
    };
}