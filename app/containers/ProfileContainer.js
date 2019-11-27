import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';
import PetProfileCard from '../components/PetProfileCard';

export default class AddPetContainer extends React.Component {

  render() {
    const petList = this.props.pets.map((data) => {
      let image = { uri: data.image };
      return (
        <PetProfileCard key={data.id} name={data.name}
          image={image}
        />
      )
    });

    return (
      <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
        <Text style={[MainStyles.subnames, MainStyles.blue]}>Descripción</Text>
        <View style={MainStyles.containerProfile}>
          <Text style={MainStyles.mainText}>{this.props.description}</Text>
        </View>
        <Text style={[MainStyles.subnames, MainStyles.green]}>Mis Mascotas</Text>
        {this.props.pets != null ?
          <View style={{
            width: '100%', alignItems: 'flex-start', flexDirection: 'row', flexWrap: 'wrap',
            marginBottom: 10
          }}>
            {petList}
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
               fontSize: 40, color: '#FFFFFF' }]}>
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
                Añade nueva mascota
          </Text>
            </TouchableOpacity>
          </View>
        }
        <Text style={[MainStyles.subnames, MainStyles.teal]}>
          Mis casas cuido recientes
        </Text>
        {this.props.houses != null ? null :

          <View style={MainStyles.containerProfile}>
            <Text style={MainStyles.mainText}>
              No tenés ninguna casa cuido reciente
          </Text>
            <TouchableOpacity
              onPress={() => this.props.goFeed()}>
              <Text style={[MainStyles.blue, MainStyles.mainText]}>
                Comienza ahora
            </Text>
            </TouchableOpacity>
          </View>
        }

      </View>

    );
  };
}