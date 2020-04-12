import ReserveNumberRequest from './numberReserveRequest';
import ApiClient from './apiClient';
import axios from 'axios';

class NumbersProvider {

    apiClient;

    constructor(apiClient){
        this.apiClient = apiClient;
    }

    searchNumbers(areaCode){

        return new Promise((resolve, reject) => {
            axios.get(this.apiClient.buildSearchNumbersUrl(areaCode))
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });

        });
        
    }
}

export default NumbersProvider;