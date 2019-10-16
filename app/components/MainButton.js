import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function MainButton(props) {
    return(
        <>
            <TouchableOpacity
                style={MainStyles.MainButtonContainer}
                onPress={() => props.onPress()}>
                <Text
                    style={MainStyles.MainButtonText}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </>
    );
}
