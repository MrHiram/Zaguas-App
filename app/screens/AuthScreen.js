import React from 'react';
import { Text, View, ImageBackground, } from 'react-native';
import MainStyles from '../styles/MainStyles';
import LoginContainer from '../containers/LoginContainer';

export default class AuthScreen extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <>
                <Text>Zaguas</Text> 
                <View>
                    <LoginContainer/>
                </View>
            </>
        );
    };
}