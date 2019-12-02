import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import UploadPicture from '../components/UploadPicture';
import MenuDrawer from 'react-native-side-drawer'
import { ScrollView } from 'react-native-gesture-handler';
import { StackActions, NavigationActions } from 'react-navigation';

import ProfileContainer from '../containers/ProfileContainer';
import IconButton from '../components/IconButton';
import MainButton from '../components/MainButton';

import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';

import MainStyles from '../styles/MainStyles';


const resetAction = StackActions.reset({
  index: 1,
  actions: [
    NavigationActions.back(),
  ],
});

export default class ProfileScreen extends React.Component {
  state = {
    token: '',
    open: false
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

  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  requestLogout = () => {
    Fetcher.postToken('logout', this.state.token);
    LocalStorage.removeToken();
    this.props.navigation.navigate({ routeName: 'Auth' });
  }

  drawerContent = () => {
    return (
      <View onPress={this.toggleOpen} style={MainStyles.animatedBox}>
        <IconButton
          onPress={() => this.toggleOpen()}
          style={MainStyles.topLeftSetings}
          name={"md-arrow-back"}
          color={'#000'}
          size={28} />
        <MainButton
          onPress={() => this.requestLogout()}
          title="Logout" />
      </View>
    );
  };

  render() {

    return (
      <View style={{ flex: 1, backgroundColor: "#000", }}>
        <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent()}
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
                color={'#ffffff'}
                size={28} />
              <View style={{ height: 500, paddingTop: 130 }}>
                <UploadPicture
                  titlePicture='asdfasdfasd'
                  image={this.state.image}
                  error={this.state.imageError}
                  handlerImage={this.handlerImage}
                />
                <Text style={MainStyles.mainName} >
                  Lolo Patel
              </Text>
              </View>
            </View>
            <ProfileContainer />
          </ScrollView>
        </MenuDrawer>
      </View>
    );
  };
}