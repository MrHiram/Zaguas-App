import React from 'react';
import { View } from 'react-native';
import MainStyles from '../styles/MainStyles';
import InputMT from '../components/InputMT';
import Combobox from '../components/ComboxProfile';
import UploadPicture from '../components/UploadPicture';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Validator from '../services/Validator';
import Fetcher from '../services/Fetcher';
import MainButton from '../components/MainButton';
import LocalStorage from '../services/LocalStorage';
export default class AddPetContainer extends React.Component {
    state = {
        image: null,
        name: '',
        size: '',
        temperament: '',
        race: '',
        description: '',
        feeding: '',
        allergies: '',
        special_cares: '',
        imageError: '',
        token: '',
        imageError: '',
        nameError: '',
        sizeError: '',
        temperamentError: '',
        raceError: '',
        descriptionError: '',
        feedingError: '',
        allergiesError: '',
        special_caresError: '',
        waiting: false
    };
    componentDidMount() {
        this.init();
    }

    init = async () => {
        let token = await LocalStorage.retrieveToken();
        this.setState({
            token: token
        });
    };
    onChangeTextPress = value => {
        this.setState({ temperament: value });
    };

    handlerImage = async () => {
        const { status, permissions } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL,
            Permissions.CAMERA
        );
        if (status === 'granted') {
            options = {
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 4]
            };
            let result = await ImagePicker.launchImageLibraryAsync(options);

            if (!result.cancelled) {
                this.setState({ image: result });
            }
        } else {
            alert('Hey! You heve not enabled selected permissions');
        }
    };

    handleValue = (key, value) => {
        switch (key) {
            case 'name':
                this.setState({
                    name: value
                });
                return;
            case 'race':
                this.setState({
                    race: value
                });
                return;
            case 'size':
                this.setState({
                    size: value
                });
                return;
            case 'description':
                this.setState({
                    description: value
                });
                return;
            case 'feeding':
                this.setState({
                    feeding: value
                });
                return;
            case 'allergies':
                this.setState({
                    allergies: value
                });
                return;
            case 'special_cares':
                this.setState({
                    special_cares: value
                });
                return;
        }
    };
    createPet = async t => {
        let validName = Validator.blankSpace(this.state.name);
        let validRace = Validator.blankSpace(this.state.race);
        let validSize = Validator.blankSpace(this.state.size);
        let validTemperament = Validator.blankSpace(this.state.temperament);
        let validImage = this.state.image === null ? false : true;

        if (
            validName &&
            validRace &&
            validSize &&
            validImage &&
            validTemperament
        ) {
            let data = new FormData();
            data.append('name', this.state.name);
            data.append('race', this.state.race);
            data.append('size', this.state.size);
            this.state.description
                ? data.append('description', this.state.description)
                : null;
            this.state.feeding
                ? data.append('feeding', this.state.feeding)
                : null;
            this.state.allergies
                ? data.append('allergies', this.state.allergies)
                : null;
            this.state.special_cares
                ? data.append('special_cares', this.state.special_cares)
                : null;
            data.append('temperament', this.state.temperament);
            data.append('image', {
                uri: this.state.image.uri,
                name: 'uploadProfile.jpg',
                type: 'image/jpeg'
            });
            this.setState({ waiting: true });
            await Fetcher.postToken('addPet', data, this.state.token)
                .then(response => {
                    if (
                        response.data.message == 'Mascota creada correctamente'
                    ) {
                        this.props.goBack();
                    }
                })
                .catch(error => {
                    console.log(['Error Add Pet Container', error]);
                });
        } else {
            //cambiar los success por los que verdaderos
            if (!validImage)
                this.setState({
                    imageError: t('imageRequiredER'),
                    aboutMeSuccess: false
                });
            else this.setState({ imageError: '', aboutMeSuccess: true });
            if (!validName)
                this.setState({
                    nameError: t('spaceRequiredER'),
                    addressSuccess: false
                });
            else this.setState({ nameError: '', addressSuccess: true });
            if (!validRace)
                this.setState({
                    raceError: t('spaceRequiredER'),
                    phoneSuccess: false
                });
            else this.setState({ raceError: '', phoneSuccess: true });
            if (!validSize)
                this.setState({
                    sizeError: t('spaceRequiredER'),
                    phoneSuccess: false
                });
            else this.setState({ sizeError: '', phoneSuccess: true });

            if (!validTemperament)
                this.setState({
                    temperamentError: t('spaceRequiredER'),
                    phoneSuccess: false
                });
            else this.setState({ temperamentError: '', phoneSuccess: true });
        }
    };

    render() {
        let { t, colorTheme, darkThemeOn } = this.props.screenProps;
        let data1 = [
            {
                value: t('calm')
            },
            {
                value: t('docile')
            },
            {
                value: t('friendly')
            },
            {
                value: t('aggressive')
            }
        ];
        return (
            <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
                <View
                    style={{
                        height: '18%',
                        width: '100%',
                        alignContent: 'center',
                        marginVertical: 20
                    }}
                >
                    <UploadPicture
                        titlePicture={t('addPetPhoto')}
                        image={this.state.image}
                        error={this.state.imageError}
                        handlerImage={this.handlerImage}
                        colorTheme={colorTheme}
                    />
                </View>

                <InputMT
                    title={t('name')}
                    handleValue={this.handleValue}
                    placeholder={t('enterPetName')}
                    handler="name"
                    value={this.state.name}
                    error={this.state.nameError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('size')}
                    handleValue={this.handleValue}
                    placeholder={t('enterPetSize')}
                    handler="size"
                    value={this.state.size}
                    error={this.state.sizeError}
                    colorTheme={colorTheme}
                />
                <Combobox
                    title={t('temperament')}
                    data={data1}
                    onChangeText={this.onChangeTextPress}
                    error={this.state.temperamentError}
                ></Combobox>
                <InputMT
                    title={t('race')}
                    handleValue={this.handleValue}
                    placeholder={t('enterPetRace')}
                    handler="race"
                    value={this.state.race}
                    error={this.state.raceError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('description')}
                    handleValue={this.handleValue}
                    placeholder={t('petDescription')}
                    handler="description"
                    value={this.state.description}
                    error={this.state.descriptionError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('feeding')}
                    handleValue={this.handleValue}
                    placeholder={t('feedingDescription')}
                    handler="feeding"
                    value={this.state.feeding}
                    error={this.state.feedingError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('allergies')}
                    handleValue={this.handleValue}
                    placeholder={t('enterAllergies')}
                    handler="allergies"
                    value={this.state.allergies}
                    error={this.state.allergiesError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('specialCares')}
                    handleValue={(key, value) => this.setState({ allergies: value })}
                    placeholder={t('enterSpecialCares')}
                    handler="special_cares"
                    value={this.state.special_cares}
                    error={this.state.special_caresError}
                    colorTheme={colorTheme}
                />
                <MainButton
                    title={t('addPet')}
                    onPress={() => this.createPet(t)}
                    colorTheme={colorTheme}
                />
            </View>
        );
    }
}
