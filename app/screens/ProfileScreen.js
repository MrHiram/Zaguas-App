import React from 'react';
import { View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import UploadPicture from '../components/UploadPicture';


import ProfileContainer from '../containers/ProfileContainer';

import MainStyles from '../styles/MainStyles';
import IconButton from '../components/IconButton';


export default class ProfileScreen extends React.Component {
  state = {
  }

  handleSettings = () => {
    console.log('sadf');
    this.props.navigation.push('Settings');
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          resetScrollToCoords={{ x: 0, y: 0 }}
          extraHeight={300}>

          <View style={[MainStyles.animatedHeaderContainer, { height: 300 }]}>
            <LinearGradient
              start={{ x: 0, y: 0.75 }} end={{ x: 0.50, y: 0.75 }}
              colors={['#045379', '#1782ac']}
              style={{ position: 'absolute', height: 500, width: '100%' }}
            />
            <IconButton
              onPress={() => this.handleSettings()}
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
        </KeyboardAwareScrollView>
      </View>
    );
  };
}