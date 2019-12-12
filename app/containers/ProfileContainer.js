import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';
import PetProfileCard from '../components/PetProfileCard';

export default class AddPetContainer extends React.Component {

  render() {
    let { t, colorTheme} = this.props;
    let petList = null;
    if(this.props.pets !=null){
       petList = this.props.pets.map((data) => {
        let image = { uri: data.image };
        
        return (
          <PetProfileCard key={data.id} name={data.name}
            image={image}
          />
        )
      });
    }
    

    return (
      <View style={[MainStyles.mainCard, MainStyles.profileCard,colorTheme.secondaryBackground]}>
        <Text style={[MainStyles.subnames, MainStyles.blue]}>{t('description')}</Text>
        <View style={MainStyles.containerProfile}>
          <Text style={MainStyles.mainText}>{this.props.description}</Text>
        </View>
    <Text style={[MainStyles.subnames, MainStyles.green]}>{t('myPets')}</Text>
        {this.props.pets != null ?
          <View style={{
            width: '100%', alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap',
            marginBottom: 10
          }}>
            {petList ? petList : null}
            {/**Ejemplo para card de agregar */}
            <View
              style={{
                width: '45%', height: 200, marginRight: 10,
                marginTop: 10,
                opacity: 0.9,
                  backgroundColor: '#045379',
                  borderRadius: 10
              }}>
              <TouchableOpacity
                style={{
                  width:'100%',
                  height:'100%',
                  
                }}
                onPress={() => this.props.goAddPet()}>
                  <Text style={[{ alignSelf:'center',
               fontSize: 80, color: '#FFFFFF', marginTop:48,fontWeight:'100' }]}>
                +
              </Text>

              </TouchableOpacity>
              
              </View>
            </View>
          :
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={MainStyles.containerProfile}
              onPress={() => this.props.goAddPet()}>
              <Text>
              {t('addNewPetMSG')}
          </Text>
            </TouchableOpacity>
          </View>
        }

     

      </View>

    );
  };
}