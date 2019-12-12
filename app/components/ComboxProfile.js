import React from 'react';
import MainStyles from '../styles/MainStyles';
import { Text, View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

export default class ComboboxProfile extends React.Component {
    render() {
        return (
            <View style={{ marginBottom: 20 }}>
                <Dropdown
                    baseColor={'rgb(0, 126, 168)'}
                    fontSize={20}
                    labelFontSize={20}
                    style={[MainStyles.comboText, this.props.colorTheme.mainTextColor]}
                    label={this.props.title}
                    data={this.props.data}
                    valueExtractor={({ value }) => value}
                    onChangeText={value => {
                        this.props.onChangeText(value);
                    }}
                />
                <Text style={MainStyles.mainInputErrorMessage}>
                    {this.props.error}
                </Text>
            </View>
        );
    }
}
