import axios from 'axios';
import ReserveNumberRequest from '../sdk/numberReserveRequest';
import ApiClient from '../sdk/apiClient';
import NumbersProvider from '../sdk/numbersProvider';

jest.mock('axios');

describe('NumbersProvider for making calls to the NUMBERS endpoint', () => {
 
    let client = new ApiClient('00000000-0000-0000-0000-0000000000000', '000000');
 
    it(`should return an array of numbers from an area code`, () => {
        
        let data = ['+18453518688', '+18453518689', '+18453518690', '+18453518694', '+18453518696', '+18453518704', '+18453518705', '+18453518707', '+18453518708', '+18453518709'];

        axios.get.mockResolvedValue(data);

        let provider = new NumbersProvider(client);

        return expect(provider.searchNumbers('845')).resolves.toBe(data);
    });

});

describe('ApiClient for building REST calls', () => {

    let client = new ApiClient('00000000-0000-0000-0000-0000000000000', '000000');
    const mockGenerateRequestId = jest.fn();
    ApiClient.prototype.generateRequestId = mockGenerateRequestId;
    mockGenerateRequestId.mockReturnValue('1234');


    it('should build numbers inventory url', () => {
        
        expect('https://commercial.snrblabs.com/api/numbers/inventory/000000/page/1/quantity/1000/requestId/1234/hash/4dc1dfb49d6a4e0695f4ba70c730a0cace6ba5d67467907ef96b7136dd30b8a7').
            toBe(client.buildNumbersInventoryUrl());
    });

    it(`should build numbers seaerch url`, () => {

        expect('https://commercial.snrblabs.com/api/numbers/list/000000/areaCode/732/requestId/1234/hash/f6732e023125a1cc9e33ddde94ccbca027bf140d598278123c1565378bf325b6')
            .toBe(client.buildSearchNumbersUrl(732));
    });

    it(`should build reserve nuber request object`, () => {

        let expected = new ReserveNumberRequest(`https://commercial.snrblabs.com/api/numbers/reserve/`, '000000', '+1-845-555-5555', '845', '1234', 'c3ffa035e77d636f97a048906a944f592bc0a0cae82a4387d4a747a27e3d1fc5');

        let actual = client.buildReserveNumberRequest('+1-845-555-5555', '845');

        expect(expected.url).toBe(actual.url);
        expect(expected.clientId).toBe(actual.clientId);
        expect(expected.number).toBe(actual.number);
        expect(expected.areaCode).toBe(actual.areaCode);
        expect(expected.requestId).toBe(actual.requestId);
        expect(expected.hash).toBe(actual.hash);
    });

});

