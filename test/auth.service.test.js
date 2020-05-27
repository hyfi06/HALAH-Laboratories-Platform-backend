const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { apiKeysMock } = require('../utils/mocks/auth');

describe('auth - service', function () {
  const ApiKeysServices = proxyquire(
    '../components/auth/apiKeysService.js',
    {
      '../../lib/mongo': MongoLibMock,
    }
  );

  const apiKeysServices = new ApiKeysServices();

  describe('when getApiKey method is called', async function () {
    it('should call the getAll MongoLib method', async function () {
      await apiKeysServices.getApiKey({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return a apiKey', async function () {
      const result = await apiKeysServices.getApiKey({ token: apiKeysMock[0].token });
      const expected = apiKeysMock[0];
      assert.deepEqual(result, expected);
    });
  });
});