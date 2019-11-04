import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import InputMT from '../components/InputMT';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainStyles from '../styles/MainStyles';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

class CreateClientProfile extends Component {

    state ={
        image: null
    }
    handlerImage = async () => {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        if (status === 'granted') {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
              });
          
              console.log(result);
          
              if (!result.cancelled) {
                this.setState({ image: result});
              }
        } else {
            alert('Hey! You heve not enabled selected permissions');
        }

    }
    render() {
        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                style={MainStyles.scrollView}
                extraHeight={300}>
                <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
                    <TouchableOpacity style={{ height: 150 }}
                        onPress={() => this.handlerImage()}>
                     <Image
                            source={this.state.image === null ? require('../../assets/dogProfile.png'): {uri:this.state.image.uri}}
                            resizeMode='contain'
                            style={{ height: '90%', width: '90%', alignSelf: 'center', borderRadius: 400 / 2 }}
                        ></Image> 
                        
                        <Text
                            style={MainStyles.profilePictureText}
                        >foto de perfil</Text>
                    </TouchableOpacity>
                    <InputMT
                        title='Acerca de mí'
                        placeholder='Agrega una breve descripción de ti'
                        handler='about'
                    />
                    
                </View>

            </KeyboardAwareScrollView>
        );
    }
}
export default CreateClientProfile;

