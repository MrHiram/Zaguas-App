import React from 'react';
import { Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';

export default function InputMT(props) {
    return (
        <>
            <Text style={MainStyles.mainInputTitle}>{props.title}</Text>

            <View style={[MainStyles.mainInputContainer, props.error ? MainStyles.mainInputContainerError : null]}>

                <TextInput
                    secureTextEntry={props.secureTextEntry}
                    style={MainStyles.mainInput}
                    placeholder={props.placeholder}
                    onChangeText={e => props.handleValue(props.handler, e)}
                    value={props.value} />
                {
                    props.error || props.success ?
                        <Image
                            style={MainStyles.mainInputImg}
                            source={props.error ? require('../../assets/error.png') : props.success ? require('../../assets/success.png') : ''} />
                        :
                        null
                }
                {
                    props.togglePassword != null ?
                        <TouchableOpacity
                            onPress={props.togglePassword}>
                            <Image
                                style={MainStyles.mainInputImg} 
                                resizeMode="contain"
                                source={props.secureTextEntry ? require('../../assets/lock-closed.png') : require('../../assets/lock-opened.png')}
                            />
                        </TouchableOpacity>
                        :
                        null
                } 
            </View>
            <Text style={MainStyles.mainInputErrorMessage}>{props.error}</Text>
        </>
    );
}
