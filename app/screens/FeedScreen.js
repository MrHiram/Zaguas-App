import React from 'react';

import {
    Text,
    View,
    SafeAreaView,
    FlatList,
    Platform,
    TextInput,
    List,
    ActivityIndicator
} from 'react-native';

import HomeCard from '../components/HomeCard';
import MainStyles from '../styles/MainStyles';
import Fetcher from '../services/Fetcher';
import LocalStorage from '../services/LocalStorage';

import Icon from 'react-native-vector-icons/Ionicons';

export default class FeedScreen extends React.Component {
    state = {
        loading: true,
        data: [],
        page: 1,
        refreshing: false,
        last_page: 1,
        token: ''
    };

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        var page = this.state.page;
        var last_page = this.state.last_page;

        this.setState({ token: await LocalStorage.retrieveToken() }),
            Fetcher.getToken(`getHomes/?page=${page}`, this.state.token)
                .then(response => {
                    this.setState({
                        data:
                            page == 1
                                ? response.data.homes.data
                                : [
                                      ...this.state.data,
                                      ...response.data.homes.data
                                  ],
                        last_page: response.data.homes.last_page,
                        refreshing: false,
                        loading: false
                    });
                })
                .catch(error => {
                    console.log(error);
                });
    };

    handleRefresh = () => {
        this.setState({
            page: 1,
            refreshing: true
        });
        this.getData();
    };
    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1
        });
        this.getData();
    };

    viewHome = item => {
        this.props.navigation.navigate('ViewHome', {
            item: item,
            navigation: this.props.navigation,
            screenProps: this.props.screenProps
        });
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: '#CED0CE',
                    marginBottom: 20
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };
    //renderizar item for flatlist

    renderItem = ({ item }) => {
        let image = { uri: item.care_taker_image };

        return (
            <HomeCard
                item={item}
                viewHome={this.viewHome}
                t={this.props.screenProps.t}
                userName={item.userName}
                image={item.image}
                imageCareTaker={image}
                location={item.address}
                description={item.description}
                price={item.price}
            />
        );
    };

    render() {
        const { t, locale, colorTheme, darkThemeOn } = this.props.screenProps;
        return (
            <SafeAreaView style={{ flex: 1 }}>
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
                            {t('newHomes')}
                        </Text>
                    </View>
                </View>
                <View style={[colorTheme.secondaryBackground, { flex: 1 }]}>
                    <FlatList
                        contentContainerStyle={{ alignItems: 'center' }}
                        data={this.state.data}
                        renderItem={this.renderItem}
                        keyExtractor={item => item.id.toString()}
                        onEndReached={() => this.handleLoadMore()}
                        onEndReachedThreshold={1}
                        refreshing={this.state.refreshing}
                        onRefresh={() => this.handleRefresh()}
                        ListFooterComponent={() => this.renderFooter()}
                    />
                </View>
            </SafeAreaView>
        );
    }
}
