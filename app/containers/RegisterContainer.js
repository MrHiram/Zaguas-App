import React from 'react';
import { View, Text, Switch } from 'react-native';

import InputMT from '../components/InputMT';
import TouchableText from '../components/TouchableText';
import MainButton from '../components/MainButton';
import WaitingContainer from './RegisterWaitingContainer';

import validator from '../services/Validator';
import Fetcher from '../services/Fetcher';

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
        termsError: false,
        waiting: false
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
        let { t } = this.props.t;
        let validName = this.state.name != '' ? true : false;
        let validLastName = this.state.lastname != '' ? true : false;
        let validEmail = validator.email(this.state.email);
        let validPassword = validator.password(this.state.password);
        let validconfirmPassword = validator.passwordConfirm(this.state.password, this.state.confirmPassword);

        if (validName && validLastName && validEmail && validPassword && validconfirmPassword && this.state.termsSuccess) {
            var data = {
                name: this.state.name,
                lastname: this.state.lastname,
                email: this.state.email.toLowerCase(),
                password: this.state.password,
                password_confirmation: this.state.confirmPassword
            };
            this.setState({
                waiting: true
            });
            Fetcher.postNoToken('register', data)
                .then(
                    (response) => {
                        console.log(response);
                        if (response.data.message) {
                            this.props.toggleEmail(data.email);
                            this.props.changeModule(6);
                        } else if (response.data.error) {
                            this.handleError(response.data.error);
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error);
                        this.setState({ waiting: false });
                    }
                );
        } else {
            if (!validName)
                this.setState({ nameError: t('nameER'), nameSuccess: false });
            else
                this.setState({ nameError: '', nameSuccess: true });

            if (!validLastName)
                this.setState({ lastnameError: t('lastnameER'), lastnameSuccess: false });
            else
                this.setState({ lastnameError: '', lastnameSuccess: true });

            if (!validEmail)
                this.setState({ emailError: t('wrongFormatER'), emailSuccess: false });
            else
                this.setState({ emailError: '', emailSuccess: true });

            if (!validconfirmPassword)
                this.setState({ confirmPasswordError: t('passwordMatchER'), confirmPasswordSuccess: false })
            else
                this.setState({ confirmPasswordError: '', confirmPasswordSuccess: true });

            if (!validPassword)
                this.setState({ passwordError: t('eightLettersER'), passwordSuccess: false })
            else
                this.setState({ passwordError: '', passwordSuccess: true });

            this.setState({ termsError: !this.state.termsSuccess });
        }
    }

    handleError = (errors) => {
        let emailError = '';
        let passwordError = '';
        console.log(errors);
        errors.forEach(error => {
            switch (error) {
                case "Invalid credentials":
                    emailError = passwordError = t('invalidCredentialsER');
                    break;
                case "The email field is required.":
                    passwordError = t('emailRequiredER');
                    break;
                case "The password field is required.":
                    passwordError = t('passwordRequiredER');
                    break;
                case "The email must be a valid email address.":
                    emailError = t('wrongFormatER');
                    break;
                case "User does not exist":
                    emailError = t('userNotFoundER');
                    break;
            }
        });
        this.setState({
            waiting: false,
            emailError: emailError,
            passwordError: passwordError,
        });
    }

    render() {
        let { t } = this.props.t;
        return (<>
            {this.state.waiting ?
                <WaitingContainer t={this.props.t} />
                :
                <View style={MainStyles.containerCenter}>
                    <InputMT
                        title={t('name')}
                        placeholder={t('enterName')}
                        handler='name'
                        value={this.state.name}
                        handleValue={this.handleValue}
                        error={this.state.nameError}
                        success={this.state.nameSuccess} />
                    <InputMT
                        title={t('lastname')}
                        placeholder={t('enterLastname')}
                        handler='lastname'
                        value={this.state.lastname}
                        handleValue={this.handleValue}
                        error={this.state.lastnameError}
                        success={this.state.lastnameSuccess} />
                    <InputMT
                        title={t('email')}
                        placeholder={t('emailExampleCom')}
                        handler='email'
                        autoCompleteType='email'
                        value={this.state.email}
                        handleValue={this.handleValue}
                        error={this.state.emailError}
                        success={this.state.emailSuccess} />
                    <InputMT
                        title={t('password')}
                        placeholder={t('createPassword')}
                        handler='password'
                        autoCompleteType='password'
                        secureTextEntry={this.state.showPassword}
                        value={this.state.password}
                        handleValue={this.handleValue}
                        togglePassword={this.togglePasswords}
                        error={this.state.passwordError}
                        success={this.state.passwordSuccess} />
                    <InputMT
                        title={t('confirmPassword')}
                        placeholder={t('enterSamePassword')}
                        handler='confirmPassword'
                        autoCompleteType='password'
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
                        <Text style={[MainStyles.switchText, this.state.termsError ? MainStyles.mainInputErrorMessage : null]}>{t('acceptTerms')}</Text>
                    </View>
                    <MainButton
                        title={t('register')}
                        onPress={this.requestRegister} />
                    <TouchableText
                        style={MainStyles.spacer}
                        alignCenter={true}
                        outerText={t('haveAccountQN')}
                        innerText={t('logIn')}
                        onPress={() => this.props.changeModule(1)} />
                </View>}
        </>
        );
    };
}