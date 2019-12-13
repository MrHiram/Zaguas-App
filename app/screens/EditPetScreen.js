import React from 'react';
import { View, Text } from 'react-native';
import MainStyles from '../styles/MainStyles';
import EditPetContainer from '../containers/EditPetContainer';
import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import LocalStorage from '../services/LocalStorage';
import Fetcher from '../services/Fetcher';

export default class EditPetScreen extends React.Component {
    state = {
        language: 'es',
        token: '',
        image: null,
        loading: true,
        profileInfo: null
    };
    
    componentDidMount(){
        this.setState({profileInfo: this.props.profileInfo})
    }

    render() {
        let { colorTheme } = this.props.screenProps;
        return (
            <View style={[{ flex: 1 }, colorTheme.mainBackground]}>
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    extraHeight={300}
                >
                    <View
                        style={[
                            MainStyles.animatedHeaderContainer,
                            { position: 'absolute' }
                        ]}
                    >
                        <LinearGradient
                            start={{ x: 0, y: 0.75 }}
                            end={{ x: 0.5, y: 0.75 }}
                            colors={['#045379', '#1782ac']}
                            style={{
                                position: 'absolute',
                                height: 520,
                                width: '100%'
                            }}
                        />
                    </View>
                    <EditPetContainer
                        screenProps={this.props.screenProps}
                        profileInfo={this.props.profileInfo}
                    />
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
