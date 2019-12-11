import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import UploadPicture from '../components/UploadPicture';
import ProfileContainer from '../containers/ProfileContainer';
import MainStyles from '../styles/MainStyles';
import IconButton from '../components/IconButton';
import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';

export default class ProfileScreen extends React.Component {
  state = {
    profileInfo: [],
    loading: true,
    image:null,
    
  }
  goAddPet = () => {
    console.log('sadf');
    this.props.navigation.push('AddPet');
  }
  handleSettings = () => {
    console.log('sadf');
    this.props.navigation.push('SideNav');
  }

  goFeed = () =>{
    this.props.navigation.navigate('Feed')
  }
  async componentDidMount() {
    const user = {
      id: "",
      name: ""
    };
    let token = await LocalStorage.retrieveToken();
    await Fetcher.getUser(token).then((response) => {
      user.id = response.data.id;
      user.name = response.data.name;
    });
    await Fetcher.getToken("getProfileClient/" + user.id, token)
      .then((response) => {
        this.setState({
          profileInfo: response.data,
          image: {uri:response.data.profile.image},
          loading:false,
        });
        console.log(this.state.image);


      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {

    return (
      <>
        {this.state.loading ? <ActivityIndicator size="large" color="#007EA9"
        style={MainStyles.loading} /> :
          <View style={{ flex: 1 }}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              resetScrollToCoords={{ x: 0, y: 0 }}
              extraHeight={300}>

              <View style={ { height: 300 }}>
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
                <View style={{ height: 450, paddingTop: 25 }}>
                  <UploadPicture
                    image={this.state.image}
                    error={this.state.imageError}
                    handlerImage={this.handlerImage}
                  />
                  <Text style={MainStyles.mainName}>
                    {this.state.profileInfo.user.name}
                  </Text>
                  
                </View>
              </View>
              <ProfileContainer description={this.state.profileInfo.profile.about}
                goAddPet={this.goAddPet}
                goFeed={this.goFeed} 
                imagePet={this.state.image}
                pets={this.state.profileInfo.pets}
                />
            </KeyboardAwareScrollView>
          </View>}

      </>

    );
  };
}