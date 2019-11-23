import React from 'react';
import { View } from 'react-native';

import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';

import Fetcher from '../services/Fetcher';
import Validator from '../services/Validator';
import LocalStorage from '../services/LocalStorage';

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

    requestLogin = async () => {
        let validEmail = Validator.email(this.state.email);
        let validPassword = Validator.password(this.state.password);
        if (validEmail&&validPassword) {
            var data = {
                email: this.state.email,
                password: this.state.password
            };
            Fetcher.postNoToken('login', data)
                .then(
                    (response) => {
                        if (!response.data.profile) {
                            LocalStorage.saveToken(response.data.accessToken);
                            this.props.setup();
                        } else if(response.data.accessToken){
                            LocalStorage.saveToken(response.data.accessToken);
                            this.props.loginSuccess();
                        }else if (response.data.error) {
                       
                            this.handleError(response.data.error);
                        }
                        
                    }
                )
                .catch(
                    (error) => { console.log(error) }
                );
        } else {
            if (!validEmail)
                this.setState({ emailError: 'Formato incorrecto', emailSuccess: false });
            else
                this.setState({ emailError: '', emailSuccess: true });
            if (!validPassword)
                this.setState({ passwordError: 'Debe superar los 8 caracteres', passwordSuccess: false })
            else
                this.setState({ passwordError: '', passwordSuccess: true });
        }
    }

    handleError = (errors) => {
        let emailError = '';
        let passwordError = '';
        console.log(errors);
        
        errors.forEach(error => {
            switch(error){
                case "Invalid credentials":
                    emailError = passwordError = 'Credenciales invalidas';
                    break;
                case "The email field is required.":
                    passwordError = 'Correo requerido';
                    break;
                case "The password field is required.": 
                    passwordError = 'Contraseña requerida';
                    break;
                case "The email must be a valid email address.":
                    emailError = 'Formato incorrecto';
                    break;
                case "User does not exist":
                    emailError = 'Usuario no encontrado';
                    break;
                case "Inactive user":
                    emailError = 'Verifica tu correo, por seguridad';
                    break;
                    
            }
        });
        this.setState({
            emailError: emailError,
            passwordError: passwordError,
        });
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
                    onPress={() => this.props.changeModule(3)} />
                <MainButton
                    title='Iniciar Sesión'
                    onPress={this.requestLogin} />
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿No tienes cuenta?'
                    innerText='Crear una'
                    onPress={() => this.props.changeModule(2)} />
            </View>
        );
    };
}