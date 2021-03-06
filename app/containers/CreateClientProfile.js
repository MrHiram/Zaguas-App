import React, { Component } from "react";
import { View, Text, ActivityIndicator } from 'react-native';
import InputMT from '../components/InputMT';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MainStyles from '../styles/MainStyles';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Validator from '../services/Validator';
import Fetcher from '../services/Fetcher';
import MainButton from '../components/MainButton';
import LocalStorage from '../services/LocalStorage';
import UploadPicture from '../components/UploadPicture';

export default class CreateClientProfile extends Component {

    state = {
        image: null,
        aboutMe: '',
        address: '',
        phone: '',
        imageError: '',
        aboutMeError: false,
        aboutMeSuccess: false,
        addressError: false,
        addressSuccess: false,
        phoneError: false,
        phoneSuccess: false,
        token: '',
        waiting: false
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

    CreateClientProfile = async () => {
        let validAboutMe = Validator.blankSpace(this.state.aboutMe);
        let validAddress = Validator.blankSpace(this.state.address);
        let validPhone = Validator.blankSpace(this.state.phone);
        let validImage = this.state.image === null ? false : true;

        if (validAboutMe && validAddress && validPhone && validImage) {
            let data = new FormData();
            data.append("aboutMe", this.state.aboutMe)
            data.append("address", this.state.address)
            data.append("phone", this.state.phone)
            data.append("image", { uri: this.state.image.uri , name: 'uploadProfile.jpg', type: 'image/jpeg' })
            this.setState({waiting:true});
            Fetcher.postToken('assignClientRole', data, this.state.token)
                .then(
                    (response) => {
                        console.log(response);
                        this.props.setupSuccess();
                    }
                )
                .catch(
                    (error) => { console.log(error.error) }
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
            <>
            {this.state.waiting ? <View style={[MainStyles.mainCard, MainStyles.profileCard]}><ActivityIndicator size="large" color="#007EA9" /></View>:<KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                style={MainStyles.scrollView}
                extraHeight={300}>
                <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
                <UploadPicture
                    titlePicture = 'Añadir foto de mascota'
                    image = {this.state.image}
                    error= {this.state.imageError}
                    handlerImage = {this.handlerImage}
                    />
                    
                    <InputMT
                        title='Acerca de mí'
                        value={this.state.aboutMe}
                        placeholder='Agrega una breve descripción de ti'
                        handler='aboutMe'
                        handleValue={this.handleValue}
                        error={this.state.aboutMeError}
                        success={this.state.aboutMeSuccess}
                    />
                    <InputMT
                        title='Dirección'
                        value={this.state.address}
                        placeholder='Ingresa tu direccion'
                        handler='address'
                        handleValue={this.handleValue}
                        error={this.state.addressError}
                        success={this.state.addressSuccess}
                    />
                    <InputMT
                        title='Telefono'
                        value={this.state.phone}
                        placeholder='Ingresa tu teléfono celular'
                        handler='phone'
                        handleValue={this.handleValue}
                        error={this.state.phoneError}
                        success={this.state.phoneSuccess}
                    />
                    <MainButton
                        title='Crear perfil'
                        onPress={this.CreateClientProfile} />
                    <Text style={MainStyles.whiteText} >2/3</Text>
                </View>

            </KeyboardAwareScrollView>}
            </>
        );
    }
}



