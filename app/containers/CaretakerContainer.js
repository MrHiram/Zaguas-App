import React, { Component } from "react";
import IconButton from '../components/IconButton';
import { RadioButton } from 'react-native-paper';
import {
    View,
    Text,
    Image
} from "react-native";
import MainStyles from "../styles/MainStyles";

class CaretakerContainer extends Component {
    state = {
        descriptionHouse: '',
        price: '',
        capacity: '',
        walk: '',
        checked: 'yes',
    };
    handleValue = (key, value) => {
        switch (key) {
            case 'descriptionHouse':
                this.setState({
                    descriptionHouse: value
                });
                return;
            case 'price':
                this.setState({
                    price: value
                });
                return;
            case 'capacity':
                this.setState({
                    capacity: value
                });
                return;
            case 'walk':
                this.setState({
                    walk: value
                });
                return;
        }
    }

    render() {
        const { checked } = this.state;
        let { locale, exit, t, colorTheme, darkThemeOn } = this.props.screenProps;
        return (
            <View style={{ marginBottom: 100 }}>
                <View style={MainStyles.caretakerCard}>
                    <View style={MainStyles.editInfoCaretaker}>
                        <IconButton
                            style={MainStyles.iconEdit}
                            name={"md-create"}
                            color={'#ffffff'}
                            size={28}
                        />
                    </View>
                    <View
                        style={MainStyles.cardImageCaretaker}
                    >
                        <Image
                            style={{ width: '100%' }}
                            resizeMode='contain'
                            source={require('../../assets/casa1.jpg')}
                        />
                    </View>
                    <Text style={MainStyles.subTitile} >{t('description')}</Text>
                    <Text style={MainStyles.marginText}> Mi hermoso hogar cuenta con una gran zona verde, donde caben muchos perros hasta yo!</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            width: '100%'
                        }}
                    >
                        <View style={[MainStyles.daysColumn, { width: '40%' }]}>
                            <Text
                                style={MainStyles.subTitile}>
                                {t('pricePerNight')}
                            </Text>
                            <Text style={MainStyles.marginText}>₡5000</Text>
                        </View>
                        <View style={MainStyles.daysColumn}>
                            <Text style={MainStyles.subTitile}>{t('capacity')}</Text>
                            <Text style={MainStyles.marginText}> 1-5 </Text>
                        </View>
                        <View style={MainStyles.daysColumn}>
                            <Text style={MainStyles.subTitile}>{t('walker')}</Text>
                            <Text style={MainStyles.marginText}>No</Text>
                        </View>
                    </View>

                    <Text style={MainStyles.subTitile}>{t('availableDays')}</Text>

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <View style={MainStyles.daysColumn}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginBottom: 10
                                }}
                            >
                                <RadioButton
                                    color='#00639B'
                                    value="yes"
                                    status={checked === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'yes' }); }}
                                />
                                <Text style={{ alignSelf: 'center' }}>{t('monday')}</Text>
                            </View>
                        </View>
                        <View
                            style={MainStyles.daysColumn}
                        >
                            <View
                                style={{
                                    flexDirection: 'row'
                                }}
                            >
                                <RadioButton
                                    color='#00639B'
                                    value="yes"
                                    status={checked === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'yes' }); }}
                                />
                                <Text style={{ alignSelf: 'center' }}>{t('tuesday')}</Text>
                            </View>
                        </View>
                        <View style={MainStyles.daysColumn}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}
                            >
                                <RadioButton
                                    color='#00639B'
                                    value="yes"
                                    status={checked === 'yes' ? 'checked' : 'unchecked'}
                                    onPress={() => { this.setState({ checked: 'yes' }); }}
                                />
                                <Text style={{ alignSelf: 'center' }}>{t('thursday')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}
export default CaretakerContainer;