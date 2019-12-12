import React from 'react';

import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import MainStyles from '../styles/MainStyles';

export default function InputMT(props) {
    return (
        <>
            <Text style={[MainStyles.mainTitle, MainStyles.alignLeft, props.colorTheme.subtitleTextColor]}>{props.title}</Text>

            <View style={[MainStyles.mainInputContainer, props.error ? MainStyles.mainInputContainerError : null]}>
                <TextInput
                    autoCompleteType={props.autoCompleteType || 'off'}
                    secureTextEntry={props.secureTextEntry}
                    style={[MainStyles.mainContainer, props.colorTheme.mainTextColor, props.height ? {height: props.height} : null]}
                    placeholder={props.placeholder}
                    onChangeText={e => props.handleValue(props.handler, e)}
                    value={props.value}
                    multiline={props.multiline || false} />
                {
                    props.error || props.success ?
                        props.error ?

                            <Icon
                                name="md-close-circle"
                                color={'#E54F3C'}
                                size={24} />
                            :
                            <Icon
                                name="md-checkmark-circle"
                                color={'#92D3DC'}
                                size={24} />
                        :
                        null

                }
                {
                    props.togglePassword != null ?
                        <TouchableOpacity
                            onPress={props.togglePassword}>
                            {
                                props.secureTextEntry ?

                                    <Icon
                                        name="md-lock"
                                        color={props.darkThemeOn ? '#fff' : '#222'}
                                        size={24} />
                                    :
                                    <Icon
                                        name="md-unlock"
                                        color={props.darkThemeOn ? '#fff' : '#222'}
                                        size={24} />

                            }
                        </TouchableOpacity>
                        :
                        null
                }
            </View>
            <Text style={MainStyles.mainInputErrorMessage}>{props.error}</Text>
        </>
    );
}
