import React from 'react';
import { View, Text } from 'react-native';
import MainButton from '../components/MainButton';
import MainStyles from '../styles/MainStyles';

export default class RecoverSuccessContainer extends React.Component {
    render() {
        let { t } = this.props.t;
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter]}>
                    {t('emailSent')}
                </Text>
                <View style={{ marginVertical: 25 } /* This is a spacer */} />
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    {t('passwordSentTo')}
                </Text>
                <Text
                    style={[MainStyles.mainText, MainStyles.textBold, MainStyles.alignCenter]}>
                    {this.props.email}
                </Text>
                <View style={{ marginVertical: 15 } /* This is a spacer */} />
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    {t('linkForTimeMsg')}
                </Text>
                <View style={{ marginVertical: 25 } /* This is a spacer */} />
                <MainButton
                    title={t('backToHome')}
                    onPress={() => this.props.changeModule(1)} />
                <View style={{ marginVertical: 25 } /* This is a spacer */} />
            </View>

        );
    };
}