import React from 'react';
import { Text, View,Image, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';
import InputMT from '../components/InputMT';
import Combobox from '../components/ComboxProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class AddPetContainer extends React.Component{
    render(){
        let data1 = [{
            value: 'Tranquilo',
          }, {
            value: 'Docil',
          }, {
            value: 'Amigable',
        }, {
            value: 'Agresivo',
          }];
          
        return(

                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    style={MainStyles.scrollView}
                    extraHeight={300}>
                    <View  style={[MainStyles.mainCard, MainStyles.profileCard]}>
                    <TouchableOpacity style={{height: 150}}>
                    <Image
                    source={require('../../assets/dogProfile.png')}
                    resizeMode='contain'
                    style={{height:'90%', width:'90%', alignSelf: 'center'}}
                    ></Image>
                    <Text
                    style={MainStyles.profilePictureText}
                    >foto de perfil</Text>
                    </TouchableOpacity>
                    <InputMT
                    title='Nombre'
                    placeholder='Ingrese el nombre de su mascota'
                    handler='nombre'
                    />
                    <InputMT
                    title='Tamaño'
                    placeholder='Ingrese el tamaño de su mascota'
                    handler='tamano'
                    />
                    <Combobox
                    title='Temperamento'
                    data= {data1}
                    ></Combobox>
                    <InputMT
                    title='Raza'
                    placeholder='Ingrese la raza de su mascota'
                    handler='raza'
                    />
                    <InputMT
                    title='Descripcion'
                    placeholder='Ingrese una pequeña descripción de su mascota'
                    handler='descripcion'
                    />
                    
                

                    </View>
                
            </KeyboardAwareScrollView>
        );
    };
}