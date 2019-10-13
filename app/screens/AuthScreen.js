import React from 'react';
import { Text, View, ImageBackground, Image} from 'react-native';
import MainStyles from '../styles/MainStyles';
import LoginContainer from '../containers/LoginContainer';

export default class AuthScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
            <View style={MainStyles.mainContainer}>
            <ImageBackground source={require('../../assets/fondo_login.png')} style={MainStyles.mainBackgroundImage}>
                <Image source={require('../../assets/logo_white.png')}  resizeMode="contain" style={MainStyles.mainLogo}/>
                <View style={MainStyles.mainCard}>
                        <LoginContainer/>
                </View>
            </ImageBackground>
            </View>
                
            </>
        );
    };
}