class ReserveNumberRequest {

    url;
    customerId;
    phoneNumber; 
    areaCode; 
    requestId; 
    hash;

    constructor(url, customerId, phoneNumber, areaCode, requestId, hash){
        this.url = url;
        this.customerId = customerId;
        this.phoneNumber = phoneNumber;
        this.areaCode = areaCode;
        this.requestId = requestId;
        this.hash = hash;
    }
}

export default ReserveNumberRequest;