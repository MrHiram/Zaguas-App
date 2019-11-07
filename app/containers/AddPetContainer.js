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
    feeding:'',
    allergies: '',
    special_cares: '',
    imageError: '',
    token: '',
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
      this.state.description ? data.append("description", this.state.description):null
      this.state.feeding ? data.append("feeding", this.state.feeding):null
      this.state.allergies ? data.append("allergies", this.state.allergies):null
      this.state.special_cares ? data.append("special_cares", this.state.special_cares):null
      data.append("temperament", this.state.temperament)
      data.append("image", { uri: this.state.image.uri, name: 'uploadProfile.jpg', type: 'image/jpeg' })
      this.setState({ waiting: true });
      Fetcher.postToken('addPet', data, this.state.token)
        .then(
          (response) => {
            console.log(response);
            this.props.setupSuccess();
          }
        )
        .catch(
          (error) => { console.log(error.error) }
        );
    } else {
      if (!validAboutMe)
        this.setState({ aboutMeError: 'Espacio Requerido', aboutMeSuccess: false });
      else
        this.setState({ aboutMeError: '', aboutMeSuccess: true });
      if (!validAddress)
        this.setState({ addressError: 'Espacio Requerido', addressSuccess: false })
      else
        this.setState({ addressError: '', addressSuccess: true });
      if (!validPhone)
        this.setState({ phoneError: 'Espacio Requerido', phoneSuccess: false });
      else
        this.setState({ phoneError: '', phoneSuccess: true });

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

      <KeyboardAwareScrollView
        enableOnAndroid={true}
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={MainStyles.scrollView}
        extraHeight={300}>
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
            handler='nombre'
            value={this.state.name}
          />
          <InputMT
            title='Tamaño'
            handleValue={this.handleValue}
            placeholder='Ingrese el tamaño de su mascota'
            handler='tamano'
            value={this.state.size}
          />
          <Combobox
            title='Temperamento'
            data={data1}
            onChangeText={this.onChangeTextPress}
          ></Combobox>
          <InputMT
            title='Raza'
            handleValue={this.handleValue}
            placeholder='Ingrese la raza de su mascota'
            handler='raza'
            value={this.state.race}
          />
          <InputMT
            title='Descripcion'
            handleValue={this.handleValue}
            placeholder='Ingrese una pequeña descripción de su mascota'
            handler='descripcion'
            value={this.state.description}
          />
          <InputMT
            title='Alimentacion'
            handleValue={this.handleValue}
            placeholder='Ingrese una pequeña descripción de la alimentación'
            handler='descripcion'
            value={this.state.feeding}
          />
          <InputMT
            title='Alergias'
            handleValue={this.handleValue}
            placeholder='Ingrese las alergias si presenta'
            handler='descripcion'
            value={this.state.allergies}
          />
          <InputMT
            title='Cuidados especiales'
            handleValue={this.handleValue}
            placeholder='Ingrese si presenta cuidados especiales'
            handler='descripcion'
            value={this.state.special_cares}
          />
          <MainButton
            title='Añadir Mascota'
            onPress={this.createPet} />



        </View>

      </KeyboardAwareScrollView>
    );
  };
}