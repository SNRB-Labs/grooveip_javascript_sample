import ReserveNumberRequest from './numberReserveRequest';
import ApiClient from './apiClient';
import axios from 'axios';

class NumbersProvider {

    apiClient;

    constructor(apiClient){
        this.apiClient = apiClient;
    }

    reserveNumber(number, areaCode){
        return new Promise((resolve, reject) => {
            let data = this.apiClient.buildReserveNumberRequest(number, areaCode);
            console.log(data);
            axios.post(data.url, {
                data
            })
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getMyNumbers(){
        return new Promise((resolve, reject) => {
            axios.get(this.apiClient.buildNumbersInventoryUrl())
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
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