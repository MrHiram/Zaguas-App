import React from 'react';
import { View, ImageBackground, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ResetPasswordContainer from '../containers/ResetPasswordContainer';

import MainButton from '../components/MainButton';

import MainStyles from '../styles/MainStyles';

export default class ResetPasswordScreen extends React.Component {
    state = {
        token: '',
        valid: true,
    }

    componentDidMount() {
        this.checkToken();
    }

    checkToken = () => {
        let paramToken = this.props.navigation.getParam('token');

        if (paramToken === 'INVALID') {
            this.setState({ valid: false });
        }

        this.setState({
            token: paramToken,
        });
    }

    goBack = () => {
        this.props.navigation.navigate('AuthS');
    }

    render() {
        let { t, colorTheme } = this.props.screenProps;
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                style={[MainStyles.scrollView, colorTheme.mainBackground]}
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
                <View
                    style={[MainStyles.mainCard, colorTheme.mainBackground]}>
                    {this.state.valid ?
                        <ResetPasswordContainer token={this.state.token} goBack={this.goBack} screenProps={this.props.screenProps}/>
                        :
                        <View style={MainStyles.containerCenter}>
                            <Text style={[MainStyles.mainTitle, {marginBottom: 30}]}>{t('linkExpired')}</Text>
                            <MainButton
                                title={t('backToHome')}
                                onPress={() => this.goBack()}
                                colorTheme={colorTheme} />
                        </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        );
    };
}