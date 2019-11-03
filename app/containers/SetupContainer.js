import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Image, ScrollView} from 'react-native';
import MainStyles from '../styles/MainStyles';


export default class SetupContainer extends React.Component {
render() {
    return (
  
            <ImageBackground
              source={require('../../assets/setup_background.png')}
              resizeMode='cover'
              style={MainStyles.setupMainImage}>
                <ScrollView 
                 behaviour = "height"
                 keyboardVerticalOffset = {64}
                >
                <View 
                 style= {{height:800}}>
                     <Image style={MainStyles.secondaryLogo} resizeMode='contain' source={require('../../assets/logo_white.png')}/>
                      <Text style={MainStyles.whiteText}>¿Qué tipo de perfil deseás crear?</Text>
                      <TouchableOpacity 
                       style={MainStyles.setupContainer}>
                            <View style={MainStyles.setupCardImg}>
                                <Image 
                                source={require('../../assets/people.png')}
                                style={{height:'165%'}}
                                resizeMode='contain' />
                              </View>      
                            <View style={MainStyles.textContainer}>    
                                  <Text style={[MainStyles.mainTitle, MainStyles.paddinText]}>Cliente</Text>
                                  <Text style={[MainStyles.mainText, MainStyles.paddinText]}>Registra tus mascotas para el cuidado animal y consigue clientes</Text>
                            </View>
                      </TouchableOpacity>
                      <TouchableOpacity 
                       style={MainStyles.setupContainer}
                       onPress={() => this.props.changeModule(2)}>
                            <View style={MainStyles.setupCardImg}>
                                <Image 
                                source={require('../../assets/cuidador.png')}
                                style={{height:'165%'}}
                                resizeMode='contain' />
                              </View>      
                            <View>    
                                  <Text style={[MainStyles.mainTitle, MainStyles.paddinText]}>Cuidador</Text>
                                  <Text style={[MainStyles.mainText, MainStyles.paddinText]}>Registra tus mascotas para el cuidado animal y consigue clientes</Text>
                            </View>
                      </TouchableOpacity>
                      <Text style={MainStyles.whiteText} >1/3</Text>
                  </View>
                  </ScrollView>
                      
              </ImageBackground>
              
     
            
        
        
      

    );
};
}