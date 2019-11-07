import React from 'react';
import { Text, View,Image } from 'react-native';
import MainStyles from '../styles/MainStyles';
import AddPetContainer from '../containers/AddPetContainer'
import InputMT from '../components/InputMT';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SetupScreen extends React.Component{
    render(){
        return(
            <View  style={MainStyles.containerCenter} >
                <LinearGradient
                start={{x: 0, y: 0.75}} end={{x: 0.50, y: 0.75}} 
                colors={['rgb(4, 83, 121)', 'rgb(23, 130, 172)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 300,
                }}
                />
                <Image style={{width:'50%', height: '20%'}} resizeMode='contain' source={require('../../assets/logo_white.png')}/>
                
                <AddPetContainer></AddPetContainer>
                
            </View>
        );
    };
}