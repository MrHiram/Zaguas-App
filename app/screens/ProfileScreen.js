import React from 'react';
import { View, Text, Switch, Picker } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UploadPicture from '../components/UploadPicture';
import MenuDrawer from 'react-native-side-drawer'
import { ScrollView } from 'react-native-gesture-handler';

import ProfileContainer from '../containers/ProfileContainer';
import IconButton from '../components/IconButton';
import MainButton from '../components/MainButton';

import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';

import MainStyles from '../styles/MainStyles';

export default class ProfileScreen extends React.Component {
  state = {
    token: '',
    open: false,
    darkThemeSwitch: false,
    caretakerProfileSwitch: false,
    language: 'en'
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

  toggleCaretaker = () => this.setState({caretakerProfileSwitch: !this.state.caretakerProfileSwitch});

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

  drawerContent = (locale, exit, t, colorTheme, darkThemeOn ) => {
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
          im
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
    let { t, locale, exit, colorTheme, darkThemeOn } = this.props.screenProps;
    return (
      <View style={[MainStyles.mainContainer, colorTheme.secondaryBackground]}>
        <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent(locale, exit, t, colorTheme, darkThemeOn )}
          drawerPercentage={100}
          animationTime={250}
          overlay={true}
          opacity={1}
        >
          <ScrollView>
            <View style={[MainStyles.animatedHeaderContainer, { height: 300 }]}>
              <LinearGradient
                start={{ x: 0, y: 0.75 }} end={{ x: 0.50, y: 0.75 }}
                colors={['#045379', '#1782ac']}
                style={{ position: 'absolute', height: 500, width: '100%' }}
              />
              <IconButton
                onPress={() => this.toggleOpen()}
                style={MainStyles.topRightSetings}
                name={"md-settings"}
                color={darkThemeOn ? '#222' : '#fff'}
                size={28} />
              <View style={{ height: 500, paddingTop: 130 }}>
                <UploadPicture
                  titlePicture='asdfasdfasd'
                  image={this.state.image}
                  error={this.state.imageError}
                  handlerImage={this.handlerImage}
                  colorTheme={colorTheme}
                />
                <Text style={[MainStyles.mainName, colorTheme.btnTextColor]} >
                  Lolo Patel
              </Text>
              </View>
            </View>
            <ProfileContainer
              t={t}
              colorTheme={colorTheme} />
          </ScrollView>
        </MenuDrawer>
      </View>
    );
  };
}