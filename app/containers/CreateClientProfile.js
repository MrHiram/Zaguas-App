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
                quality: 0.5
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
        let t  = this.props.screenProps;
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
                        LocalStorage.remove("roleSetUp");
                        this.props.setupSuccess();
                    }
                )
                .catch(
                    (error) => { console.log(error.error) }
                );
        } else {
          
            if (!validAboutMe)
                this.setState({ aboutMeError: t('required'), aboutMeSuccess: false });
            else
                this.setState({ aboutMeError: '', aboutMeSuccess: true });
            if (!validAddress)
                this.setState({ addressError: t('required'), addressSuccess: false })
            else
                this.setState({ addressError: '', addressSuccess: true });
            if (!validPhone)
                this.setState({ phoneError: t('required'), phoneSuccess: false });
            else
                this.setState({ phoneError: '', phoneSuccess: true });

        }
    }
    render() {
        let { locale, exit, t, colorTheme, darkThemeOn } = this.props.screenProps;
        if(colorTheme){
            console.log(colorTheme);
        }
        return (
            <View style={[{width:'100%'},colorTheme.mainBackground]}>
            {this.state.waiting ? <ActivityIndicator size="large" color="#007EA9" />:<KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 0 }}
                style={MainStyles.scrollView}
                extraHeight={300}>
                <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
                <UploadPicture
                    titlePicture = {t('profilePhoto')}
                    image = {this.state.image}
                    error= {this.state.imageError}
                    handlerImage = {this.handlerImage}
                    colorTheme={colorTheme}
                    />
                    
                    <InputMT
                        title={t('description')}
                        value={this.state.aboutMe}
                        placeholder={t('phDescription')}
                        handler='aboutMe'
                        handleValue={this.handleValue}
                        error={this.state.aboutMeError}
                        success={this.state.aboutMeSuccess}
                        colorTheme={colorTheme}
                        darkThemeOn={darkThemeOn}
                    />
                    <InputMT
                        title={t('adress')}
                        value={this.state.address}
                        placeholder={t('phAdress')}
                        handler='address'
                        handleValue={this.handleValue}
                        error={this.state.addressError}
                        success={this.state.addressSuccess}
                        colorTheme={colorTheme}
                        darkThemeOn={darkThemeOn}
                    />
                    <InputMT
                        title={t('phone')}
                        value={this.state.phone}
                        placeholder={t('phPhone')}
                        handler='phone'
                        handleValue={this.handleValue}
                        error={this.state.phoneError}
                        success={this.state.phoneSuccess}
                        colorTheme={colorTheme}
                        darkThemeOn={darkThemeOn}
                    />
                    <MainButton
                        title={t('createProfile')}
                        onPress={this.CreateClientProfile}
                        colorTheme={colorTheme} />
                    <Text style={MainStyles.whiteText} >2/3</Text>
                </View>

            </KeyboardAwareScrollView>}
            </View>
        );
    }
}



