import React from 'react';
import { View, Text } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default class RegisterWaitingContainer extends React.Component {
    render() {
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter]}>
                    Espera un momento...
                </Text>
                <View style={{marginVertical: 40} /* This is a spacer */}/>
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                        Tu registro está siendo procesado,{'\n'}esto puede tardar unos segundos.
                </Text>
                <View style={{marginVertical: 50} /* This is a spacer */}/>   
            </View>

        );
    };
}