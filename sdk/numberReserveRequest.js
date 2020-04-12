class ReserveNumberRequest {

    url;
    customerId;
    number; 
    areaCode; 
    requestId; 
    hash;

    constructor(url, customerId, number, areaCode, requestId, hash){
        this.url = url;
        this.customerId = customerId;
        this.number = number;
        this.areaCode = areaCode;
        this.requestId = requestId;
        this.hash = hash;
    }
}

export default ReserveNumberRequest;