import React from 'react';
import { Text, View, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainStyles from '../styles/MainStyles';
import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import RecoverContainer from '../containers/RecoverContainer';
import RecoverWaitingContainer from '../containers/RecoverWaitingContainer';
import RecoverSuccessContainer from '../containers/RecoverSuccessContainer';

export default class AuthScreen extends React.Component {
    state = {
        activeModule: 1
    }

    toggleModules = (moduleNumber) => {
        console.log("asd");
        this.setState({
            activeModule: moduleNumber
        });
    }
    
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
                        {this.state.activeModule == 1 ? <LoginContainer changeModule={this.toggleModules} /> : null}
                        {this.state.activeModule == 2 ? <RegisterContainer changeModule={this.toggleModules} /> : null}
                        {this.state.activeModule == 3 ? <RecoverContainer changeModule={this.toggleModules} /> : null}
                        {this.state.activeModule == 4 ? <RecoverWaitingContainer changeModule={this.toggleModules} /> : null}
                        {this.state.activeModule == 5 ? <RecoverSuccessContainer changeModule={this.toggleModules} email='mrhiram1@gmail.com' /> : null}
                    </View>
            </KeyboardAwareScrollView>
        );
    };
}