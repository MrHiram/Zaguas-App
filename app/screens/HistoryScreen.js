import React from 'react';
import {
    Text,
    View,
    Platform,
    TextInput,
    ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MainStyles from '../styles/MainStyles';
import HistoryCardContainer from '../containers/HistoryCardContainer';
import LocalStorage from '../services/LocalStorage';
import Fetcher from '../services/Fetcher';
import HistoryButton from '../components/HistoryButton';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationEvents } from 'react-navigation';

export default class HistoryScreen extends React.Component {
    _isMounted = false;

    state = {
        cards: [],
        loading: false,
        token: ''
    };
    componentDidMount() {
        this._isMounted = true;
        this.getData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getData = async () => {
        this.setState({
            token: await LocalStorage.retrieveToken(),
            loading: true
        }),
            Fetcher.getToken('getReservations', this.state.token)
                .then(response => {
                    if (this._isMounted) {
                        this.setState({
                            cards: response.data.reservations,
                            loading: false
                        });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
    };

    render() {
        let { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;

        //mapeo del fetcher
        let historyCards = null;
        if (this.state.cards != null) {
            historyCards = this.state.cards.map(data => {
                return (
                    <HistoryCardContainer
                        screenProps={this.props.screenProps}
                        key={data.id}
                        ownerName={data.careTakerName}
                        ownerImage={data.careTakerImage}
                        ownerLocation={data.ownerLocation}
                        image={data.homeImage}
                        price_per_night={data.price_per_night}
                        status={data.status}
                        start_date={data.start_date}
                        end_date={data.end_date}
                    />
                );
            });
        }

        if (this.state.loading) {
            return (
                <ActivityIndicator
                    size="large"
                    color="#007EA9"
                    style={MainStyles.loading}
                />
            );
        }

        //termina el mapeo
        return (
            <ScrollView
                style={[
                    MainStyles.containerHistory,
                    colorTheme.secondaryBackground
                ]}
            >
                <NavigationEvents
                    onDidFocus={payload => this.getData()}
                />
                <View style={[MainStyles.borderBottom, colorTheme.feedHeader]}>
                    <View
                        style={[
                            MainStyles.searchBarContainer,
                            colorTheme.searchBar
                        ]}
                    >
                        <Icon
                            name="ios-search"
                            size={20}
                            color={darkThemeOn ? '#fff' : '#222'}
                            style={MainStyles.searchBarIcon}
                        />
                        <TextInput
                            placeholder={t('search')}
                            placeholderTextColor="grey"
                            style={MainStyles.searchBarText}
                        />
                    </View>
                    <View>
                        <Text
                            style={[
                                MainStyles.feedHeaderText,
                                colorTheme.mainTextColor
                            ]}
                        >
                            {t('recentHomes')}
                        </Text>
                    </View>
                </View>
                <View>{historyCards ? historyCards : null}</View>
            </ScrollView>
        );
    }
}
