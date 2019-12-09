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
        return (
            <View>
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
                        style={{width:'100%'}}
                            resizeMode='contain'
                            source={require('../../assets/casa1.jpg')}
                        />
                    </View>
                    <Text style={MainStyles.subTitile} >Description</Text>
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
                                Precio por noche
                            </Text>
                            <Text style={MainStyles.marginText}>₡5000</Text>
                        </View>
                        <View style={MainStyles.daysColumn}>
                            <Text style={MainStyles.subTitile}>Capacidad</Text>
                            <Text style={MainStyles.marginText}> 1-5 </Text>
                        </View>
                        <View style={MainStyles.daysColumn}>
                            <Text style={MainStyles.subTitile}>Caminador</Text>
                            <Text style={MainStyles.marginText}>No</Text>
                        </View>
                    </View>

                    <Text style={MainStyles.subTitile}>Días disponibles</Text>

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
                                <Text
                                    style={{
                                        alignSelf: 'center'
                                    }}
                                >Lunes</Text>
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
                                <Text
                                    style={{
                                        alignSelf: 'center'
                                    }}
                                > Martes</Text>
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
                                <Text
                                    style={{
                                        alignSelf: 'center'
                                    }}>Jueves</Text>
                            </View>
                        </View>
                    </View>


                </View>
            </View>
        );
    }
}
export default CaretakerContainer;