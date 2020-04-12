import ApiClient from '../sdk/apiClient.js';

describe('API Client for building REST calls', () => {

    let client = new ApiClient('hello', 'world');
    const mockGenerateRequestId = jest.fn();
    ApiClient.prototype.generateRequestId = mockGenerateRequestId;
    mockGenerateRequestId.mockReturnValue('1234');


    it('should build numbers inventory url', () => {
        
        expect('http://dev-commercial-api.azurewebsites.net/api/numbers/inventory/world/page/1/quantity/1000/requestId/1234/hash/3119e64f94b53db50264c8b12d4b3441622e8b302244b38dc56d879e9d8ba72b').
            toBe(client.buildNumbersInventoryUrl());
    });

    it(`should build numbers seaerch url`, () => {

        expect('http://dev-commercial-api.azurewebsites.net/api/numbers/list/world/areaCode/732/requestId/1234/hash/d1f2ac5d80517554e89e1e79e816d37eb529364928e547e5ec4cf6f63e0ac503')
            .toBe(client.buildSearchNumbersUrl(732));
        ///numbers/list/${this.clientId}/areaCode/${areaCode}/requestId/${requestId}/hash/${hash}
    });

});

