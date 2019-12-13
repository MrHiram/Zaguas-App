import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

import styles from '../styles/MainStyles';
import HistoryButton from '../components/HistoryButton';
import MainStyles from '../styles/MainStyles';

export default class HistoryCardContainer extends React.Component {
    render() {
        let { t, colorTheme, darkThemeOn } = this.props.screenProps;
        
        return (
            <View style={MainStyles.cardHistoryContainer}>
                <View style={{ flexDirection: 'row', width: '100%' }}>
                    <Image
                        source={{uri:this.props.ownerImage}}
                        style={{
                            height: 60,
                            width: 60,
                            borderRadius: 15,
                            margin: 10
                        }}
                    />
                    <View
                        style={{
                            flexDirection: 'column',
                            width: '30%',
                            justifyContent: 'center'
                        }}
                    >
                        <Text style={MainStyles.userText}>{this.props.ownerName}</Text>
                        <Text style={MainStyles.descriptionUser}>
                            {this.props.ownerLocation}
                        </Text>
                    </View>
                    <Text style={{ alignSelf: 'flex-start', marginTop: 20 }}>
                        {this.props.start_date}  -  {this.props.end_date}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'column', width: '100%',  padding: 20 }}>
                        <Image
                            resizeMode="cover"
                            source={{uri:this.props.image}}
                            style={MainStyles.userImage}
                        />
                        <Text style={MainStyles.priceText}>
                        ₡{this.props.price_per_night} {t('price')}
                        </Text>
                    </View>
                </View>
                <View style={{ alignSelf: 'center', marginBottom: 10 }}>
                    <HistoryButton title={this.props.status} colorTheme={colorTheme} />
                </View>
            </View>
        );
    }
}
