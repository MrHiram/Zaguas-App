import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { LinearGradient } from 'expo-linear-gradient';
import UploadPicture from '../components/UploadPicture';
import ProfileContainer from '../containers/ProfileContainer';

import MainStyles from '../styles/MainStyles';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 300;

export default class ProfileScreen extends React.Component {
    state = {
        image: null,
        imageError: '',
        token: '',
        imageError: '',
        nameError: '',
        sizeError: '',
    }
    scrollYAnimatedValue = new Animated.Value(0);
    
    
        handlerScroll = (event) => {
        
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
          )(event)
    }
    componentDidMount() {
        this.init();
      }
    
      init = async () => {
        let token = await LocalStorage.retrieveToken();
        this.setState({
          token: token
        });
      }
      onChangeTextPress = (value) => {
        this.setState({ temperament: value });
    
      }
    
      handlerImage = async () => {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (status === 'granted') {
          options = {
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
          }
          let result = await ImagePicker.launchImageLibraryAsync(options);
          //let result = await ImagePicker.launchCameraAsync(options);
          console.log(result);
    
          if (!result.cancelled) {
            this.setState({ image: result });
          }
        } else {
          alert('Hey! You heve not enabled selected permissions');
        }
    
      }
    
    render() {
        const headerHeight = this.scrollYAnimatedValue.interpolate(
            {
              inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
              outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
              extrapolate: 'clamp'
            });
      
        return (
        <View style={{flex:1}}>
       
        <Animated.View style={[MainStyles.animatedHeaderContainer, { height: headerHeight, position:'absolute'}]}>
            <LinearGradient
            start={{x: 0, y: 0.75}} end={{x: 0.50, y: 0.75}} 
            colors={['#045379', '#1782ac']}
            style={{position:'absolute', height:500, width:'100%'}}
            />
            <View style={{height: 500, width: 500, alignContent: "center", paddingTop: 130}}>
            <UploadPicture
            titlePicture='hffhfjjgkjgk'
            image={this.state.image}
            error={this.state.imageError}
            handlerImage={this.handlerImage}
          /><Text style={MainStyles.mainName} >Lolo Patel</Text>
          </View>
         </Animated.View>
            <KeyboardAwareScrollView
            enableOnAndroid={true}
            resetScrollToCoords={{ x: 0, y: 0 }}
            extraHeight={300}
            contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
            scrollEventThrottle={16}
            onScroll={(event) => this.handlerScroll(event)}>
            <ProfileContainer/>
        </KeyboardAwareScrollView>

       
        
        </View>
        );
    };
}