import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import MainStyles from "../styles/MainStyles";


export default function PetProfileCard(props) {

    return (
        <View
            style={{
                width: '45%', height: 200, marginRight: 10,
                marginTop: 10,
            }}>
            <TouchableOpacity
                style={{
                    opacity: 0.7,
                    backgroundColor:'#000000',
                    borderRadius: 10
                }}
                onPress={props.handlerImage}>
                <Image source={props.image == null ? require('../../assets/dogProfile.png') : { uri: props.image.uri }}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover', borderRadius: 10 }} />

            </TouchableOpacity>
            <Text style={[{ position: 'absolute', left: 5, right: 0, bottom: 10, fontSize: 24, color: '#FFFFFF' }]}>
                {props.name}
            </Text>
        </View>

    );
}

