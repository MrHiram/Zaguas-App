import React from 'react';
import { View, ImageBackground, Image, KeyboardAvoidingView, ScrollView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import ResetPasswordContainer from '../containers/ResetPasswordContainer';

import MainStyles from '../styles/MainStyles';

export default class ResetPasswordScreen extends React.Component {
    state = {
        token: '',
        valid: true,
    }

    componentDidMount(){
        this.checkToken();
    }

    checkToken = () => {
        console.log("CK Token");
        
        let paramToken = this.props.navigation.getParam('token');

        if(paramToken === 'INVALID'){
            this.setState({valid: false});
        }

        this.setState({
            token: paramToken,
        });
    }

    goBack = () =>{
        this.props.navigation.navigate('AuthS');
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
                    {this.state.valid ?
                        <ResetPasswordContainer token={this.state.token} goBack={this.goBack}/>
                        :
                        <View/>
                    }
                </View>
            </KeyboardAwareScrollView>
        );
    };
}