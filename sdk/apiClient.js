const BASE_URL = 'http://dev-commercial-api.azurewebsites.net/api';
const crypto = require('crypto');

class ApiClient {

    secret;
    clientId;

    constructor(secret, clientId){
        this.secret = secret;
        this.clientId = clientId;
    }

    buildNumbersInventoryUrl(){

        let page = '1';
        let quantity = '100';
        let requestId = this.generateRequestId();

        let hash = crypto.createHash('sha256').update(`${this.clientId}${page}${quantity}${requestId}`).digest('hex');

        return `${BASE_URL}/numbers/inventory/${this.clientId}/page/${page}/quantity/${quantity}/requestId/${requestId}/hash/${hash}`;
    }

    generateRequestId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}

export default ApiClient;