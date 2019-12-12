import React from 'react';
import { View, Text, Switch, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import MenuDrawer from 'react-native-side-drawer'

import EditHomeCaretakerContainer from '../containers/EditHomeCaretakerContainer';
import CaretakerContainer from '../containers/CaretakerContainer';
import IconButton from '../components/IconButton';
import MainButton from '../components/MainButton';
import UploadPicture from '../components/UploadPicture';

import MainStyles from '../styles/MainStyles';

import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';


export default class CaretakerScreen extends React.Component {
    state = {
        name: '',
        descriptionName: '',
        image: null,
        contact: '',
        location: '',
        token: '',
        open: false,
        darkThemeSwitch: false,
        caretakerProfileSwitch: false,
        language: 'en'
    }

    handleValue = (key, value) => {
        switch (key) {
            case 'name':
                this.setState({
                    name: value
                });
                return;
            case 'descriptionName':
                this.setState({
                    descriptionName: value
                });
                return;
            case 'contact':
                this.setState({
                    contact: value
                });
                return;
            case 'location':
                this.setState({
                    location: value
                });
                return;
        }
    }


    componentDidMount() {
        this.init();
    }

    init = async () => {
        let token = await LocalStorage.retrieveToken();
        this.setState({
            token: token
        });
    }

    toggleOpen = (locale) => {
        let { darkThemeOn, caretakerProfile, } = this.props.screenProps;
        this.setState({
            open: !this.state.open,
            darkThemeSwitch: darkThemeOn,
            caretakerProfileSwitch: caretakerProfile,
            language: locale === 'en-US' || locale === 'en' ? 'en' : 'es'
        });
    };

    requestLogout = (exit) => {
        Fetcher.postToken('logout', this.state.token);
        LocalStorage.removeToken();
        exit();
    }

    toggleCaretaker = () => this.setState({ caretakerProfileSwitch: !this.state.caretakerProfileSwitch });

    toggleDarkTheme = () =>
        this.setState({
            darkThemeSwitch: !this.state.darkThemeSwitch,
        });

    applySettings = () => {
        this.props.screenProps.setDarkThemeOn(this.state.darkThemeSwitch);
        this.props.screenProps.setLocale(this.state.language);
        this.props.screenProps.setCaretakerProfile(this.state.caretakerProfileSwitch);
        this.setState({ open: false });
    }

    drawerContent = (locale, exit, t, colorTheme, darkThemeOn) => {
        return (
            <View style={[MainStyles.animatedBox, colorTheme.mainBackground]}>
                <IconButton
                    onPress={() => this.toggleOpen(locale)}
                    style={MainStyles.topLeftSetings}
                    name={"md-arrow-back"}
                    color={darkThemeOn ? '#fff' : '#222'}
                    size={28} />

                <View style={[MainStyles.switchContainer, { marginTop: 20 }]}>
                    <Switch
                        style={MainStyles.switchSize}
                        onValueChange={this.toggleCaretaker}
                        value={this.state.caretakerProfileSwitch} />
                    <Text style={[MainStyles.switchText, colorTheme.secondaryTextColor, this.state.termsError ? MainStyles.mainInputErrorMessage : null]}>{t('caretakerProfile')}</Text>
                </View>

                <View style={[MainStyles.switchContainer, { marginTop: 20 }]}>
                    <Switch
                        style={MainStyles.switchSize}
                        onValueChange={this.toggleDarkTheme}
                        value={this.state.darkThemeSwitch} />
                    <Text style={[MainStyles.switchText, colorTheme.secondaryTextColor, this.state.termsError ? MainStyles.mainInputErrorMessage : null]}>{t('darkTheme')}</Text>
                </View>

                <Picker
                    style={colorTheme.mainTextColor}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIndex) => this.setState({ language: itemValue })}>
                    <Picker.Item label="Español" value="es" />
                    <Picker.Item label="English" value="en" />
                </Picker>

                <MainButton
                    title={t('apply')}
                    onPress={() => this.applySettings()}
                    colorTheme={colorTheme}
                />

                <View style={{ height: 20 }} />

                <MainButton
                    onPress={() => this.requestLogout(exit)}
                    title="Logout"
                    colorTheme={colorTheme} />
            </View>
        );
    };

    render() {
        let { locale, exit, t, colorTheme, darkThemeOn } = this.props.screenProps;
        return (
            <View style={[MainStyles.mainContainer, colorTheme.secondaryBackground]}>
                <MenuDrawer
                    open={this.state.open}
                    drawerContent={this.drawerContent(locale, exit, t, colorTheme, darkThemeOn)}
                    drawerPercentage={100}
                    animationTime={250}
                    overlay={true}
                    opacity={1}
                >
                    <ScrollView style={colorTheme.secondaryBackground}>
                        <View style={[MainStyles.animatedHeaderContainer, { height: 320 }]}>
                            <LinearGradient
                                start={{ x: 0, y: 0.75 }} end={{ x: 0.50, y: 0.75 }}
                                colors={['#045379', '#1782ac']}
                                style={{ position: 'absolute', height: 360, width: '100%', justifyContent: 'flex-start' }}
                            />
                            <IconButton
                                style={MainStyles.topRightSetings}
                                name={"md-settings"}
                                color={'#ffffff'}
                                size={28}
                                onPress={() => this.toggleOpen(locale)} />

                            <View style={MainStyles.mainTitleRow}>
                                <View style={MainStyles.imageColumn}>
                                    <UploadPicture
                                        titlePicture='default image'
                                        image={null}
                                        handlerImage={this.handlerImage}
                                        colorTheme={colorTheme}
                                    />
                                </View>
                                <View
                                    style={MainStyles.textColumn}
                                >
                                    <View
                                        style={{ flexDirection: 'row' }}
                                    >
                                        <Text style={MainStyles.mainNameCaretaker}> Lolo Patel</Text>{/* Esto va dinamico*/}
                                        <IconButton
                                            style={{ marginLeft: 20 }}
                                            name={"ios-create"}
                                            color={'#ffffff'}
                                            size={28}
                                        />
                                    </View>
                                    <View
                                        style={MainStyles.descriptionContainer}
                                    >
                                        <Text
                                            style={MainStyles.descriptionText}
                                        >
                                            Soy experto cuidando gatos, tambien
                                            perros tengo conocimientos en
                                            cuidado animal.{/* Esto va dinamico*/}
                                        </Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={[MainStyles.descriptionColumn, { marginLeft: 20 }]}>
                                    <Text
                                        style={MainStyles.subtextDescription}>
                                        {t('contact')}:</Text>
                                    <View
                                        style={MainStyles.descriptionRow}>
                                        <IconButton
                                            name={"logo-whatsapp"}
                                            color={'#ffffff'}
                                            size={28}
                                        />
                                        <Text
                                            style={MainStyles.decriptionInfo}>
                                            +(506)888888</Text>{/* Esto va dinamico*/}
                                    </View>
                                </View>
                                <View style={MainStyles.descriptionColumn}>
                                    <Text
                                        style={MainStyles.subtextDescription}>
                                        {t('location')}:</Text>
                                    <View style={MainStyles.descriptionRow}>
                                        <IconButton
                                            name={"ios-pin"}
                                            color={'#ffffff'}
                                            size={28}
                                        />
                                        <Text style={MainStyles.decriptionInfo}>Tres Marías, Esparza</Text>{/* Esto va dinamico*/}
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", paddingTop: 50 }}>
                            <Text style={[MainStyles.mainNameCaretaker, { marginLeft: 20 }, colorTheme.mainTextColor]}>{t('myHouses')}</Text>
                        </View>
                        <CaretakerContainer
                            screenProps={this.props.screenProps} />
                    </ScrollView>
                </MenuDrawer>
            </View>
        );
    };
}