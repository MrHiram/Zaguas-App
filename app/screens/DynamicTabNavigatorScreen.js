import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import ProfileScreen from "../screens/ProfileScreen";
import FeedScreen from "../screens/FeedScreen";
import HistoryScreen from "../screens/HistoryScreen";
import CaretakerScreen from "../screens/CaretakerScreen";
import AddPetScreen from "../screens/AddPetScreen";
import PetScreen from "../screens/PetScreen";
import ViewHomeScreen from "./ViewHomeScreen";

const ProfileStack = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreen
        },
        AddPet: {
            screen: AddPetScreen
        },
        PetProfile: {
            screen: PetScreen
        },
        ViewHome:{
            screen: ViewHomeScreen
        }
    },
    {
        initialRouteName: "Profile",
        defaultNavigationOptions: {
            header: null
        }
    }
);

const TABS = {
    History: {
        screen: HistoryScreen,
        navigationOptions: {
            tabBarLabel: "History",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-timer" color={tintColor} size={24} />
            )
        }
    },
    Feed: {
        screen: FeedScreen,
        navigationOptions: {
            tabBarLabel: "Feed",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-home" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions: {
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
                <Icon name="md-person" color={tintColor} size={24} />
            )
        }
    }
};

export default class DynamicTabNavigatorScreen extends React.Component {
    exit = () => this.props.navigation.navigate({ routeName: "Auth" });
    push = (screen, props) => this.props.navigation.navigate(screen, { props });

    _tabNavigator(t, darkThemeOn) {
        let tabs = {};
        const { History, Feed, Profile } = TABS;
        tabs = { History, Feed, Profile };
        History.navigationOptions.tabBarLabel = t("history");
        Feed.navigationOptions.tabBarLabel = t("feed");
        Profile.navigationOptions.tabBarLabel = t("profile");
        if (this.props.screenProps.caretakerProfile == true) {
            Profile.screen = CaretakerScreen;
        }
        return createBottomTabNavigator(tabs, {
            initialRouteName: "Feed",
            tabBarOptions: {
                activeTintColor: darkThemeOn ? "#fff" : "#007EA8",
                inactiveTintColor: "grey",
                style: {
                    backgroundColor: darkThemeOn ? "#222" : "#fff",
                    borderTopWidth: 0,
                    shadowOffset: { width: 5, height: 3 },
                    shadowColor: "black",
                    shadowOpacity: 0.5,
                    elevation: 5
                }
            }
        });
    }

    render() {
        let {
            t,
            locale,
            setLocale,
            colorTheme,
            darkThemeOn,
            setDarkThemeOn,
            caretakerProfile,
            setCaretakerProfile
        } = this.props.screenProps;
        const Tabs = this._tabNavigator(t, darkThemeOn);
        const AppContainer = createAppContainer(Tabs);
        return (
            <AppContainer
                screenProps={{
                    exit: this.exit,
                    push: this.push,
                    t: t,
                    locale: locale,
                    setLocale: setLocale,
                    colorTheme: colorTheme,
                    darkThemeOn: darkThemeOn,
                    setDarkThemeOn: setDarkThemeOn,
                    caretakerProfile: caretakerProfile,
                    setCaretakerProfile: setCaretakerProfile
                }}
            />
        );
    }
}
