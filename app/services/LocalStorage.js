import { AsyncStorage } from 'react-native';

const localStorage = {
    saveToken: async function (accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
    },
    retrieveToken: async function (){
        return await AsyncStorage.getItem('accessToken');
    },
    removeToken: async function () {
        await AsyncStorage.removeItem('accessToken');
    },
    save: async function (key, value) {
        await AsyncStorage.setItem(key, value);
    },
    retrieve: async function (key){
        return await AsyncStorage.getItem(key);
    },
    remove: async function (key) {
        await AsyncStorage.removeItem(key);
    },
}
export default localStorage;