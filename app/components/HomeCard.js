import React, { Component } from "react";
import { 
    View,
    Text,
    Image
} from "react-native";

class HomeCard extends Component {
    render() {
        return (
            <View
                                style={{width:'90%', height:400, marginTop:30,
                                borderRadius:15,backgroundColor:'white'}}>
                                {/** Section de informacion personal */}
                                <View style={{flexDirection:'row', marginStart:15, marginTop:15}}>
                                    <Image source={require('../../assets/dogProfile.png')} 
                                    style={{height:60, width:60, borderRadius:20}} />
                                    <View style={{flexDirection:'column', alignSelf:'center',marginStart:10}}>
                                        <Text style={{fontSize:16, fontWeight:'600'}}>Lil. D</Text>
                                        <Text style={{fontSize:14, fontWeight:'400'}}>Macacona, Esparza</Text>
                                    </View>

                                </View>
                                {/** Section de descripcion */}
                                <View style={{width:'90%', alignSelf:'center', marginTop:15}}>
                                    <Text style={{fontSize: 16, fontWeight: '300'}}>Hola mi hogar es un hogar de dios con creencias
                                        judeocristianas
                                    </Text>

                                </View>
                                 {/** Section de imagen Card */}
                                 <View style={{flexDirection:'row',width:'95%',  alignSelf:'center', 
                                marginTop:10, flexWrap:'wrap'}}>
                                     <Image source={require('../../assets/fondo_login.png')}
                                     resizeMode='contain'
                                     style={{flex:1, borderRadius:10}}/>
                                     
                                     
                                     <View style={{flexDirection:'column',  flexWrap:'nowrap',
                                     width:'35%', alignItems:'flex-start'}}>
                                     <Image source={require('../../assets/fondo_login.png')}
                                     resizeMode='contain'
                                     style={{height: 95,width:'90%', borderRadius:10, marginBottom:5}}/>
                                     <Image source={require('../../assets/fondo_login.png')}
                                     resizeMode='contain'
                                     style={{height: 95,width:'90%', borderRadius:10}}/>

                                     </View>
                                     
                                     

                                 </View>
                                 {/** Section de precio y extrella */}
                                 <View style={{flexDirection: 'row', marginHorizontal:20, marginTop:10}}>
                                     <Text style={{fontWeight:'600', fontSize:18, alignSelf:'flex-start'}}>₡ 8000/ por noche</Text>
                                     
                                  
                                     
                                 </View>
                                    

                                </View>
        );
    }
}
export default HomeCard;
