import React from 'react';
import { View, Text } from 'react-native';
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
export default class EditPetContainer extends React.Component {
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
        console.log("Prop que recibo"+this.props.petInfo);
    }

    init = async () => {
        let token = await LocalStorage.retrieveToken();
        let id = this.props.navigation.state.params.petId;
        await Fetcher.getToken('pet/' + id, token)
            .then(response => {
                if (response.data != null) {
                    this.setState({
                        petInfo: response.data,
                        image: { uri: response.data.pet.image },
                        loading: false
                    })
                }
            })
            .catch(error => {
                console.log(['EditPetScreen error', error]);
            });
        this.setState({ token });
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
                aspect: [4, 4],
                quality: 0.5
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
                    value= {this.state.petInfo.name }
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
                    colorTheme={colorTheme}
                />
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
                    handleValue={(key, value) => this.setState({ special_cares: value })}
                    placeholder={t('enterSpecialCares')}
                    handler="special_cares"
                    value={this.state.special_cares}
                    error={this.state.special_caresError}
                    colorTheme={colorTheme}
                />
                <MainButton
                    title={t('editPet')}
                   // onPress={() => this.editPet(t)}
                    colorTheme={colorTheme}
                />
            </View>
        );
    }
}
