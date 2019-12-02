import React from 'react';
import { View, Text } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default class RegisterWaitingContainer extends React.Component {
    render() {
        let { t } = this.props.t;
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter]}>
                    {t('waitOneMoment')}
                </Text>
                <View style={{marginVertical: 40} /* This is a spacer */}/>
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    {t('processing')}
                </Text>
                <View style={{marginVertical: 50} /* This is a spacer */}/>   
            </View>

        );
    };
}