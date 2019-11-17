import React from 'react';
import { Text, View } from 'react-native';
import { TabRouter } from 'react-navigation';

import TouchableText from '../components/TouchableText';

import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';

import MainStyles from '../styles/MainStyles';

/*const MainRouter = TabRouter({

    
    },{
        initialRouteName: ''
    });*/

export default class HomeScreen extends React.Component{
    state = { 
        token: ''
    }

    componentDidMount(){
        this.init();
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
            <View style={MainStyles.containerCenter} >
                <Text>HomeScreen {this.state.token}</Text>
               
                <TouchableText
                    style={MainStyles.spacer}
                    alignCenter={true}
                    innerText= "Vamo'a salí"
                    onPress={() => { this.requestLogout() }} />
            </View>
        );
    };
}