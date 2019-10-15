import React from 'react';
import { View, Text, Switch } from 'react-native';

import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';

import validator from '../services/Validator';

import MainStyles from '../styles/MainStyles';

export default class LoginContainer extends React.Component {
    state = {
        name: '',
        nameError: '',
        nameSuccess: false,
        lastname: '',
        lastnameError: '',
        lastnameSuccess: false,
        email: '',
        emailError: '',
        emailSuccess: false,
        password: '',
        passwordError: '',
        passwordSuccess: false,
        showPassword: true,
        confirmPassword: '',
        confirmPasswordError: '',
        confirmPasswordSuccess: false,
        termsSuccess: false,
        termsError: false
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
        this.setState({
            termsSuccess: !this.state.termsSuccess,
        });

    togglePasswords = () => {
        this.setState({
            showPassword: !this.state.showPassword
        });
    }

    requestRegister = () => {
        let validName = this.state.name != '' ? true : false;
        let validLastName = this.state.lastname != '' ? true : false;
        let validEmail = validator.email(this.state.email);
        let validPassword = validator.password(this.state.password);
        let validconfirmPassword = validator.passwordConfirm(this.state.password, this.state.confirmPassword);

        if (validName && validLastName && validEmail && validPassword && validconfirmPassword && this.state.termsSuccess) {
            var data = {
                name: this.state.name,
                lastname: this.state.lastname,
                email: this.state.email,
                password: this.state.password,
                passsword_confirmation: this.state.confirmPassword
            };            
            Fetcher.postNoToken('register', data)
                .then(
                    (response) => {
                        if (response.data.accessToken) {
                            //Esperar
                        } else if (response.data.error) {
                            this.handleError(response.data.error);
                        }
                    }
                )
                .catch(
                    (error) => { console.log(error  ) }
                );
        } else {
            if (!validName)
                this.setState({ nameError: 'Ingrese su nombre.', nameSuccess: false });
            else
                this.setState({ nameError: '', nameSuccess: true });

            if (!validLastName)
                this.setState({ lastnameError: 'Ingrese su apellido.', lastnameSuccess: false });
            else
                this.setState({ lastnameError: '', lastnameSuccess: true });

            if (!validEmail)
                this.setState({ emailError: 'Formato incorrecto.', emailSuccess: false });
            else
                this.setState({ emailError: '', emailSuccess: true });

            if (!validconfirmPassword)
                this.setState({ confirmPasswordError: 'Las contraseñas no coinciden.', confirmPasswordSuccess: false })
            else
                this.setState({ confirmPasswordError: '', confirmPasswordSuccess: true });

            if (!validPassword)
                this.setState({ passwordError: 'Debe superar los 8 caracteres.', passwordSuccess: false })
            else
                this.setState({ passwordError: '', passwordSuccess: true });

            this.setState({termsError: !this.state.termsSuccess});
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
                    title='Nombre'
                    placeholder='Ingrese su nombre'
                    handler='name'
                    value={this.state.name}
                    handleValue={this.handleValue}
                    error={this.state.nameError}
                    success={this.state.nameSuccess} />
                <InputMT
                    title='Apellido'
                    placeholder='Ingrese su apellido'
                    handler='lastname'
                    value={this.state.lastname}
                    handleValue={this.handleValue}
                    error={this.state.lastnameError}
                    success={this.state.lastnameSuccess} />
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
                    handler='confirmPassword'
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
                        value={this.state.termsSuccess} />
                    <Text style={[MainStyles.switchText, this.state.termsError ? MainStyles.mainInputErrorMessage : null]}>Acepto los términos y condiciones</Text>
                </View>
                <MainButton
                    title='Registrarse'
                    onPress={this.requestRegister} />
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿Ya tienes cuenta?'
                    innerText='Iniciar sesión'
                    onPress={() => this.props.changeModule(1)} />
            </View>
        );
    };
}