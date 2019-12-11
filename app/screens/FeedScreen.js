import React from 'react';

import { Text, View, SafeAreaView, ScrollView, Platform, TextInput } from 'react-native';

import HomeCard from '../components/HomeCard';
import MainStyles from '../styles/MainStyles';

import Icon from 'react-native-vector-icons/Ionicons';

export default class FeedScreen extends React.Component {

    render() {
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;
        return (

            <SafeAreaView style={{ flex: 1 }}>
                <View style={[MainStyles.borderBottom, colorTheme.feedHeader]}>
                    <View style={[MainStyles.searchBarContainer, colorTheme.searchBar]}>
                        <Icon
                            name="ios-search"
                            size={20}
                            color={darkThemeOn ? '#fff' : '#222'}
                            style={MainStyles.searchBarIcon} />
                        <TextInput
                            placeholder={t('search')}
                            placeholderTextColor="grey"
                            style={MainStyles.searchBarText} />
                    </View>
                    <View>
                        <Text
                            style={[MainStyles.feedHeaderText, colorTheme.mainTextColor]}
                        >{t('newHomes')}</Text>
                    </View>
                </View>
                <View style={colorTheme.secondaryBackground}>
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