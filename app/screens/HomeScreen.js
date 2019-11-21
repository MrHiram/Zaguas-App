import React from 'react';

import { Text, View, SafeAreaView, ScrollView, Dimensions,Platform, TextInput, Image } from 'react-native';

import TouchableText from '../components/TouchableText';

import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';
import HomeCard from '../components/HomeCard';
import MainStyles from '../styles/MainStyles';

import Icon from 'react-native-vector-icons/Ionicons';
const { height, width } = Dimensions.get('window');
export default class HomeScreen extends React.Component{
    state = { 
        token: ''
    }

    componentDidMount(){
        this.init();
        this.startHeaderHeight = 80
        if(Platform.OS == 'android'){
            this.startHeaderHeight = 140 ;
        }
    }
    
    init = async () => {
        let token = await LocalStorage.retrieveToken();
        this.setState({
            token: token
        });
    }

    requestLogout = () => {
        var data= {
            request:'Logout user'
        }
        Fetcher.postToken('logout',data, this.state.token);
        LocalStorage.removeToken();        
        this.props.navigation.navigate('Auth');
    }

    render(){
        return(
            
            <SafeAreaView style={{flex:1}}>
                <View style={{
                        height: this.startHeaderHeight, backgroundColor: 'white',
                        borderBottomWidth: 1, borderBottomColor: '#dddddd'
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            padding: 10,
                            backgroundColor: 'white',
                            marginHorizontal: 20,
                            marginTop: Platform.OS == 'android' ? 30 : null,
                            shadowOffset: { width: 0, height: 0 },
                            shadowColor: 'black',
                            shadowOpacity: 0.2,
                            elevation: 1,
                            borderRadius: 20,

                        }}>
                            <Icon name="ios-search" size={20}
                                style={{ marginRight: 10,marginTop:5 }} />
                            <TextInput
                                placeholder="Buscar"
                                placeholderTextColor="grey"
                                style={{
                                    flex: 1, fontWeight: '700'
                                    , backgroundColor: 'white'
                                }} />
                        </View>
                        <View style={{height:20}}>
                        <Text
                        style={{fontSize: 24, textAlign:'left', fontWeight:'bold', marginStart:20,
                    marginTop:15}}
                        >Hogares Nuevos</Text>
                    </View>
                    </View>
                    <View style={{backgroundColor:'#f3f3f3', flex:1}}>
                        <ScrollView
                        contentContainerStyle={{alignItems:'center'}}>
                                <HomeCard/>
                                <HomeCard/>
                                <HomeCard/>
                        </ScrollView>

                    </View>


            </SafeAreaView>
        );
    };
}