import React from 'react';
import { Text, View } from 'react-native';

import MainStyles from '../styles/MainStyles';

export default class SettingsScreen extends React.Component{

    render(){
        return(
            <View style={MainStyles.containerCenter} >
                <Text>Settings</Text>
            </View>
        );
    };
}