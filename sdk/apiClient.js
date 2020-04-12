import ReserveNumberRequest from './numberReserveRequest';

const BASE_URL = 'https://commercial.snrblabs.com/api';
const crypto = require('crypto');

class ApiClient {

    secret;
    clientId;

    constructor(secret, clientId){
        this.secret = secret;
        this.clientId = clientId;
    }

    buildNumbersInventoryUrl(){

        let page = '0';
        let quantity = '1000';
        let requestId = this.generateRequestId();

        let hash = crypto.createHash('sha256').update(`${this.clientId}${page}${quantity}${requestId}${this.secret}`).digest('hex');
        let url = `${BASE_URL}/numbers/inventory/${this.clientId}/page/${page}/quantity/${quantity}/requestId/${requestId}/hash/${hash}`;
        
        return url;
    }

    buildSearchNumbersUrl(areaCode){
        
        let requestId = this.generateRequestId();

        let hash = crypto.createHash('sha256').update(`${this.clientId}${areaCode}${requestId}${this.secret}`).digest('hex');
        let url = `${BASE_URL}/numbers/list/${this.clientId}/areaCode/${areaCode}/requestId/${requestId}/hash/${hash}`
        return url;
    }

    buildReserveNumberRequest(phoneNumber, areaCode){
        
        let requestId = this.generateRequestId();

        let hash = crypto.createHash('sha256').update(`${this.clientId}${phoneNumber}${areaCode}${requestId}${this.secret}`).digest('hex');

        let request = new ReserveNumberRequest(`${BASE_URL}/numbers/reserve/`, this.clientId, phoneNumber, areaCode, requestId, hash)

        return request;
    }

    generateRequestId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default ApiClient;