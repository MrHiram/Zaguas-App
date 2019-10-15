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
}
export default localStorage;