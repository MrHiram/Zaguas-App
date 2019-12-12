import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function HistoryButton(props) {
    return(
        <>
            <TouchableOpacity
               style={MainStyles.historyBtn}
                onPress={() => props.onPress()}>
                <Text
                    style={[props.colorTheme.btnTextColor]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </>
    );
}
