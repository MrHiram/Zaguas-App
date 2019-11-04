import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from 'react-native';
import InputMT from '../components/InputMT';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainStyles from '../styles/MainStyles';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Validator from '../services/Validator';
import Fetcher from '../services/Fetcher';
import MainButton from '../components/MainButton';

class CreateClientProfile extends Component {

    state ={
        image: null,
        aboutMe: '',
        address : '',
        phone: '',
        aboutMeError: false,
        aboutMeSuccess:false,
        addressError:false,
        addressSuccess:false,
        phoneError:false,
        phoneSuccess:false
    }
    handleValue = (key, value) => {
        switch (key) {
            case 'aboutMe':
                this.setState({
                    aboutMe: value
                });
                return;
            case 'address':
                this.setState({
                    address: value
                });
                return;
            case 'phone':
                this.setState({
                    phone: value
                });
                return;
        }
    }
    //take the photo
    handlerImage = async () => {
        const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL,Permissions.CAMERA);
        if (status === 'granted') {
            options = {
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4],
            }
            //let result = await ImagePicker.launchImageLibraryAsync(options);
             let result = await ImagePicker.launchCameraAsync(options);
              console.log(result);
          
              if (!result.cancelled) {
                this.setState({ image: result});
              }
        } else {
            alert('Hey! You heve not enabled selected permissions');
        }

    }

    CreateClientProfile = async() =>{
        let validAboutMe = Validator.aboutMe(this.state.aboutMe);
        let validAddress = Validator.address(this.state.address);
        let validPhone = Validator.phone(this.state.phone);
        let validImage = this.state.image === null? false: true;
        if (validAboutMe&&validAddress&&validPhone&& validImage) {
            var data = {
                image: this.state.image,
                aboutMe: this.state.email,
                address: this.state.password,
                phone: this.state.phone
            };
            Fetcher.postToken('assignClientRole', data)
                .then(
                    (response) => {
                        console.log(response.message);
                    }
                )
                .catch(
                    (error) => { console.log(error) }
                );
        } else {
            if (!validAboutMe)
                this.setState({ aboutMeError: 'Espacio Requerido', aboutMeSuccess: false });
            else
                this.setState({ aboutMeError: '', aboutMeSuccess: true });
            if (!validAddress)
                this.setState({ addressError: 'Espacio Requerido', addressSuccess: false })
            else
                this.setState({ addressError: '', addressSuccess: true });
            if (!validPhone)
                this.setState({ phoneError: 'Espacio Requerido', phoneSuccess: false });
            else
                this.setState({ phoneError: '', phoneSuccess: true });
           
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
                        value= {this.state.aboutMe}
                        placeholder='Agrega una breve descripción de ti'
                        handler='aboutMe'
                        handleValue={this.handleValue}
                        error= {this.state.aboutMeError}
                        success={this.state.aboutMeSuccess}
                    />
                    <InputMT
                        title='Dirección'
                        value= {this.state.address}
                        placeholder='Ingresa tu direccion'
                        handler='address'
                        handleValue={this.handleValue}
                        error= {this.state.addressError}
                        success={this.state.addressSuccess}
                    />
                    <InputMT
                        title='Telefono'
                        value= {this.state.phone}
                        placeholder='Ingresa tu teléfono celular'
                        handler='phone'
                        handleValue={this.handleValue}
                        error= {this.state.phoneError}
                        success={this.state.phoneSuccess}
                    />
                    <MainButton
                    title='Crear perfil'
                    onPress={this.CreateClientProfile} />
                    <Text style={MainStyles.whiteText} >2/3</Text>
                </View>

            </KeyboardAwareScrollView>
        );
    }
}
export default CreateClientProfile;

