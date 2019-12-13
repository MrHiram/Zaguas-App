import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function HistoryButton(props) {
    return(
        <>
            <TouchableOpacity
               style={MainStyles.historyBtn}
                >
                <Text
                    style={[props.colorTheme.btnTextColor]}>
                    {props.title}
                </Text>
            </TouchableOpacity>
        </>
    );
}
