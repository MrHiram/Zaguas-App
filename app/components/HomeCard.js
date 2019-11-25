import React, { Component } from "react";
import {
    View,
    Text,
    Image
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

class HomeCard extends Component {
    render() {
        return (
            <View
                style={{
                    width: '90%', height: 400, marginTop: 30,
                    borderRadius: 15, backgroundColor: 'white'
                }}>
                {/** Section de informacion personal */}
                <View style={{ flexDirection: 'row', marginStart: 15, marginTop: 15 }}>
                    <Image source={require('../../assets/dogProfile.png')}
                        style={{ height: 60, width: 60, borderRadius: 20 }} />
                    <View style={{ flexDirection: 'column', alignSelf: 'center', marginStart: 10 }}>
                        <Text style={{ fontSize: 16, fontWeight: '600' }}>Lil. D</Text>
                        <Text style={{ fontSize: 14, fontWeight: '400' }}>Macacona, Esparza</Text>
                    </View>

                </View>
                {/** Section de descripcion */}
                <View style={{ width: '90%', alignSelf: 'center', marginTop: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '300' }}>Hola mi hogar es un hogar de dios con creencias
                        judeocristianas
                                    </Text>

                </View>
                {/** Section de imagen Card */}
                <View style={{
                    flexDirection: 'row', flex:2 ,
                    marginTop: 10, flexWrap: 'wrap', marginHorizontal:10
                }}>
                    <Image source={require('../../assets/fondo_login.png')}
                        
                        style={{borderRadius: 10, width:'55%', height:'100%' }} />

                        <View
                        style={{flexDirection:'column', flexWrap:'nowrap', flex:1, marginLeft:5,
                        justifyContent:'space-between' }}>
                        <Image source={require('../../assets/fondo_login.png')}
                        
                        style={{borderRadius: 10, width:'100%', height:'49%'}} />
                        <Image source={require('../../assets/splash.png')}
                        
                        style={{borderRadius: 10, width:'100%', height:'49%' }} />
                        </View>
                        

                </View>
                {/** Section de precio y extrella */}
                <View style={{ flexDirection: 'row',width:'90%', borderWidth:1, marginHorizontal: 20, marginTop: 10, marginBottom:10 }}>
                    <Text style={{ fontWeight: '600', fontSize: 14, textAlign: 'left' }}>₡ 8000/ por noche</Text>
                    {/**Componente de extrella */}
                    <View style={{alignContent:'flex-end'}}>
                    <Icon name="ios-search" size={20}
                                 />
                    </View>



                </View>


            </View>
        );
    }
}
export default HomeCard;
