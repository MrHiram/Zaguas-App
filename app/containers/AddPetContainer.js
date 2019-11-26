import React from 'react';
import { View } from 'react-native';
import MainStyles from '../styles/MainStyles';
import InputMT from '../components/InputMT';
import Combobox from '../components/ComboxProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UploadPicture from '../components/UploadPicture';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Validator from '../services/Validator';
import Fetcher from '../services/Fetcher';
import MainButton from '../components/MainButton';
import LocalStorage from '../services/LocalStorage';
export default class AddPetContainer extends React.Component {

  state = {
    image: null,
    name: '',
    size: '',
    temperament: '',
    race: '',
    description: '',
    feeding: '',
    allergies: '',
    special_cares: '',
    imageError: '',
    token: '',
    imageError: '',
    nameError: '',
    sizeError: '',
    temperamentError: '',
    raceError: '',
    descriptionError: '',
    feedingError: '',
    allergiesError: '',
    special_caresError: '',
    waiting: false
  }
  componentDidMount() {
    this.init();
  }

 
  init = async () => {
    let token = await LocalStorage.retrieveToken();
    this.setState({
      token: token
    });
  }
  onChangeTextPress = (value) => {
    this.setState({ temperament: value });

  }

  handlerImage = async () => {
    const { status, permissions } = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (status === 'granted') {
      options = {
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
      }
      let result = await ImagePicker.launchImageLibraryAsync(options);
      //let result = await ImagePicker.launchCameraAsync(options);
      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result });
      }
    } else {
      alert('Hey! You heve not enabled selected permissions');
    }

  }

  handleValue = (key, value) => {
    switch (key) {
      case 'name':
        this.setState({
          name: value
        });
        return;
      case 'race':
        this.setState({
          race: value
        });
        return;
      case 'size':
        this.setState({
          size: value
        });
        return;
      case 'description':
        this.setState({
          description: value
        });
        return;
      case 'feeding':
        this.setState({
          feeding: value
        });
        return;
      case 'allergies':
        this.setState({
          allergies: value
        });
        return;
      case 'special_cares':
        this.setState({
          special_cares: value
        });
        return;
    }
  }
  createPet = async () => {
    let validName = Validator.blankSpace(this.state.name);
    let validRace = Validator.blankSpace(this.state.race);
    let validSize = Validator.blankSpace(this.state.size);
    let validTemperament = Validator.blankSpace(this.state.temperament);
    let validImage = this.state.image === null ? false : true;

    if (validName && validRace && validSize &&
      validImage && validTemperament) {
      let data = new FormData();
      data.append("name", this.state.name)
      data.append("race", this.state.race)
      data.append("size", this.state.size)
      this.state.description ? data.append("description", this.state.description) : null
      this.state.feeding ? data.append("feeding", this.state.feeding) : null
      this.state.allergies ? data.append("allergies", this.state.allergies) : null
      this.state.special_cares ? data.append("special_cares", this.state.special_cares) : null
      data.append("temperament", this.state.temperament)
      data.append("image", { uri: this.state.image.uri, name: 'uploadProfile.jpg', type: 'image/jpeg' })
      this.setState({ waiting: true });
      Fetcher.postToken('addPet', data, this.state.token)
        .then(
          (response) => {
            this.props.goBack();

          }
        )
        .catch(
          (error) => { console.log(error.error) }
        );
    } else {
      //cambiar los success por los que verdaderos
      if (!validImage)
        this.setState({ imageError: 'Imagen Requerida', aboutMeSuccess: false });
      else
        this.setState({ imageError: '', aboutMeSuccess: true });
      if (!validName)
        this.setState({ nameError: 'Espacio Requerido', addressSuccess: false })
      else
        this.setState({ nameError: '', addressSuccess: true });
      if (!validRace)
        this.setState({ raceError: 'Espacio Requerido', phoneSuccess: false });
      else
        this.setState({ raceError: '', phoneSuccess: true });
      if (!validSize)
        this.setState({ sizeError: 'Espacio Requerido', phoneSuccess: false });
      else
        this.setState({ sizeError: '', phoneSuccess: true });

      if (!validTemperament)
        this.setState({ temperamentError: 'Espacio Requerido', phoneSuccess: false });
      else
        this.setState({ temperamentError: '', phoneSuccess: true });
        
    }
  }


  render() {
    let data1 = [{
      value: 'Tranquilo',
    }, {
      value: 'Docil',
    }, {
      value: 'Amigable',
    }, {
      value: 'Agresivo',
    }];

    return (


      <View style={[MainStyles.mainCard, MainStyles.profileCard]}>
        <UploadPicture
          titlePicture='Añadir foto de mascota'
          image={this.state.image}
          error={this.state.imageError}
          handlerImage={this.handlerImage}
        />
        <InputMT
          title='Nombre'
          handleValue={this.handleValue}
          placeholder='Ingrese el nombre de su mascota'
          handler='name'
          value={this.state.name}
          error= {this.state.nameError}
        />
        <InputMT
          title='Tamaño'
          handleValue={this.handleValue}
          placeholder='Ingrese el tamaño de su mascota'
          handler='size'
          value={this.state.size}
          error={this.state.sizeError}
        />
        <Combobox
          title='Temperamento'
          data={data1}
          onChangeText={this.onChangeTextPress}
          error={this.state.temperamentError}
          
        ></Combobox>
        <InputMT
          title='Raza'
          handleValue={this.handleValue}
          placeholder='Ingrese la raza de su mascota'
          handler='race'
          value={this.state.race}
          error={this.state.raceError}
        />
        <InputMT
          title='Descripcion'
          handleValue={this.handleValue}
          placeholder='Ingrese una pequeña descripción de su mascota'
          handler='description'
          value={this.state.description}
          error={this.state.descriptionError}
        />
        <InputMT
          title='Alimentacion'
          handleValue={this.handleValue}
          placeholder='Ingrese una pequeña descripción de la alimentación'
          handler='feeding'
          value={this.state.feeding}
          error={this.state.feedingError}
        />
        <InputMT
          title='Alergias'
          handleValue={this.handleValue}
          placeholder='Ingrese las alergias si presenta'
          handler='allergies'
          value={this.state.allergies}
          error={this.state.feedingError}
        />
        <InputMT
          title='Cuidados especiales'
          handleValue={this.handleValue}
          placeholder='Ingrese si presenta cuidados especiales'
          handler='special_cares'
          value={this.state.special_cares}
          error={this.state.special_caresError}
        />
        <MainButton
          title='Añadir Mascota'
          onPress={this.createPet} />



      </View>


    );
  };
}