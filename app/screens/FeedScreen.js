import React from 'react';

import { Text, View, SafeAreaView, ScrollView, Platform, TextInput } from 'react-native';

import HomeCard from '../components/HomeCard';
import MainStyles from '../styles/MainStyles';

import Icon from 'react-native-vector-icons/Ionicons';

export default class FeedScreen extends React.Component {
    
    render() {
        let { t, locale } = this.props.screenProps;
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    height: this.startHeaderHeight, backgroundColor: 'white',
                    borderBottomWidth: 1, borderBottomColor: '#dddddd'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 10,
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        marginTop: Platform.OS == 'android' ? 30 : null,
                        shadowOffset: { width: 0, height: 0 },
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        elevation: 1,
                        borderRadius: 20,

                    }}>
                        <Icon name="ios-search" size={20}
                            style={{ marginRight: 10, marginTop: 5 }} />
                        <TextInput
                            placeholder={t('search')}
                            placeholderTextColor="grey"
                            style={{
                                flex: 1, fontWeight: '700'
                                , backgroundColor: 'white'
                            }} />
                    </View>
                    <View style={{ height: 20 }}>
                        <Text
                            style={{
                                fontSize: 24, textAlign: 'left', fontWeight: 'bold', marginStart: 20,
                                marginTop: 15
                            }}
                        >{t('newHomes')}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>
                    <ScrollView
                        contentContainerStyle={{ alignItems: 'center' }}>
                        <HomeCard
                            t={t} />
                        <HomeCard
                            t={t} />
                        <HomeCard
                            t={t} />
                    </ScrollView>

                </View>


            </SafeAreaView>
        );
    };
}