import React from 'react';
import { View, Text, Switch } from 'react-native';
import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';
import MainStyles from '../styles/MainStyles';

export default class LoginContainer extends React.Component {
    state = {
        name: '',
        nameError: '',
        nameSuccess: false,
        lastname:'',
        lastnameError: '',
        lastnameSuccess: false,
        email: '',
        emailError: '',
        emailSuccess: false,
        password: '',
        passwordError: '',
        passwordSuccess: false,
        showPassword: true,
        confirmPassword:'',
        confirmPasswordError: '',
        confirmPasswordSuccess: false,
        
    };

    handleValue = (key, value) => {
        switch (key) {
            case 'name': 
            this.setState({
                name: value
            });
            return;
            case 'lastname':
                this.setState({
                    lastname: value
                });
                return;
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
            case 'confirmPassword':
                this.setState({
                    confirmPassword: value
                });
                return;
        }
    }
    handleToggleSwitch = () =>
    this.setState(state => ({
        switchValue: !state.switchValue,
    }));
    togglePasswords = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }
    render() {
        return (
            <View style={MainStyles.containerCenter}>
                <Text>{this.state.name}</Text>
                <InputMT
                    title='Nombre'
                    placeholder='Ingrese su nombre'
                    handler='name'
                    value={this.state.name}
                    handleValue={this.handleValue}
                    error={this.state.nameError}
                    success={this.state.nameSuccess} />
                <Text>{this.state.lastname}</Text>
                <InputMT
                    title='Apellido'
                    placeholder='Ingrese su apellido'
                    handler='lastname'
                    value={this.state.lastname}
                    handleValue={this.handleValue}
                    error={this.state.lastnameError}
                    success={this.state.lastnameSuccess} />
                <Text>{this.state.email}</Text>
                <InputMT
                    title='Correo'
                    placeholder='Ingrese su correo'
                    handler='email'
                    value={this.state.email}
                    handleValue={this.handleValue}
                    error={this.state.emailError}
                    success={this.state.emailSuccess} />
                <InputMT
                    title='Contraseña'
                    placeholder='Crea una contraseña'
                    handler='password'
                    secureTextEntry={this.state.showPassword}
                    value={this.state.password}
                    handleValue={this.handleValue}
                    togglePassword={this.togglePasswords}
                    error={this.state.passwordError}
                    success={this.state.passwordSuccess} />
                <InputMT
                    title='Confirmar contraseña'
                    placeholder='Ingrese la misma contraseña'
                    handler='password'
                    secureTextEntry={this.state.showPassword}
                    value={this.state.confirmPassword}
                    handleValue={this.handleValue}
                    togglePassword={this.togglePasswords}
                    error={this.state.confirmPasswordError}
                    success={this.state.confirmPasswordSuccess} />
                    <View style={MainStyles.switchContainer}>
                    <Switch
                        style={MainStyles.switchSize}
                        onValueChange={this.handleToggleSwitch}
                        value={this.state.switchValue} />
                    <Text style={MainStyles.switchText}>acepto los términos y condiciones</Text>
                </View>
                <MainButton 
                    title='Registrarse'/>
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿Ya tienes cuenta?'
                    innerText='Iniciar sesión'/>
            </View>
        );
    };
}