import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

import EditHomeCaretakerContainer from '../containers/EditHomeCaretakerContainer';
import CaretakerContainer from '../containers/CaretakerContainer';
import IconButton from '../components/IconButton';

import MainStyles from '../styles/MainStyles';
import UploadPicture from '../components/UploadPicture';


export default class CaretakerScreen extends React.Component {
    state = {
        name: '',
        descriptionName: '',
        image: null,
        contact: '',
        location: '',
    }
    handleValue = (key, value) => {
        switch (key) {
            case 'name':
                this.setState({
                    name: value
                });
                return;
            case 'descriptionName':
                this.setState({
                    descriptionName: value
                });
                return;
            case 'contact':
                this.setState({
                    contact: value
                });
                return;
            case 'location':
                this.setState({
                    location: value
                });
                return;
        }
    }
    render() {
        let { t, colorTheme } = this.props.screenProps;
        return (
            <View>
                <ScrollView style={{ backgroundColor: "#f3f3f3" }}>
                        <View style={[MainStyles.animatedHeaderContainer, { height: 320 }]}>
                            <LinearGradient
                                start={{ x: 0, y: 0.75 }} end={{ x: 0.50, y: 0.75 }}
                                colors={['#045379', '#1782ac']}
                                style={{ position: 'absolute', height: 360, width: '100%', justifyContent: 'flex-start' }}
                            />
                            <IconButton
                                style={MainStyles.topRightSetings}
                                name={"md-settings"}
                                color={'#ffffff'}
                                size={28} />
                            <View style={MainStyles.mainTitleRow}>
                                <View style={MainStyles.imageColumn}>
                                    <UploadPicture
                                        titlePicture='default image'
                                        image={null}
                                        handlerImage={this.handlerImage}
                                        colorTheme={colorTheme}
                                    />
                                </View>
                                <View
                                    style={MainStyles.textColumn}
                                >
                                    <View
                                        style={{ flexDirection: 'row' }}
                                    >
                                        <Text style={MainStyles.mainNameCaretaker}> Lolo Patel</Text>
                                        <IconButton
                                            style={{ marginLeft: 20 }}
                                            name={"ios-create"}
                                            color={'#ffffff'}
                                            size={28}
                                        />
                                    </View>
                                    <View
                                        style={MainStyles.descriptionContainer}
                                    >
                                        <Text
                                            style={MainStyles.descriptionText}
                                        >
                                            Soy experto cuidando gatos, tambien
                                            perros tengo conocimientos en
                                            cuidado animal.
                                </Text>
                                    </View>
                                </View>

                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <View style={[MainStyles.descriptionColumn, { marginLeft: 20 }]}>
                                    <Text
                                        style={MainStyles.subtextDescription}>
                                        Contacto:</Text>
                                    <View
                                        style={MainStyles.descriptionRow}>
                                        <IconButton
                                            name={"logo-whatsapp"}
                                            color={'#ffffff'}
                                            size={28}
                                        />
                                        <Text
                                            style={MainStyles.decriptionInfo}>
                                            +(506)888888</Text>
                                    </View>
                                </View>
                                <View style={MainStyles.descriptionColumn}>
                                    <Text
                                        style={MainStyles.subtextDescription}>
                                        Ubicación:</Text>
                                    <View style={MainStyles.descriptionRow}>
                                        <IconButton
                                            name={"ios-pin"}
                                            color={'#ffffff'}
                                            size={28}
                                        />
                                        <Text style={MainStyles.decriptionInfo}>Tres Marías, Esparza</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    <View style={{flexDirection:"row", paddingTop:50}}>
                    <Text style={[MainStyles.mainNameCaretaker, { color: '#000', marginLeft:20 }]}>Mis casas</Text>
                    </View>
                    <CaretakerContainer/>
                </ScrollView>
            </View>
        );
    };
}