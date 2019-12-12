import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Animated
} from "react-native";
import HomeCaretakerButton from '../components/HomeCaretakerButton';
import CalendarPicker from 'react-native-calendar-picker';
import InputMT from '../components/InputMT';
import MainStyles from "../styles/MainStyles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const HEADER_MIN_HEIGHT = 50;
const HEADER_MAX_HEIGHT = 0;

class ViewHomeScreen extends Component {

    state = {
        amount: '',
        language: 'es',
    }
    constructor(props) {
        super(props);
        this.state = {
            selectedStartDate: null,
            selectedEndDate: null,
        };
        this.onDateChange = this.onDateChange.bind(this);
    }

    onDateChange(date, type) {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }


    scrollYAnimatedValue = new Animated.Value(10);


    handlerScroll = (event) => {
        Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
        )(event)
    }
    render() {
        let { t, locale, colorTheme } = this.props.screenProps;
        const { selectedStartDate, selectedEndDate } = this.state;
        const minDate = new Date(2019,10,3); // Today
        const maxDate = new Date(2030, 6, 3);
        const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
        const endDate = selectedEndDate ? selectedEndDate.toString() : '';

        return (
            <KeyboardAwareScrollView
                enableOnAndroid={true}
                resetScrollToCoords={{ x: 0, y: 100 }}
                extraHeight={800}
                contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                scrollEventThrottle={20}
                onScroll={(event) => this.handlerScroll(event)}
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
                        style={{ width: '100%', height: '87%' }}
                        resizeMode='contain'
                        source={{uri:this.props.navigation.state.params.item.image}} />
                </View>
                <View
                    style={{ flexDirection: 'row', marginTop: 20 }}
                >
                    <View
                        style={{ flexDirection: 'column', marginLeft: 20 }}
                    >
                        <Image
                            style={{ height: 80, width: 80, borderRadius:40 }}
                            resizeMode='cover'
                            source={{uri : this.props.navigation.state.params.item.care_taker_image}}
                        />

                    </View>
                    <View
                        style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}
                    >
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{this.props.navigation.state.params.item.userName}</Text>
                        <Text>{this.props.navigation.state.params.item.address}</Text>
                    </View>
                </View>
                <View
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}
                >
                    <View
                        style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}
                    >
                        <Image
                            style={{ width: '80%', height: 70 }}
                            resizeMode='contain'
                            source={require('../../assets/paw.png')}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '500' }}>Capacidad</Text>
                        <Text>{this.props.navigation.state.params.item.capacity}</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'column', alignItems: 'center' }}
                    >
                        <Image
                            style={{ width: '80%', height: 70 }}
                            resizeMode='contain'
                            source={require('../../assets/money.png')}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '500' }}>{this.props.navigation.state.params.item.price}</Text>
                        <Text >Por noche</Text>
                    </View>
                    <View
                        style={{ flexDirection: 'column', alignItems: 'center', marginRight: 20 }}
                    >
                        <Image
                            style={{ width: '80%', height: 70 }}
                            resizeMode='contain'
                            source={require('../../assets/walk.png')}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '500' }}>Caminador</Text>
                        <Text>{this.props.navigation.state.params.item.walk ? "Si" : "No"}</Text>
                    </View>
                </View>
                <View
                    style={{ marginHorizontal: 20, marginTop: 20 }}

                >
                    <Text style={{ fontSize: 25, fontWeight: '500', marginBottom: 10 }}>Descripción</Text>
                    <Text>{this.props.navigation.state.params.item.description}</Text>
                    <TouchableOpacity><Text style={{ color: '#477DA4' }}>Contactar al dueño </Text></TouchableOpacity>
                    <Text style={{ fontSize: 25, fontWeight: '500', marginTop: 10 }}>Fecha de llegada</Text>
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
                        />

                        <View>
                            <Text>Día de llegada:{startDate}</Text>
                            <Text>Día de salida:{ endDate }</Text>
                        </View>
                    </View>
                    <Text style={{ fontSize: 25, fontWeight: '500', marginTop: 20 }}>Cantidad de mascotas</Text>
                    <InputMT
                        title={t('amount')}
                        placeholder={t('Cantidad de mascotas')}
                        handler='amount'
                        value={this.state.amount}
                        handleValue={this.handleValue}
                        colorTheme={colorTheme} />
                    <HomeCaretakerButton
                        title={t('reserve')}
                        onPress={() => this.applySettings()}
                        colorTheme={colorTheme}
                    />

                </View>

            </KeyboardAwareScrollView>
        );
    }
}
export default ViewHomeScreen;
