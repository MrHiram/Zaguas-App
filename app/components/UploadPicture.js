import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity, Image
} from "react-native";
import MainStyles from '../styles/MainStyles';


export default function UploadPicture(props) {

    return (
        <>
            <TouchableOpacity style={{ height: 150, marginTop: 20 }}
                onPress={props.handlerImage}>
                <Image
                    source={props.image == null ? require('../../assets/dogProfile.png') : { uri: props.image.uri }}
                    resizeMode='contain'
                    style={{ height: '90%', width: '90%', alignSelf: 'center', borderRadius: 400 / 2 }}
                />
                <Text
                    style={MainStyles.profilePictureText}
                >{props.titlePicture}</Text>
                <Text style={[MainStyles.mainInputErrorMessage, MainStyles.mainImageErrorMessage]}>{props.error}</Text>
            </TouchableOpacity>
        </>
    );
}



