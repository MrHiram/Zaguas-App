import React from 'react';
import { Text, View, ScrollView, Platform, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainStyles from '../styles/MainStyles';
import HistoryCardContainer from '../containers/HistoryCardContainer';
import LocalStorage from '../services/LocalStorage';
import Fetcher from '../services/Fetcher';
import HistoryButton from '../components/HistoryButton'

export default class HistoryScreen extends React.Component{

    state={
        cards: [],
        loading:false,
    }
    componentDidMount(){
        this.getData();
    }

    getData = async () => {
       

        this.setState({ token: await LocalStorage.retrieveToken(), loading:true }),
            Fetcher.getToken("getReservations", this.state.token)
                .then(response => {
                    this.setState({
                        cards: response.data.reservations,
                        loading: false
                    });
                    
                })
                .catch(error => {
                    console.log(error);
                });
    };


    render(){
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;

        //mapeo del fetcher
        let historyCards =null;
        if(this.state.cards !=null){
            historyCards = this.state.cards.map(data => {
                console.log(data);
                return (
                    <HistoryCardContainer screenProps={this.props.screenProps}
                    key={data.id}
                    ownerName={data.care_taker.user.name}
                    ownerImage={data.care_taker.image}
                    ownerLocation={data.care_taker.address}
                    image={data.home.image}
                    price_per_night={data.home.price_per_night}
                    status={data.status}
                    start_date={data.start_date}
                    end_date={data.end_date}/>
                );
            });
        }

        if (this.state.loading) {return (
            <ActivityIndicator
                            size="large"
                            color="#007EA9"
                            style={MainStyles.loading}
                        />
          );
        }
        
        //termina el mapeo
        return(
            <View style={[MainStyles.containerHistory,colorTheme.secondaryBackground]}>
                <View style={[MainStyles.borderBottom, colorTheme.feedHeader]}>
                    <View style={[MainStyles.searchBarContainer, colorTheme.searchBar]}>
                        <Icon
                            name="ios-search"
                            size={20}
                            color={darkThemeOn ? '#fff' : '#222'}
                            style={MainStyles.searchBarIcon} />
                        <TextInput
                            placeholder={t('search')}
                            placeholderTextColor="grey"
                            style={MainStyles.searchBarText} />
                    </View>
                    <View>
                        <Text
                            style={[MainStyles.feedHeaderText, colorTheme.mainTextColor]}
                        >{t('recentHomes')}</Text>
                    </View>
                </View>
                <View style={colorTheme.secondaryBackground}>
                    <ScrollView
                        contentContainerStyle={{ alignItems: 'center' }}>
                        {historyCards ? historyCards: null}
                  
                    </ScrollView>
                    
                </View>


            </View>
        );
    };
}