import React from 'react';
import { Text, View, ScrollView, Platform, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainStyles from '../styles/MainStyles';
import HistoryCardContainer from '../containers/HistoryCardContainer';

import HistoryButton from '../components/HistoryButton'

export default class HistoryScreen extends React.Component{

    render(){
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;
        return(
            <View style={[MainStyles.containerHistory,colorTheme.secondaryBackground]}>
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
                        >{t('recentHomes')}</Text>
                    </View>
                </View>
                <View style={colorTheme.secondaryBackground}>
                    <ScrollView
                        contentContainerStyle={{ alignItems: 'center' }}>
                  
                    </ScrollView>
                    <HistoryCardContainer screenProps={this.props.screenProps}/>
                </View>


            </View>
        );
    };
}