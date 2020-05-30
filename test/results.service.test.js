const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock,
  getStub,
  createStub,
  updateStub } = require('../utils/mocks/mongoLib');

const { OrderServiceMock } = require('../utils/mocks/order');

const { resultMocks } = require('../utils/mocks/result');

describe('result - service', function () {
  const ResultService = proxyquire('../components/results/resultsService', {
    '../../lib/mongo': MongoLibMock,
    '../orders/ordersService': OrderServiceMock,
  });

  const resultService = new ResultService();


  describe('when createResult method is called', async function () {
    it('should call the create and update mongoLib methods', async function () {
      await resultService.createResult(resultMocks[0]);
      assert.strictEqual(createStub.called, true);
      assert.strictEqual(updateStub.called, true);
    });

    it('should return a id', async function () {
      const result = await resultService.createResult(resultMocks[0]);
      assert.deepEqual(result, resultMocks[0]._id);
    });
  });

  describe('when getResult method is called', async function () {
    it('should call the get mongoLib methods', async function () {
      await resultService.getResult(resultMocks[0]._id);
      assert.strictEqual(getStub.called, true);
    });

    it('should return a result', async function () {
      const result = await resultService.getResult(resultMocks[0]._id);
      assert.deepEqual(result, resultMocks[0]);
    });
  });
});