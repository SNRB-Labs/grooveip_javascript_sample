import ReserveNumberRequest from '../sdk/numberReserveRequest';
import ApiClient from '../sdk/apiClient';

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
    });

    it(`should build reserve nuber request object`, () => {

        let expected = new ReserveNumberRequest(`http://dev-commercial-api.azurewebsites.net/api/numbers/reserve/`, 'world', '+1-845-555-5555', '845', '1234', 'df6657fd2d4b68fd4ebc9f2927f2d70c02d9eb224b32fda64ceb6ebb76197690');

        let actual = client.buildReserveNumberRequest('+1-845-555-5555', '845');

        expect(expected.url).toBe(actual.url);
        expect(expected.clientId).toBe(actual.clientId);
        expect(expected.number).toBe(actual.number);
        expect(expected.areaCode).toBe(actual.areaCode);
        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.hash).toBe(actual.hash);
    });

});

