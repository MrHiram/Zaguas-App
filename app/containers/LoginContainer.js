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
        let { t } = this.props.screenProps;
        let validEmail = Validator.email(this.state.email);
        let validPassword = Validator.password(this.state.password);
        if (validEmail && validPassword) {
            var data = {
                email: this.state.email.toLowerCase(),
                password: this.state.password
            };
            Fetcher.postNoToken('login', data)
                .then(
                    (response) => {
                        if (response.data.profile) {
                            LocalStorage.saveToken(response.data.accessToken);
                            LocalStorage.save('roleSetUp', 'roleSetUp');
                            this.props.setup();
                        } else if (response.data.accessToken) {
                            LocalStorage.saveToken(response.data.accessToken);
                            this.props.loginSuccess();
                        } else if (response.data.error) {

                            this.handleError(response.data.error);
                        }

                    }
                )
                .catch(
                    (error) => { console.log(['Login container error', error]) }
                );
        } else {
            if (!validEmail)
                this.setState({ emailError: t('wrongFormatER'), emailSuccess: false });
            else
                this.setState({ emailError: '', emailSuccess: true });
            if (!validPassword)
                this.setState({ passwordError: t('eightLettersER'), passwordSuccess: false })
            else
                this.setState({ passwordError: '', passwordSuccess: true });
        }
    }

    handleError = (errors) => {
        let { t } = this.props.screenProps;
        let emailError = '';
        let passwordError = '';
        console.log(['Login container error', errors]);

        errors.forEach(error => {
            switch (error) {
                case "Invalid credentials":
                    emailError = passwordError = t('invalidCredentialsER');
                    break;
                case "The email field is required.":
                    passwordError = t('emailRequiredER')
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
                case "Inactive user":
                    emailError = t('inactiveUserER');
                    break;

            }
        });
        this.setState({
            emailError: emailError,
            passwordError: passwordError,
        });
    }

    render() {
        let { t, colorTheme, darkThemeOn } = this.props.screenProps;
        return (
            <View style={[MainStyles.containerCenter]}>
                <InputMT
                    title={t('email')}
                    placeholder={t('emailExampleCom')}
                    handler='email'
                    value={this.state.email}
                    handleValue={this.handleValue}
                    error={this.state.emailError}
                    success={this.state.emailSuccess}
                    colorTheme={colorTheme} />
                <InputMT
                    title={t('password')}
                    placeholder={t('password')}
                    handler='password'
                    secureTextEntry={this.state.showPassword}
                    value={this.state.password}
                    handleValue={this.handleValue}
                    togglePassword={this.togglePasswords}
                    error={this.state.passwordError}
                    success={this.state.passwordSuccess}
                    colorTheme={colorTheme}
                    darkThemeOn={darkThemeOn} />
                <TouchableText
                    alignCenter={false}
                    innerText={t('forgotPasswordQN')}
                    onPress={() => this.props.changeModule(3)}
                    colorTheme={colorTheme} />
                <MainButton
                    title={t('logIn')}
                    onPress={this.requestLogin}
                    colorTheme={colorTheme} />
                <TouchableText
                    style={[MainStyles.spacer]}
                    alignCenter={true}
                    outerText={t('registerQN')}
                    innerText={t('signUp')}
                    onPress={() => this.props.changeModule(2)}
                    colorTheme={colorTheme} />
            </View>
        );
    };
}