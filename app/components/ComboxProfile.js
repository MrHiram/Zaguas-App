import React from 'react';
import MainStyles from '../styles/MainStyles';
import { Text , View} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class ComboboxProfile extends React.Component{
    render(){
        return(
            <View style={{marginBottom:20}}>
            <Dropdown
                baseColor={'rgb(0, 126, 168)'}
                fontSize={20}
                labelFontSize={20}
                  style={MainStyles.comboText}
                  label={this.props.title}
                  data={this.props.data}
                />
            </View> 
        );
    };
}