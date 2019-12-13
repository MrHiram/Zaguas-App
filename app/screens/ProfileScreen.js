import React from "react";
import { View, Text, ActivityIndicator, Switch, Picker } from "react-native";
import MenuDrawer from "react-native-side-drawer";
import { ScrollView } from "react-native-gesture-handler";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { LinearGradient } from "expo-linear-gradient";
import UploadPicture from "../components/UploadPicture";
import ProfileContainer from "../containers/ProfileContainer";
import MainStyles from "../styles/MainStyles";
import IconButton from "../components/IconButton";
import Fetcher from "../services/Fetcher";
import LocalStorage from "../services/LocalStorage";
import MainButton from "../components/MainButton";

export default class ProfileScreen extends React.Component {
    state = {
        profileInfo: [],
        loading: true,
        image: null,
        open: false,
        darkThemeSwitch: false,
        caretakerProfileSwitch: false,
        language: "en",
        user: null
    };

    componentDidMount() {
        this.requestPets();
    }

    requestPets = async () => {
        let idClient = null;
        let token = await LocalStorage.retrieveToken();
        await Fetcher.getClientID(token).then(response => {
            idClient = response.data.id;
        });
        await Fetcher.getToken("getProfileClient/" + idClient, token)
            .then(response => {
                this.setState({
                    profileInfo: response.data,
                    image: { uri: response.data.profile.image },
                    loading: false
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    toggleOpen = locale => {
        let { darkThemeOn, caretakerProfile } = this.props.screenProps;

        this.setState({
            darkThemeSwitch: darkThemeOn,
            caretakerProfileSwitch: caretakerProfile,
            language: locale === "en-US" || locale === "en" ? "en" : "es",
            open: !this.state.open,
        });
    };

    requestLogout = exit => {
        Fetcher.postToken("logout", this.state.token);
        LocalStorage.removeToken();
        exit();
    };

    toggleCaretaker = () =>
        this.setState({
            caretakerProfileSwitch: !this.state.caretakerProfileSwitch
        });

    toggleDarkTheme = () =>
        this.setState({
            darkThemeSwitch: !this.state.darkThemeSwitch
        });

    applySettings = () => {
        this.props.screenProps.setDarkThemeOn(this.state.darkThemeSwitch);
        this.props.screenProps.setLocale(this.state.language);
        this.props.screenProps.setCaretakerProfile(
            this.state.caretakerProfileSwitch
        );
        this.setState({ open: false });
    };

    drawerContent = (locale, exit, t, colorTheme, darkThemeOn) => {
        return (
            <View style={[MainStyles.animatedBox, colorTheme.mainBackground]}>
                <IconButton
                    onPress={() => this.toggleOpen(locale)}
                    style={MainStyles.topLeftSetings}
                    name={"md-arrow-back"}
                    color={darkThemeOn ? "#fff" : "#222"}
                    size={28}
                />

                <View style={[MainStyles.switchContainer, { marginTop: 20 }]}>
                    <Switch
                        style={MainStyles.switchSize}
                        onValueChange={this.toggleCaretaker}
                        value={this.state.caretakerProfileSwitch}
                    />
                    <Text
                        style={[
                            MainStyles.switchText,
                            colorTheme.secondaryTextColor,
                            this.state.termsError
                                ? MainStyles.mainInputErrorMessage
                                : null
                        ]}
                    >
                        {t("caretakerProfile")}
                    </Text>
                </View>

                <View style={[MainStyles.switchContainer, { marginTop: 20 }]}>
                    <Switch
                        style={MainStyles.switchSize}
                        onValueChange={this.toggleDarkTheme}
                        value={this.state.darkThemeSwitch}
                    />
                    <Text
                        style={[
                            MainStyles.switchText,
                            colorTheme.secondaryTextColor,
                            this.state.termsError
                                ? MainStyles.mainInputErrorMessage
                                : null
                        ]}
                    >
                        {t("darkTheme")}
                    </Text>
                </View>

                <Picker
                    style={colorTheme.mainTextColor}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) =>
                        this.setState({ language: itemValue })
                    }
                >
                    <Picker.Item label="Español" value="es" />
                    <Picker.Item label="English" value="en" />
                </Picker>

                <MainButton
                    title={t("apply")}
                    onPress={() => this.applySettings()}
                    colorTheme={colorTheme}
                />

                <View style={{ height: 20 }} />

                <MainButton
                    onPress={() => this.requestLogout(exit)}
                    title="Logout"
                    colorTheme={colorTheme}
                />
            </View>
        );
    };

    render() {
        let {
            t,
            locale,
            exit,
            colorTheme,
            darkThemeOn
        } = this.props.screenProps;
        return (
            <>
                {this.state.loading ? (
                    <ActivityIndicator
                        size="large"
                        color="#007EA9"
                        style={MainStyles.loading}
                    />
                ) : (
                    <View
                        style={[
                            MainStyles.mainContainer,
                            colorTheme.secondaryBackground
                        ]}
                    >
                        <MenuDrawer
                            open={this.state.open}
                            drawerContent={this.drawerContent(
                                locale,
                                exit,
                                t,
                                colorTheme,
                                darkThemeOn
                            )}
                            drawerPercentage={100}
                            animationTime={250}
                            overlay={true}
                            opacity={1}
                        >
                            <ScrollView>
                                <View
                                    style={[
                                        MainStyles.animatedHeaderContainer,
                                        { height: 300 }
                                    ]}
                                >
                                    <LinearGradient
                                        start={{ x: 0, y: 0.75 }}
                                        end={{ x: 0.5, y: 0.75 }}
                                        colors={["#045379", "#1782ac"]}
                                        style={{
                                            position: "absolute",
                                            height: 500,
                                            width: "100%"
                                        }}
                                    />
                                    <IconButton
                                        onPress={() => this.toggleOpen(locale)}
                                        style={MainStyles.topRightSetings}
                                        name={"md-settings"}
                                        color={darkThemeOn ? "#222" : "#fff"}
                                        size={28}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "column",
                                            marginTop: 30
                                        }}
                                    >
                                        <View
                                            style={{ width: 180, height: 180 }}
                                        >
                                            <UploadPicture
                                                image={this.state.image}
                                                error={this.state.imageError}
                                                handlerImage={this.handlerImage}
                                                colorTheme={colorTheme}
                                            />
                                        </View>
                                        <Text
                                            style={[
                                                MainStyles.mainName,
                                                colorTheme.btnTextColor
                                            ]}
                                        >
                                            {this.state.profileInfo.user.name}
                                        </Text>
                                    </View>
                                </View>
                                <ProfileContainer
                                    description={
                                        this.state.profileInfo.profile.about
                                    }
                                    screenProps={this.props.screenProps}
                                    goAddPet={() =>
                                        this.props.navigation.navigate(
                                            "AddPet",
                                            {
                                                onGoBack: () =>
                                                    this.requestPets()
                                            }
                                        )
                                    }
                                    imagePet={this.state.image}
                                    pets={this.state.profileInfo.pets}
                                    navigation={this.props.navigation}
                                    requestPets={() => this.requestPets()}
                                />
                            </ScrollView>
                        </MenuDrawer>
                    </View>
                )}
            </>
        );
    }
}
