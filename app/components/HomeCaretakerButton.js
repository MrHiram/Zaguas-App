import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function HomeCaretakerButton(props) {
    return(
        <>
            <TouchableOpacity
                style={MainStyles.buttonHome}
                onPress={() => props.onPress()}>
                <Text
                    style={[MainStyles.MainButtonText, props.colorTheme.btnTextColor]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </>
    );
}
