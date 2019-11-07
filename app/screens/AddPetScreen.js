import React from 'react';
import { Text, View,Image,ScrollView } from 'react-native';
import MainStyles from '../styles/MainStyles';
import AddPetContainer from '../containers/AddPetContainer'
import InputMT from '../components/InputMT';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class SetupScreen extends React.Component{
    render(){
        return(
            
            <KeyboardAwareScrollView
            enableOnAndroid={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={MainStyles.scrollView}
            extraHeight={300}>
             
            <LinearGradient
                start={{x: 0, y: 0.75}} end={{x: 0.50, y: 0.75}} 
                colors={['rgb(4, 83, 121)', 'rgb(23, 130, 172)']}
                style={MainStyles.mainBackgroundImage}
                />
                <Image style={[MainStyles.mainLogo,MainStyles.mainLogoWithoutBottom]} resizeMode='contain' source={require('../../assets/logo_white.png')}/>
                
                <AddPetContainer/>
               
                
          
            </KeyboardAwareScrollView>
            
        );
    };
}