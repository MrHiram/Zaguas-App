import React from 'react';
import { View, ImageBackground, Image, BackHandler, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import RecoverContainer from '../containers/RecoverContainer';
import RecoverWaitingContainer from '../containers/RecoverWaitingContainer';
import RecoverSuccessContainer from '../containers/RecoverSuccessContainer';
import RegisterSuccessContainer from '../containers/RegisterSuccessContainer';

import MainStyles from '../styles/MainStyles';

export default class AuthScreen extends React.Component {
    state = {
        accessToken: '',
        activeModule: 1,
        displayEmail: ''
    }

    componentDidMount(){
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount(){
        this.backHandler.remove()
    }

    handleBackPress = () => {
        this.toggleModules(1);
        return true;
      }

    toggleModules = (moduleNumber) => {
        this.setState({
            activeModule: moduleNumber
        });
    }

    toggleEmail = (email) => {
        this.setState({
            displayEmail: email
        });
    }

    loginSuccess = () => {
        this.props.navigation.navigate('App');
    }

    setup = () =>{
        this.props.navigation.navigate('Setup')
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
                    resizeMode='contain'
                    style={MainStyles.mainBackgroundImage}
                    imageStyle={{resizeMode: "cover", width: '100%', height: 430}} />
                <Image
                    source={require('../../assets/logo_white.png')}
                    resizeMode='contain'
                    style={MainStyles.mainLogo} />
                <View
                    style={MainStyles.mainCard}>
                    {this.state.activeModule == 1 ? <LoginContainer loginSuccess={this.loginSuccess} setup={this.setup} changeModule={this.toggleModules} /> : null}
                    {this.state.activeModule == 2 ? <RegisterContainer changeModule={this.toggleModules} toggleEmail={this.toggleEmail} /> : null}
                    {this.state.activeModule == 3 ? <RecoverContainer changeModule={this.toggleModules} toggleEmail={this.toggleEmail}/> : null}
                    {this.state.activeModule == 4 ? <RecoverWaitingContainer changeModule={this.toggleModules} /> : null}
                    {this.state.activeModule == 5 ? <RecoverSuccessContainer changeModule={this.toggleModules} email={this.state.displayEmail} /> : null}
                    {this.state.activeModule == 6 ? <RegisterSuccessContainer changeModule={this.toggleModules} email={this.state.displayEmail} /> : null}
                </View>
            </KeyboardAwareScrollView>
        );
    };
}