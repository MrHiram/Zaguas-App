import React from 'react';
import { View, Text } from 'react-native';

import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';

import Validator from '../services/Validator';

import MainStyles from '../styles/MainStyles';

export default class RecoverContainer extends React.Component {
    state = {
        email: '',
        emailError: '',
        emailSuccess: false,
    };

    handleValue = (key, value) => {
        switch (key) {
            case 'email':
                this.setState({
                    email: value
                });
                return;
        }
    }


    requestRecover = () => {
        let validEmail = Validator.email(this.state.email);
        if (validEmail) {
            var data = {
                email: this.state.email,
            };
            //TODO: enviar data a padre
            this.props.changeModule(4);
        } else {
            this.setState({ emailError: 'Formato incorrecto.' });
        }
    }

    render() {
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter]}>
                    Recupera tu contraseña
                </Text>
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    Ingresa tu correo electrónico{'\n'}para enviarte una contraseña nueva.
                </Text>
                <InputMT
                    title='Correo'
                    placeholder='correo@ejemplo.com'
                    handler='email'
                    value={this.state.email}
                    handleValue={this.handleValue}
                    error={this.state.emailError}
                    success={this.state.emailSuccess} />
                <View style={{ marginBottom: 15 } /* This is a spacer */} />
                <MainButton
                    title='Enviar correo'
                    onPress={this.requestRecover} />
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿Deseas ingresar?'
                    innerText='Iniciar sesión'
                    onPress={() => this.props.changeModule(1)} />
            </View>

        );
    };
}