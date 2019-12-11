import React from 'react';
import { View, Alert} from 'react-native';

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

    requestReset = async (t) => {
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
                        if (response.data.message) {
                            this.props.goBack();
                        } else if (response.data.error) {
                            this.handleError(response.data.error, t);
                        }
                    }
                )
                .catch(
                    (error) => { this.handleError(error, t) }
                );
        } else {
            console.log(['valid',validPassword]);
            if (!validPassword){
                this.setState({ passwordError: t('eightLettersER'), passwordSuccess: false });
            }else{
                this.setState({ passwordError: '', passwordSuccess: true });
            }
            if (!validConfirmation) {
                this.setState({ confirmPasswordError: t('passwordMatchER'), confirmPasswordSuccess: false });
            } else {
                this.setState({ confirmPasswordError: '', confirmPasswordSuccess: true });
            }
        }
    }

    handleError = (errors, t) => {
        let passwordError = '';
        // console.log(errors);

        errors.forEach(error => {
            switch (error) {
                case "Invalid credentials":
                    emailError = passwordError = t('invalidCretentialER');
                    break;
                case "The email field is required.":
                    passwordError = t('emailRequiredER');
                    break;
                case "The password field is required.":
                    passwordError = t('passwordRequierdER');
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
                case "The token field is required.":
                    Alert.alert(
                        t('alertErrorTitle'),
                        t('alertErrorMSG'),
                        [
                          { text: 'OK', onPress: () => this.props.goBack() },
                        ],
                        { cancelable: false }
                      );
                    break;
            }
        });
        this.setState({
            passwordError: passwordError,
        });
    }

    render() {
        let { t, colorTheme, darkThemeOn } = this.props.screenProps;
        return (
            <View style={[MainStyles.containerCenter]}>
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
                    darkThemeOn={darkThemeOn}
                    colorTheme={colorTheme} />
                <InputMT
                    title={(t('confirmPassword'))}
                    placeholder={(t('confirmPassword'))}
                    handler='confirmPassword'
                    secureTextEntry={this.state.showPassword}
                    value={this.state.confirmPassword}
                    handleValue={this.handleValue}
                    togglePassword={this.togglePasswords}
                    error={this.state.confirmPasswordError}
                    success={this.state.confirmPasswordSuccess}
                    darkThemeOn={darkThemeOn}
                    colorTheme={colorTheme} />
                <MainButton
                    title={t('changePassword')}
                    onPress={() => this.requestReset(t)} 
                    colorTheme={colorTheme}/>
            </View>
        );
    };
}