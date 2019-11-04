import axios from 'axios';

const fetcher = {
    url: 'http://192.168.1.12:8000/api/', 
    postNoToken: async function (route, data) {
        return await axios.post(this.url + route, data);
    },
    postToken: async function (route, data, accessToken) {
        var config = {
            headers: { 'Authorization': 'bearer ' + accessToken }
        }
        return await axios.post(
            this.url + route,
            data,
            config)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    },
    getNotToken: async function (route, value) {
        return await axios.get(this.url + route + "/" + value);
    },
    getToken: async function (route, accessToken) {
        var config = {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }
        return await axios.get(this.url + route,config);
    },
}
export default fetcher;