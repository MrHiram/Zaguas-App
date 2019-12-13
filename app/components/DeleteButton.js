import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function DeleteButton(props) {
    return(
        <>
            <TouchableOpacity
                style={MainStyles.deleteButton}
                onPress={() => props.onPress()}>
                <Text
                    style={[MainStyles.MainButtonText, props.colorTheme.btnTextColor]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </>
    );
}
