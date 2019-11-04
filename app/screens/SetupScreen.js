import React from 'react';
import { Text, View } from 'react-native';
import MainStyles from '../styles/MainStyles';
import SetupContainer from '../containers/SetupContainer';
import CreateClientProfile from '../containers/CreateClientProfile';
import CreateCareTakerProfile from '../containers/CreateCareTakerProfile';
export default class SetupScreen extends React.Component{
    state = {
        accessToken: '',
        activeModule: 1,
        displayEmail: ''
    }
    toggleModules = (moduleNumber) => {
        this.setState({
            activeModule: moduleNumber
        });
    }
    render(){
        return(
            <View  style={MainStyles.containerCenter} >
            {this.state.activeModule == 1 ? <SetupContainer  changeModule={this.toggleModules} /> : null}
            {this.state.activeModule == 2 ? <CreateCareTakerProfile  changeModule={this.toggleModules} /> : null}
            {this.state.activeModule == 3 ? <CreateClientProfile  changeModule={this.toggleModules} /> : null}
             
            </View>
        );
    };
}