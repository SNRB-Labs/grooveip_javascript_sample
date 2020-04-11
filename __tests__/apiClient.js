import ApiClient from '../sdk/apiClient.js';

test('adds 1 + 2 to equal 3', () => {
    let client = new ApiClient('hello', 'world');

    const mockGenerateRequestId = jest.fn();
    ApiClient.prototype.generateRequestId = mockGenerateRequestId;
    mockGenerateRequestId.mockReturnValue('1234');

    expect('http://dev-commercial-api.azurewebsites.net/api/numbers/inventory/world/page/1/quantity/100/requestId/1234/hash/d55d061f98bc9f71df7f49d2c5a3fc5902499f1bed96898ef47b3678739d052e').toBe(client.buildNumbersInventoryUrl());
});