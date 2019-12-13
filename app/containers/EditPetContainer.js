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
        console.log(this.props.profileInfo);    
        this.setState({
            name: this.props.profileInfo.pet.name,
            size: this.props.profileInfo.pet.size,
            temperament: this.props.profileInfo.temperament,
            race: this.props.profileInfo.pet.race,
            description: this.props.profileInfo.pet.description,
            feeding: this.props.profileInfo.pet.feeding,
            allergies: this.props.profileInfo.pet.allergies,
            special_cares: this.props.profileInfo.pet.special_cares,

        })
    }

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
                    handleValue={(key, value) => this.setState({ name: value })}
                    placeholder={t('enterPetName')}
                    handler="name"
                    value={this.state.name}
                    error={this.state.nameError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('size')}
                    handleValue={(key, value) => this.setState({ size: value })}
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
                    handleValue={(key, value) => this.setState({ race: value })}
                    placeholder={t('enterPetRace')}
                    handler="race"
                    value={this.state.race}
                    error={this.state.raceError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('description')}
                    handleValue={(key, value) =>
                        this.setState({ description: value })
                    }
                    placeholder={t('petDescription')}
                    handler="description"
                    value={this.state.description}
                    error={this.state.descriptionError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('feeding')}
                    handleValue={(key, value) =>
                        this.setState({ feeding: value })
                    }
                    placeholder={t('feedingDescription')}
                    handler="feeding"
                    value={this.state.feeding}
                    error={this.state.feedingError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('allergies')}
                    handleValue={(key, value) =>
                        this.setState({ allergies: value })
                    }
                    placeholder={t('enterAllergies')}
                    handler="allergies"
                    value={this.state.allergies}
                    error={this.state.allergiesError}
                    colorTheme={colorTheme}
                />
                <InputMT
                    title={t('specialCares')}
                    handleValue={(key, value) =>
                        this.setState({ special_cares: value })
                    }
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
