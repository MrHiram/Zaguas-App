import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import ProfileScreen from '../screens/ProfileScreen';
import FeedScreen from '../screens/FeedScreen';
import HistoryScreen from '../screens/HistoryScreen';


const TABS = {
    History: {
        screen: HistoryScreen,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-timer" color=
                    {tintColor} size={24} />
            )
        }
    },
    Feed: {
        screen: FeedScreen,
        navigationOptions: {
            tabBarLabel: 'Feed',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color=
                    {tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: {
            tabBarLabel: 'Profile',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color=
                    {tintColor} size={24} />
            )
        }
    },
}

export default class DynamicTabNavigatorScreen extends React.Component {
    exit = () => this.props.navigation.navigate({ routeName: 'Auth' });

    _tabNavigator(t, darkThemeOn) {
        let tabs = {};
        const { History, Feed, Profile } = TABS;
        tabs = { History, Feed, Profile };
        History.navigationOptions.tabBarLabel = t('history');
        Feed.navigationOptions.tabBarLabel = t('feed');
        Profile.navigationOptions.tabBarLabel = t('profile');
        return createBottomTabNavigator(tabs, {
            initialRouteName: 'Feed',
            tabBarOptions: {
                activeTintColor: darkThemeOn ? '#fff' : '#007EA8',
                inactiveTintColor: 'grey',
                style: {
                    backgroundColor: darkThemeOn ? '#222' : '#fff',
                    borderTopWidth: 0,
                    shadowOffset: { width: 5, height: 3 },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    elevation: 5
                }
            },
        });
    }

    render() {
        let { t, locale, setLocale, colorTheme, darkThemeOn, setDarkThemeOn } = this.props.screenProps;
        const Tabs = this._tabNavigator(t, darkThemeOn);
        const AppContainer = createAppContainer(Tabs);
        return (
            <AppContainer
                screenProps={{
                    exit: this.exit,
                    t: t,
                    locale: locale,
                    setLocale: setLocale,
                    colorTheme: colorTheme,
                    darkThemeOn: darkThemeOn,
                    setDarkThemeOn: setDarkThemeOn
                }} />
        );
    }
}