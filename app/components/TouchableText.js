import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function TouchableText(props) {
    return(
        <View 
        style={[ props.style, props.alignCenter? MainStyles.TouchableTextContainerRow : MainStyles.TouchableTextContainer]}
        >
            <Text>{props.outerText}</Text>
            <TouchableOpacity
                onPress={props.opPress}>
                <Text
                    style={MainStyles.TouchableText}>
                    {props.innerText}
                </Text>
            </TouchableOpacity>
        </View>
    );
}