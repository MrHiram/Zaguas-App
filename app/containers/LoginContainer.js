import React from 'react';
import { View } from 'react-native';

import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';

import Validator from '../services/Validator';

import MainStyles from '../styles/MainStyles';

export default class LoginContainer extends React.Component {
    state = {
        email: '',
        emailError: '',
        emailSuccess: false,
        password: '',
        passwordError: '',
        passwordSuccess: false,
        showPassword: true,
    };

    handleValue = (key, value) => {
        switch (key) {
            case 'email':
                this.setState({
                    email: value
                });
                return;
            case 'password':
                this.setState({
                    password: value
                });
                return;
        }
    }

    togglePasswords = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    requestLogin = () =>{
        let validEmail = Validator.email(this.state.email);
        let validPassword = Validator.password(this.state.password);
        if(validEmail&&validPassword){
            var data = {
                email: this.state.email,
                password: this.state.password
            };
            //TODO: enviar data a padre
        }else{
            if(!validEmail)
                this.setState({emailError: 'Formato incorrecto.', emailSuccess: false});
            else
                this.setState({emailError: '', emailSuccess: true});
            if(!validPassword)
                this.setState({passwordError: 'Debe superar los 8 caracteres.', passwordSuccess: false})
            else
                this.setState({passwordError: '',passwordSuccess: true});
        }
    }

    render() {
        return (
            <View style={MainStyles.containerCenter}>
                <InputMT
                    title='Correo'
                    placeholder='correo@ejemplo.com'
                    handler='email'
                    value={this.state.email}
                    handleValue={this.handleValue}
                    error={this.state.emailError}
                    success={this.state.emailSuccess} />
                <InputMT
                    title='Contraseña'
                    placeholder='Contraseña'
                    handler='password'
                    secureTextEntry={this.state.showPassword}
                    value={this.state.password}
                    handleValue={this.handleValue}
                    togglePassword={this.togglePasswords}
                    error={this.state.passwordError}
                    success={this.state.passwordSuccess} />
                <TouchableText
                    alignCenter={false}
                    innerText='¿Se te olvidó lo contraseña?' 
                    onPress={() => this.props.changeModule(3)}/>
                <MainButton
                    title='Iniciar Sesión'
                    onPress={this.requestLogin}/>
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿No tienes cuenta?'
                    innerText='Crear una'
                    onPress={() => this.props.changeModule(2)}/>
            </View>
        );
    };
}