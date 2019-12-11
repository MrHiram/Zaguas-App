import React from 'react';
import { View, Text } from 'react-native';
import MainButton from '../components/MainButton';
import MainStyles from '../styles/MainStyles';

export default class RegisterSuccessContainer extends React.Component {
    render() {
        let { t, colorTheme } = this.props.screenProps;
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter, colorTheme.subtitleTextColor]}>
                    {t('emailSent')}
                </Text>
                <View style={{ marginVertical: 25 }} />
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter, colorTheme.secondaryTextColor]}>
                    {t('emailSentTo')}
                </Text>
                <Text
                    style={[MainStyles.mainText, MainStyles.textBold, MainStyles.alignCenter, colorTheme.secondaryTextColor]}>
                    {this.props.email}
                </Text>
                <View style={{ marginVertical: 15 }} />
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter, colorTheme.secondaryTextColor]}>
                    {t('verifyYourAccount')}
                </Text>
                <View style={{ marginVertical: 25 }} />
                <MainButton
                    title={t('backToHome')}
                    onPress={() => this.props.changeModule(1)}
                    colorTheme={colorTheme} />
                <View style={{ marginVertical: 25 }} />
            </View>

        );
    };
}