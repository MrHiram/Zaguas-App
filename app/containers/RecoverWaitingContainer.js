import React from 'react';
import { View, Text } from 'react-native';
import TouchableText from '../components/TouchableText';
import MainStyles from '../styles/MainStyles';

export default class RecoverWaitingContainer extends React.Component {
    render() {
        let { t } = this.props.t;
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter]}>
                    {t('waitOneMoment')}
                </Text>
                <View style={{marginVertical: 40}}/>
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    {t('processing')}
                </Text>
                <View style={{marginVertical: 40}}/>   
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText={t('wantToEnterQN')}
                    innerText={t('logIn')}
                    onPress={() => this.props.changeModule(1)}/>
            </View>

        );
    };
}