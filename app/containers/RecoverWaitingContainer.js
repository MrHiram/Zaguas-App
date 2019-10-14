import React from 'react';
import { View, Text } from 'react-native';
import TouchableText from '../components/TouchableText';
import MainStyles from '../styles/MainStyles';

export default class RecoverWaitingContainer extends React.Component {
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
                        Tu petición está siendo procesada,{'\n'}esto puede tardar unos segundos.
                </Text>
                <View style={{marginVertical: 40} /* This is a spacer */}/>   
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    outerText='¿Deseas ingresar?'
                    innerText='Iniciar sesión'
                    onPress={() => this.props.changeModule(5) /*TODO: Debe ir un 1*/}/>
            </View>

        );
    };
}