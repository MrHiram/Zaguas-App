import React, { Component } from "react";
import {
    View,
    Text, Image
} from "react-native";

import styles from '../styles/MainStyles';
import HistoryButton from "../components/HistoryButton";
import MainStyles from "../styles/MainStyles";

export default class HistoryCardContainer extends React.Component {
    render() {
        let { t, colorTheme, darkThemeOn } = this.props.screenProps;
        return (
            <View style={MainStyles.cardHistoryContainer}>
                <View
                    style={{ flexDirection: 'row', width: '100%' }}
                >
                    <Image source={require('../../assets/dogProfile.png')}
                        style={{ height: 60, width: 60, borderRadius: 15, margin: 10 }} />
                    <View style={{ flexDirection: 'column', width: '35%', justifyContent: 'center' }}>
                        <Text style={MainStyles.userText}>Lil. D</Text>
                        <Text style={MainStyles.descriptionUser}>{t('owner')}</Text>
                    </View>
                    <Text style={{ alignSelf: 'flex-start', marginTop: 20 }}>10/02/19-15/02/19</Text>
                </View>
                <View
                    style={{ flexDirection: 'row', alignSelf: 'center' }}
                >
                    <View style={{ flexDirection: 'column' }}>
                        <Image
                            resizeMode='cover'
                            source={require('../../assets/casa1.jpg')}
                            style={MainStyles.userImage} />
                        <Text style={MainStyles.priceText}>₡8.000 {t('price')}</Text>
                    </View>


                </View>
                <View style={{ alignSelf: 'center', marginVertical: 10 }}>
                    <HistoryButton
                        title='pending'
                        colorTheme={colorTheme}
                    />
                </View>
            </View>
        );
    }
}

