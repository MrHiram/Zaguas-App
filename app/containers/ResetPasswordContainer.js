import React from 'react';
import { View } from 'react-native';

import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';

import Fetcher from '../services/Fetcher';
import Validator from '../services/Validator';
import LocalStorage from '../services/LocalStorage';

import MainStyles from '../styles/MainStyles';

export default class ResetPasswordContainer extends React.Component {
    state = {
        password: '',
        passwordError: '',
        passwordSuccess: false,
        confirmPassword: '',
        confirmPasswordError: '',
        confirmPasswordSuccess: false,
        showPassword: true,
    };

    handleValue = (key, value) => {
        switch (key) {
            case 'password':
                this.setState({
                    password: value
                });
                return;
            case 'confirmPassword':
                this.setState({
                    confirmPassword: value
                });
                return;
        }
    }

    togglePasswords = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    requestReset = async () => {
        let validPassword = Validator.password(this.state.password);
        let validConfirmation = Validator.passwordConfirm(this.state.password, this.state.confirmPassword);
        if (validPassword && validConfirmation) {
            var data = {
                token: this.props.token,
                password: this.state.password,
                password_confirmation: this.state.confirmPassword
            };
            Fetcher.postNoToken('resetPassword', data)
                .then(
                    (response) => {
                        console.log(response.data.message);
                        if (response.data.message) {
                            this.props.goBack();
                        } else if (response.data.error) {
                            console.log(response.data.error);
                        }
                    }
                )
                .catch(
                    (error) => { console.log(error) }
                );
        } else {
            if (!validPassword)
                this.setState({ passwordError: 'Debe superar los 8 caracteres', passwordSuccess: false })
            else
                this.setState({ passwordError: '', passwordSuccess: true });
            if (!validConfirmation){
                console.log(this.state.confirmPassword);
                this.setState({ confirmPasswordError: 'Las contraseñas no coinciden.', passwordSuccess: false })
            }else{

            }
               
            
                this.setState({ passwordError: '', passwordSuccess: true });
        }
    }

    handleError = (errors) => {
        let passwordError = '';
        console.log(errors);

        errors.forEach(error => {
            switch (error) {
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
            passwordError: passwordError,
        });
    }

    render() {
        return (
            <View style={MainStyles.containerCenter}>
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
                <InputMT
                    title='Confirmar contraseña'
                    placeholder='Contraseña'
                    handler='confirmPassword'
                    secureTextEntry={this.state.showPassword}
                    value={this.state.confirmPassword}
                    handleValue={this.handleValue}
                    togglePassword={this.togglePasswords}
                    error={this.state.confirmPasswordError}
                    success={this.state.confirmPasswordSuccess} />
                <MainButton
                    title='Cambiar Contraseña'
                    onPress={this.requestReset} />
            </View>
        );
    };
}