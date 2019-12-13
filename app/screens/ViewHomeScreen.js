import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated,
    Platform,
    Linking
} from 'react-native';
import HomeCaretakerButton from '../components/HomeCaretakerButton';
import CalendarPicker from 'react-native-calendar-picker';
import InputMT from '../components/InputMT';
import MainStyles from '../styles/MainStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PetProfileCard from '../components/PetProfileCard';
import LocalStorage from '../services/LocalStorage';
import Fetcher from '../services/Fetcher';

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class ViewHomeScreen extends Component {
    state = {
        amount: '',
        language: 'es'
    };
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    //metodo enviar a la vista de seleccionar la mascota.
    selectPets = () => {
        this.props.navigation.navigate('SelectPet', {
            screenProps: this.props.screenProps,
        });
    };
    onDateChange(date, type) {
        let dateString = new Date(date);
        console.log(dateString);
        if (type === 'END_DATE') {
            this.setState({
                selectedEndDate:
                    dateString.getFullYear() +
                    '/' +
                    (dateString.getMonth() + 1) +
                    '/' +
                    dateString.getDate()
            });
        } else {
            this.setState({
                selectedStartDate:
                    dateString.getFullYear() +
                    '/' +
                    (dateString.getMonth() + 1) +
                    '/' +
                    dateString.getDate(),
                selectedEndDate: null
            });
        }
    }

    scrollYAnimatedValue = new Animated.Value(10);

    handlerScroll = event => {
        Animated.event([
            { nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }
        ])(event);
    };

    //metodo de llamada
    makeCall = () => {
        let phoneNumber = '';

        if (Platform.OS === 'android') {
            phoneNumber =
                'tel:${' + this.props.navigation.state.params.item.phone + '}';
        } else {
            phoneNumber = 'telprompt:${' + 1 + '}';
        }

        Linking.openURL(phoneNumber);
    };

    //reservation fetch

    makeReservation = async () => {
        let pets = [];
        let collections = this.props.navigation.state.params.selected;
        let idOwnerHouse = this.props.navigation.state.params.item.careTakerId;
        let idHouse = this.props.navigation.state.params.item.id;
        let token = await LocalStorage.retrieveToken();

        if (
            this.state.selectedStartDate &&
            this.state.selectedEndDate &&
            collections
        ) {
            //concat elements
            collections.forEach(element => {
                pets.push(element.id);
            });

            var data = {
                home_id: idHouse,
                start_date: this.state.selectedStartDate,
                end_date: this.state.selectedEndDate,
                pets_id: pets
            };
            console.log(data);
            await Fetcher.postToken('addReservation', data, token)
                .then(response => {
                    if(response.data.message == "Reservacion  creada"){
                        this.props.navigation.pop();
                    }
                })
                .catch(error => {
                    console.log(['Error reservation', error]);
                });
        }
    };

    render() {
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;
        let petListSelected = null;
        if (this.props.navigation.state.params.selected != null) {
            petListSelected = this.props.navigation.state.params.selected.map(
                data => {
                    let image = { uri: data.image };
                    return (
                        <PetProfileCard
                            key={data.id}
                            name={data.name}
                            image={image}
                        />
                    );
                }
            );
        }

        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(); // Today
        const maxDate = new Date(2030, 6, 3);
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 100 }}
                extraHeight={800}
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle={20}
                onScroll={event => this.handlerScroll(event)}
                style={colorTheme.mainBackground}
            >
                <View
                    style={{
                        width: '100%',
                        height: 290,
                        overflow: 'hidden',
                        justifyContent: 'flex-end',
                        backgroundColor: '#1D1D1D'
                    }}
                >
                    <Image
                        style={{ flex: 1 }}
                        resizeMode="cover"
                        source={{
                            uri: this.props.navigation.state.params.item.image
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <View style={{ flexDirection: 'column', marginLeft: 20 }}>
                        <Image
                            style={{ height: 80, width: 80, borderRadius: 40 }}
                            resizeMode="cover"
                            source={{
                                uri: this.props.navigation.state.params.item
                                    .care_taker_image
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
                                { fontWeight: 'bold', fontSize: 18 },
                                colorTheme.subtitleTextColor
                            ]}
                        >
                            {this.props.navigation.state.params.item.userName}
                        </Text>
                        <Text style={colorTheme.mainTextColor}>
                            {this.props.navigation.state.params.item.address}
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
                            marginLeft: 20
                        }}
                    >
                        <Image
                            style={{ width: '80%', height: 70 }}
                            resizeMode="contain"
                            source={
                                darkThemeOn
                                    ? require('../../assets/huellaBlanco.png')
                                    : require('../../assets/paw.png')
                            }
                        />
                        <Text
                            style={[
                                { fontSize: 15, fontWeight: '500' },
                                colorTheme.mainTextColor
                            ]}
                        >
                            {t('capacity')}
                        </Text>
                        <Text style={colorTheme.mainTextColor}>
                            {this.props.navigation.state.params.item.capacity}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Image
                            style={{ width: '80%', height: 70 }}
                            resizeMode="contain"
                            source={
                                darkThemeOn
                                    ? require('../../assets/moneyWhite.png')
                                    : require('../../assets/money.png')
                            }
                        />
                        <Text
                            style={[
                                { fontSize: 15, fontWeight: '500' },
                                colorTheme.mainTextColor
                            ]}
                        >
                            {this.props.navigation.state.params.item.price}
                        </Text>
                        <Text style={colorTheme.mainTextColor}>{t('perNight')}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginRight: 20
                        }}
                    >
                        <Image
                            style={{ width: '80%', height: 70 }}
                            resizeMode="contain"
                            source={
                                darkThemeOn
                                    ? require('../../assets/camindorBlanco.png')
                                    : require('../../assets/walk.png')
                            }
                        />
                        <Text
                            style={[
                                { fontSize: 15, fontWeight: '500' },
                                colorTheme.mainTextColor
                            ]}
                        >
                            {t('walker')}
                        </Text>
                        <Text style={colorTheme.mainTextColor}>
                            {this.props.navigation.state.params.item.walk
                                ? 'Si'
                                : 'No'}
                        </Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                    <Text
                        style={[
                            {
                                fontSize: 25,
                                fontWeight: '500',
                                marginBottom: 10
                            },
                            colorTheme.subtitleTextColor
                        ]}
                    >
                        {t('description')}
                    </Text>
                    <Text style={colorTheme.mainTextColor}>
                        {this.props.navigation.state.params.item.description}
                    </Text>
                    <TouchableOpacity onPress={() => this.makeCall()}>
                        <Text
                            style={[
                                { color: '#477DA4' }
                            ]}
                        >
                            {t('contact')}
                        </Text>
                    </TouchableOpacity>
                    <Text
                        style={[
                            {
                                fontSize: 25,
                                fontWeight: '500',
                                marginTop: 10
                            },
                            colorTheme.subtitleTextColor
                        ]}
                    >
                        {t('arrival')}
                    </Text>
                    <View style={MainStyles.container}>
                        <CalendarPicker
                            startFromMonday={true}
                            allowRangeSelection={true}
                            minDate={minDate}
                            maxDate={maxDate}
                            todayBackgroundColor="#ff8989"
                            selectedDayColor="#F4362D"
                            selectedDayTextColor="#FFFFFF"
                            onDateChange={this.onDateChange}
                            textStyle={colorTheme.mainTextColor}
                        />

                        <View>
                            <Text style={colorTheme.mainTextColor}>
                                {t('checkInDay')+': '+startDate}
                            </Text>
                            <Text style={colorTheme.mainTextColor}>
                                {t('checkOutDay')+': '+endDate}
                            </Text>
                        </View>
                    </View>

                        <View
                            style={{
                                width: '100%',
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                marginBottom: 10
                            }}
                        >
                            {petListSelected}
                        </View>
                        <>
                            <Text
                                style={[
                                    {
                                        fontSize: 25,
                                        fontWeight: '500',
                                        marginTop: 20
                                    },
                                    colorTheme.subtitleTextColor
                                ]}
                            >
                                {t('choose')}
                            </Text>
                            <TouchableOpacity
                                style={MainStyles.containerProfile}
                                onPress={() => this.selectPets()}
                            >
                                <Text>{t('addNewPetMSG')}</Text>
                            </TouchableOpacity>
                        </>

                    <HomeCaretakerButton
                        title={t('reserve')}
                        onPress={() => this.makeReservation()}
                        colorTheme={colorTheme}
                    />
                </View>
            </KeyboardAwareScrollView>
        );
    }
}
export default ViewHomeScreen;
