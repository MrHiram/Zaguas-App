import React from 'react';
import { View, Text } from 'react-native';
import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';
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
    render() {
        return (
            <View style={MainStyles.containerCenter}>
         
                <Text>{this.state.email}</Text>
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
                    innerText='¿Se te olvidó lo contraseña?'/>
                <MainButton 
                    title='Iniciar Sesión'/>
            
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿No tienes cuenta?'
                    innerText='Crear una'
                    />
            </View>
            
        );
    };
}