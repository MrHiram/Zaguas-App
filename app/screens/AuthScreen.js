import React from 'react';
import { View, ImageBackground, Image, BackHandler, Text, Switch, Picker } from 'react-native';
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
        open: false,
        darkThemeSwitch: false,
        language: 'en'
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

    toggleOpen = (locale) => {
        let { darkThemeOn } = this.props.screenProps;

        this.setState({
            open: !this.state.open,
            darkThemeSwitch: darkThemeOn,
            language: locale === 'en-US' || locale === 'en' ? 'en' : 'es'
        });
    };

    toggleDarkTheme = () =>
        this.setState({
            darkThemeSwitch: !this.state.darkThemeSwitch,
        });

    applySettings = () => {
        this.props.screenProps.setDarkThemeOn(this.state.darkThemeSwitch);
        this.props.screenProps.setLocale(this.state.language);
        this.setState({ open: false });
    }

    drawerContent = (locale, t, colorTheme, darkThemeOn) => {
        return (
            <View style={[MainStyles.animatedBox, colorTheme.mainBackground]}>
                <IconButton
                    onPress={() => this.toggleOpen()}
                    style={MainStyles.topLeftSetings}
                    name={"md-arrow-back"}
                    color={darkThemeOn ? '#fff' : '#222'}
                    size={28} />

                <View style={[MainStyles.switchContainer, {marginTop: 20}]}>
                    <Switch
                        style={MainStyles.switchSize}
                        onValueChange={this.toggleDarkTheme}
                        value={this.state.darkThemeSwitch} />
                    <Text style={[MainStyles.switchText, colorTheme.secondaryTextColor, this.state.termsError ? MainStyles.mainInputErrorMessage : null]}>{t('darkTheme')}</Text>
                </View>

                <Picker
                    style={colorTheme.mainTextColor}
                    im
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Español" value="es" />
                    <Picker.Item label="English" value="en" />
                </Picker>

                <MainButton
                    title={t('apply')}
                    onPress={() => this.applySettings()}
                    colorTheme={colorTheme}
                />
            </View>
        );
    };


    render() {
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;

        return (
            <View style={[MainStyles.mainContainer, colorTheme.mainBackground]}>
                <MenuDrawer
                    open={this.state.open}
                    drawerContent={this.drawerContent(locale, t, colorTheme, darkThemeOn)}
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
                            style={[MainStyles.mainBackgroundImage, colorTheme.mainAccentBackground]}
                            imageStyle={{ resizeMode: "cover", width: '100%', height: 430 }} />
                        <Image
                            source={require('../../assets/logo_white.png')}
                            resizeMode='contain'
                            style={MainStyles.mainLogo} />
                        <IconButton
                            onPress={() => this.toggleOpen(locale)}
                            style={MainStyles.topRightSetings}
                            name={"md-settings"}
                            color={darkThemeOn ? '#222' : '#fff'}
                            size={28} />
                        <View
                            style={[MainStyles.mainCard, colorTheme.mainBackground]}>
                            {this.state.activeModule == 1 ? <LoginContainer loginSuccess={this.loginSuccess} setup={this.setup} changeModule={this.toggleModules} screenProps={this.props.screenProps} /> : null}
                            {this.state.activeModule == 2 ? <RegisterContainer changeModule={this.toggleModules} toggleEmail={this.toggleEmail} screenProps={this.props.screenProps} /> : null}
                            {this.state.activeModule == 3 ? <RecoverContainer changeModule={this.toggleModules} toggleEmail={this.toggleEmail} screenProps={this.props.screenProps} /> : null}
                            {this.state.activeModule == 5 ? <RecoverSuccessContainer changeModule={this.toggleModules} email={this.state.displayEmail} screenProps={this.props.screenProps} /> : null}
                            {this.state.activeModule == 6 ? <RegisterSuccessContainer changeModule={this.toggleModules} email={this.state.displayEmail} screenProps={this.props.screenProps} /> : null}
                        </View>
                    </KeyboardAwareScrollView>
                </MenuDrawer>
            </View>
        );
    };
}