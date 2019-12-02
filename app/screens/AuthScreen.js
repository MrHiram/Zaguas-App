import React from 'react';
import { View, ImageBackground, Image, BackHandler, Text, Button } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MenuDrawer from 'react-native-side-drawer'

import LoginContainer from '../containers/LoginContainer';
import RegisterContainer from '../containers/RegisterContainer';
import RecoverContainer from '../containers/RecoverContainer';
import RecoverWaitingContainer from '../containers/RecoverWaitingContainer';
import RecoverSuccessContainer from '../containers/RecoverSuccessContainer';
import RegisterSuccessContainer from '../containers/RegisterSuccessContainer';

import IconButton from '../components/IconButton';
import MainButton from '../components/MainButton';

import MainStyles from '../styles/MainStyles';

export default class AuthScreen extends React.Component {
    state = {
        accessToken: '',
        activeModule: 1,
        displayEmail: '',
        open: false
    }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        this.backHandler.remove()
    }

    handleBackPress = () => {
        if (this.state.open) {
            this.setState({ open: false });
        } else {
            this.toggleModules(1);
        }
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

    setup = () => {
        this.props.navigation.navigate('Setup')
    }

    toggleOpen = () => {
        this.setState({ open: !this.state.open });
    };

    drawerContent = (locale) => {
        return (
            <View onPress={this.toggleOpen} style={MainStyles.animatedBox}>
                <IconButton
                    onPress={() => this.toggleOpen()}
                    style={MainStyles.topLeftSetings}
                    name={"md-arrow-back"}
                    color={'#000'}
                    size={28} />
                {locale === 'en-US' || locale === 'en' ?
                    (
                        <MainButton
                            title="Español"
                            onPress={() => this.props.screenProps.setLocale('es')}
                        />
                    ) : (
                        <MainButton
                            title="English"
                            onPress={() => this.props.screenProps.setLocale('en')}
                        />
                    )}
            </View>
        );
    };


    render() {
        let { t, locale } = this.props.screenProps;
        return (

            <View style={{ flex: 1, backgroundColor: "#fff", }}>
                <MenuDrawer
                    open={this.state.open}
                    drawerContent={this.drawerContent(locale)}
                    drawerPercentage={100}
                    animationTime={250}
                    overlay={true}
                    opacity={1}
                >
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        resetScrollToCoords={{ x: 0, y: 0 }}
                        style={MainStyles.scrollView}
                        extraHeight={100}>
                        <ImageBackground
                            source={require('../../assets/fondo_login.png')}
                            resizeMode='contain'
                            style={MainStyles.mainBackgroundImage}
                            imageStyle={{ resizeMode: "cover", width: '100%', height: 430 }} />
                        <Image
                            source={require('../../assets/logo_white.png')}
                            resizeMode='contain'
                            style={MainStyles.mainLogo} />
                        <IconButton
                            onPress={() => this.toggleOpen()}
                            style={MainStyles.topRightSetings}
                            name={"md-settings"}
                            color={'#ffffff'}
                            size={28} />
                        <View
                            style={MainStyles.mainCard}>
                            {this.state.activeModule == 1 ? <LoginContainer loginSuccess={this.loginSuccess} setup={this.setup} changeModule={this.toggleModules} t={this.props.screenProps} /> : null}
                            {this.state.activeModule == 2 ? <RegisterContainer changeModule={this.toggleModules} toggleEmail={this.toggleEmail} t={this.props.screenProps} /> : null}
                            {this.state.activeModule == 3 ? <RecoverContainer changeModule={this.toggleModules} toggleEmail={this.toggleEmail} t={this.props.screenProps} /> : null}
                            {/*this.state.activeModule == 4 ? <RecoverWaitingContainer changeModule={this.toggleModules} t={this.props.screenProps} /> : null*/}
                            {this.state.activeModule == 5 ? <RecoverSuccessContainer changeModule={this.toggleModules} email={this.state.displayEmail} t={this.props.screenProps} /> : null}
                            {this.state.activeModule == 6 ? <RegisterSuccessContainer changeModule={this.toggleModules} email={this.state.displayEmail} t={this.props.screenProps} /> : null}
                        </View>
                    </KeyboardAwareScrollView>
                </MenuDrawer>
            </View>
        );
    };
}