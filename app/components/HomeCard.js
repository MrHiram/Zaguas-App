import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

class HomeCard extends Component {
    render() {
        return (
            
            <View
                style={{
                    width: '90%', height: 400, marginTop: 30,
                    borderRadius: 15, backgroundColor: 'white',
                    padding: 10
                }}>
                    <TouchableOpacity >
                {/** Section de informacion personal */}
                <View style={{ flexDirection: 'row', marginStart: 15, marginTop: 15 }}>
                    <Image source={{uri:this.props.imageCareTaker.uri}}
                        style={{ height: 60, width: 60, borderRadius: 20 }} />
                    <View style={{ flexDirection: 'column', alignSelf: 'center', marginStart: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>{this.props.userName}</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400' }}>{this.props.location}</Text>
                    </View>

                </View>
                {/** Section de descripcion */}
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '300' }}>{this.props.description}
                                    </Text>

                </View>
                {/** Section de imagen Card */}
                <View style={{
                    flexDirection: 'row', flex:2 ,
                    marginTop: 10, flexWrap: 'wrap', marginHorizontal:10
                }}>
                    <Image source={{uri:this.props.image}}
                        
                        style={{borderRadius: 10, width:'100%', height:'100%' }} />

                        
                </View>
                {/** Section de precio y extrella */}
                <View style={{ flexDirection: 'row', marginHorizontal: 20, marginTop: 10, marginBottom:10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 14, textAlign: 'left', width: '100%' }}>
                        ₡ {this.props.price}/ {this.props.t('perNight')}
                    </Text>
                </View>
                </TouchableOpacity>
            </View>
            
        );
    }
}
export default HomeCard;
