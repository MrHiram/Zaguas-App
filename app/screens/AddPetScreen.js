import React from 'react';
import { Text, View, Image, ScrollView, Animated } from 'react-native';
import MainStyles from '../styles/MainStyles';
import AddPetContainer from '../containers/AddPetContainer'
import InputMT from '../components/InputMT';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 200;

export default class AddPetScreen extends React.Component {
    scrollYAnimatedValue = new Animated.Value(0);

    
    handlerScroll = (event) => {

        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
        )(event)
    }
    render() {

        const headerHeight = this.scrollYAnimatedValue.interpolate(
            {
                inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
                outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
                extrapolate: 'clamp'
            });

        return (

            <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    extraHeight={300}
                    scrollEventThrottle={16}
                    onScroll={(event) => this.handlerScroll(event)}>
                <Animated.View style={[MainStyles.animatedHeaderContainer, {  position: 'absolute' }]}>
                    <LinearGradient
                        start={{ x: 0, y: 0.75 }} end={{ x: 0.50, y: 0.75 }}
                        colors={['#045379', '#1782ac']}
                        style={{ position: 'absolute', height: 500, width: '100%' }}

                    />
                    <Image style={[MainStyles.mainLogo, MainStyles.mainLogoWithoutBottom]} resizeMode='contain' source={require('../../assets/logo_white.png')} />
                </Animated.View>
                
                    <AddPetContainer  
                        goBack={() => {
                            this.props.navigation.state.params.onGoBack();
                            this.props.navigation.goBack()
                        }}
                        screenProps={this.props.screenProps}/>
                </KeyboardAwareScrollView>
            </View>
        );
    };
}