import axios from 'axios';

const fetcher = {
    url: 'http://192.168.1.13:8000/api/',
    postNoToken: async function(route, data) {
        return await axios.post(this.url + route, data);
    },
    postTokenFiles: async function(route, data, accessToken) {
        var config = {
            headers: { Authorization: 'Bearer ' + accessToken }
        };
        return await axios
            .post(this.url + route, data, config)
            .then(function(response) {
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    },
    postToken: async function(route, data, accessToken) {
        var config = {
            headers: { Authorization: 'Bearer ' + accessToken }
        };

        return await axios.post(this.url + route, data, config);
    },
    getNotToken: async function(route, value) {
        return await axios.get(this.url + route + '/' + value);
    },
    getToken: async function(route, accessToken) {
        var config = {
            headers: { Authorization: 'Bearer ' + accessToken }
        };
        return await axios.get(this.url + route, config);
    },
    //prueba
    getClientID: async function(accessToken) {
        var config = {
            headers: { Authorization: 'Bearer ' + accessToken }
        };
        return await axios.get(this.url + 'getClientID', config);
    }
};
export default fetcher;
