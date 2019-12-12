import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Linking,
    Platform
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MainStyles from '../styles/MainStyles';

import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';
import MainButton from '../components/MainButton';

export default class PetScreen extends Component {
    state = {
        language: 'es',
        token: '',
        profileInfo: null,
        image: null,
        loading: true
    };

    componentDidMount() {
        this.init();
    }

    init = async () => {
        let token = await LocalStorage.retrieveToken();
        let id = this.props.navigation.state.params.petId;
        await Fetcher.getToken('pet/' + id, token)
            .then(response => {
                if (response.data != null) {
                    console.log(response.data);
                    this.setState({
                        profileInfo: response.data,
                        image: { uri: response.data.pet.image },
                        loading: false
                    }),
                        console.log(this.state.profileInfo);
                }
            })
            .catch(error => {
                console.log(['PetScren error', error]);
            });
        this.setState({ token });
    };

    onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate: date
            });
        } else {
            this.setState({
                selectedStartDate: date,
                selectedEndDate: null
            });
        }
    };

    makeCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber =
                'tel:${' + this.state.profileInfo.pet.owner.phone + '}';
        } else {
            phoneNumber = 'telprompt:${' + 1 + '}';
        }

        Linking.openURL(phoneNumber);
    };

    render() {
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(2019, 10, 3); // Today
        const maxDate = new Date(2030, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        return (
            <>
                {this.state.loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#007EA9"
                        style={MainStyles.loading}
                    />
                ) : (
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        resetScrollToCoords={{ x: 0, y: 100 }}
                        extraHeight={300}
                    >
                        <View
                            style={{
                                width: '100%',
                                height: 290,
                                overflow: 'hidden',
                                justifyContent: 'flex-end'
                            }}
                        >
                            <Image
                                style={{ flex: 1 }}
                                resizeMode="cover"
                                source={{
                                    uri: this.state.profileInfo.pet.image
                                }}
                            />
                        </View>
                        <View style={[colorTheme.mainBackground]}>
                            <View
                                style={{ flexDirection: 'row', marginTop: 40 }}
                            >
                                <View style={{ marginLeft: 20 }}>
                                    <Image
                                        style={{
                                            height: 80,
                                            width: 80,
                                            borderRadius: 40
                                        }}
                                        resizeMode="cover"
                                        source={{
                                            uri: this.state.profileInfo.pet
                                                .owner.image
                                        }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        marginLeft: 20
                                    }}
                                >
                                    <Text
                                        style={[
                                            {
                                                fontWeight: 'bold',
                                                fontSize: 18
                                            },
                                            colorTheme.mainTextColor
                                        ]}
                                    >
                                        {this.state.profileInfo.pet.name}
                                    </Text>
                                    <Text style={colorTheme.mainTextColor}>
                                        {
                                            this.state.profileInfo.pet.owner
                                                .address
                                        }
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginTop: 20
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexGrow: 1
                                    }}
                                >
                                    <Image
                                        style={{ width: '50%', height: 50 }}
                                        resizeMode="contain"
                                        source={
                                            darkThemeOn
                                                ? require('../../assets/tempermentBlanco.png')
                                                : require('../../assets/temperamento.png')
                                        }
                                    />
                                    <Text
                                        style={[
                                            {
                                                fontSize: 15,
                                                fontWeight: '500'
                                            },
                                            colorTheme.mainTextColor
                                        ]}
                                    >
                                        {t('temperament')}
                                    </Text>
                                    <Text style={colorTheme.mainTextColor}>
                                        {this.state.profileInfo.pet.temperament}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexGrow: 1
                                    }}
                                >
                                    <Image
                                        style={{ width: '50%', height: 50 }}
                                        resizeMode="contain"
                                        source={
                                            darkThemeOn
                                                ? require('../../assets/tamanoBlanco.png')
                                                : require('../../assets/dog.png')
                                        }
                                    />
                                    <Text
                                        style={[
                                            {
                                                fontSize: 15,
                                                fontWeight: '500'
                                            },
                                            colorTheme.mainTextColor
                                        ]}
                                    >
                                        {t('size')}
                                    </Text>
                                    <Text style={colorTheme.mainTextColor}>
                                        {this.state.profileInfo.pet.size}
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        flexGrow: 1
                                    }}
                                >
                                    <Image
                                        style={{ width: '50%', height: 50 }}
                                        resizeMode="contain"
                                        source={
                                            darkThemeOn
                                                ? require('../../assets/animalBlanco.png')
                                                : require('../../assets/animal.png')
                                        }
                                    />
                                    <Text
                                        style={[
                                            {
                                                fontSize: 15,
                                                fontWeight: '500'
                                            },
                                            colorTheme.mainTextColor
                                        ]}
                                    >
                                        {t('race')}
                                    </Text>
                                    <Text style={colorTheme.mainTextColor}>
                                        {this.state.profileInfo.pet.race}
                                    </Text>
                                </View>
                            </View>
                            <View
                                style={{ margin: 20 }}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 25,
                                            fontWeight: '500',
                                            marginBottom: 10
                                        },
                                        colorTheme.mainTextColor
                                    ]}
                                >
                                    {t('description')}
                                </Text>
                                <Text style={colorTheme.mainTextColor}>
                                    {this.state.profileInfo.pet.description}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => this.makeCall()}
                                >
                                    <Text style={{ color: '#477DA4' }}>
                                        {t('callOwner')}
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={[
                                        {
                                            fontSize: 25,
                                            fontWeight: '500',
                                            marginTop: 10
                                        },
                                        colorTheme.mainTextColor
                                    ]}
                                >
                                    {t('otherInfo')}
                                </Text>

                                {this.state.profileInfo.pet.allergies ? (
                                    <>
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 15,
                                                    fontWeight: '500',
                                                    marginTop: 10
                                                },
                                                colorTheme.mainTextColor
                                            ]}
                                        >
                                            {t('allergies')}
                                        </Text>
                                        <Text style={colorTheme.mainTextColor}>
                                            {
                                                this.state.profileInfo.pet
                                                    .allergies
                                            }
                                        </Text>
                                    </>
                                ) : null}

                                {this.state.profileInfo.pet.feeding ? (
                                    <>
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 15,
                                                    fontWeight: '500',
                                                    marginTop: 10
                                                },
                                                colorTheme.mainTextColor
                                            ]}
                                        >
                                            {t('feeding')}
                                        </Text>
                                        <Text style={colorTheme.mainTextColor}>
                                            {this.state.profileInfo.pet.feeding}
                                        </Text>
                                    </>
                                ) : null}

                                {this.state.profileInfo.pet.special_cares ? (
                                    <>
                                        <Text
                                            style={[
                                                {
                                                    fontSize: 15,
                                                    fontWeight: '500',
                                                    marginTop: 10
                                                },
                                                colorTheme.mainTextColor
                                            ]}
                                        >
                                            {t('specialCares')}
                                        </Text>
                                        <Text style={colorTheme.mainTextColor}>
                                            {
                                                this.state.profileInfo.pet
                                                    .special_cares
                                            }
                                        </Text>
                                    </>
                                ) : null}
                            </View>
                            {this.state.profileInfo.edit ? (
                                <MainButton
                                    title={t('editProfile')}
                                    onPress={() => this.applySettings()}
                                    colorTheme={colorTheme}
                                />
                            ) : null}
                        </View>
                    </KeyboardAwareScrollView>
                )}
            </>
        );
    }
}
