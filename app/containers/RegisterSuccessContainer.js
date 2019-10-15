import React from 'react';
import { View, Text } from 'react-native';
import MainButton from '../components/MainButton';
import MainStyles from '../styles/MainStyles';

export default class RegisterSuccessContainer extends React.Component {
    render() {
        return (
            <View style={MainStyles.containerCenter}>
                <Text
                    style={[MainStyles.mainTitle, MainStyles.alignCenter]}>
                    ¡Correo enviado!
                </Text>
                <View style={{ marginVertical: 25 } /* This is a spacer */} />
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    Tu contraseña ha sido enviada a
                </Text>
                <Text
                    style={[MainStyles.mainText, MainStyles.textBold, MainStyles.alignCenter]}>
                    {this.props.email}
                </Text>
                <View style={{ marginVertical: 15 } /* This is a spacer */} />
                <Text
                    style={[MainStyles.mainText, MainStyles.alignCenter]}>
                    El enlace tiene vigencia por{'\n'}60 minutos.
                </Text>
                <View style={{ marginVertical: 25 } /* This is a spacer */} />
                <MainButton
                    title='Volver al inicio'
                    onPress={() => this.props.changeModule(1)} />
                <View style={{ marginVertical: 25 } /* This is a spacer */} />
            </View>

        );
    };
}