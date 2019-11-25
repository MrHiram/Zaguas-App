import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function IconButton(props) {
    return (
        <TouchableOpacity
            style={props.style}
            onPress={() => props.onPress()}>
            <Icon
                name={props.name}
                color={props.color}
                size={props.size} />
        </TouchableOpacity>
    );
}
