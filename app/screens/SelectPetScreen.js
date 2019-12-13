import React, { Component } from "react";
import { 
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Image
} from "react-native";
import MainButton from "../components/MainButton";
import Fetcher from "../services/Fetcher";
import MainStyles from "../styles/MainStyles";
import IconButton from "../components/IconButton";
import LocalStorage from '../services/LocalStorage';
class SelectPetScreen extends Component {

    state ={
        pets: [],
        loading:false,
        selected:[]
    }
    

    componentDidMount(){
        this.getPetsUser();

    }

    getPetsUser = async () =>{
        let idClient = null;
        let token = await LocalStorage.retrieveToken();
        this.setState({loading: true});
        await Fetcher.getClientID(token).then(response => {
            idClient = response.data.id
        });
        await Fetcher.getToken("getPetsclient/", token)
            .then(response => {
                this.setState({
                    pets: response.data.pets,
                    loading:false,
                    
                });
            })
            .catch(error => {
                console.log(error);
            });
            
    }

    //retrieve pets to reservation view

    goToReservation = () => {
        
        
        this.props.navigation.navigate("ViewHome", {selected: this.state.selected,})};
    
    //select item flashlight

    selectItem = data => {
        data.item.isSelect = !data.item.isSelect;
        data.item.selectedClass = data.item.isSelect ? MainStyles.selected : MainStyles.list;
      
        const index = this.state.pets.findIndex(
          item => data.item.id === item.id
        );
        this.state.selected[index] = data.item;

        this.setState({
            selected: this.state.selected
          });
        
      /*falta realizar si el elemento es deseleccionado lo elimine
        let newSelected = data.item;
        this.setState(state => {
            const selected = [...state.selected, newSelected]
            return {
                selected,
              
            };
          });*/
        
     
      };

    //separar items

    FlatListItemSeparator = () => <View style={{height: 0.5,
        width: "100%",
        backgroundColor:"rgba(255,255,255,0.5)"}} />;
    // render Item

    renderItem = (data) =>{

        return(
            <TouchableOpacity
            style={[MainStyles.list, data.item.selectedClass]}      
            onPress={() => this.selectItem(data)}
        >
            <Image
                source={{ uri: data.item.image  }}
                style={{ width: 40, height: 40, margin: 6 }}
            />
            <Text style={{color:'#ffffff'}}>  {data.item.name}  </Text>
            
        </TouchableOpacity>
        )
        
    }
    
   
   
   render() {
    const itemNumber = this.state.pets.filter(item => item.isSelect).length;
    const {colorTheme} =this.props.navigation.state.params.screenProps;
    if (this.state.loading) {return (
        <ActivityIndicator
                        size="large"
                        color="#007EA9"
                        style={MainStyles.loading}
                    />
      );
    }
          return (
           
            <View style={{flex: 1,
                backgroundColor:'#222',
                paddingVertical: 50,
                position: "relative"
                }}>
                    <FlatList
                        data={this.state.pets}
                        ItemSeparatorComponent={this.FlatListItemSeparator}
                        renderItem={item => this.renderItem(item)}
                        keyExtractor={item => item.id.toString()}
                        extraData={this.state}
                    />

                    
                    <MainButton
                    title={'Seleccionar'}
                    onPress={() => this.goToReservation()}
                    colorTheme={colorTheme}
                    
                />
            
            </View>
            
      
          )};
}
export default SelectPetScreen;

