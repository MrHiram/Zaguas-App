import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MainStyles from '../styles/MainStyles';
import Validator from '../services/Validator';
import Fetcher from '../services/Fetcher';
export default class AddPetContainer extends React.Component {

  state = {
    name: '',
    description: '',
    waiting: false
  }

  handleValue = (key, value) => {
    switch (key) {
      case 'name':
        this.setState({
          name: value
        });
        return;
      case 'description':
        this.setState({
          description: value
        });
        return;
    }
  }
  createPet = async () => {
    let validName = Validator.blankSpace(this.state.name);
    let validDescription = Validator.blankSpace(this.state.description);

    if (validName && validDescription &&
      validImage) {
      let data = new FormData();
      data.append("name", this.state.name)
      this.state.description ? data.append("description", this.state.description) : null
      this.setState({ waiting: true });
      Fetcher.postToken('editinfo', data, this.state.token)
        .then(
          (response) => {
            console.log(response.data);

          }
        )
        .catch(
          (error) => { console.log(error.error) }
        );
    } else {
      //cambiar los success por los que verdaderos
      if (!validName)
        this.setState({ nameError: 'Espacio Requerido', addressSuccess: false })
      else
        this.setState({ nameError: '', addressSuccess: true });
      if (!validDescription)
        this.setState({ raceError: 'Espacio Requerido', phoneSuccess: false });
      else
        this.setState({ raceError: '', phoneSuccess: true });
    }
  }


  render() {

    return (


      <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
        <Text style={[MainStyles.subnames, MainStyles.blue]}>Descripción</Text>
        <View style={MainStyles.containerProfile}>
          <Text style={MainStyles.mainText}>Soy una persona temperamental como mi mascosta</Text>
        </View>
        <Text style={[MainStyles.subnames, MainStyles.green]}>Mis Mascotas</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={MainStyles.containerProfile}>
            <Text>
              Añade nueva mascota
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[MainStyles.subnames, MainStyles.teal]}>
          Mis casas cuido recientes
        </Text>
        <View style={MainStyles.containerProfile}>
          <Text style={MainStyles.mainText}>
            No tenés ninguna casa cuido reciente
          </Text>
          <TouchableOpacity>
            <Text style={[MainStyles.blue, MainStyles.mainText]}>
              Comienza ahora
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  };
}