const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock,
  getStub,
  createStub,
  getAllStub } = require('../utils/mocks/mongoLib');

const { ordersMock } = require('../utils/mocks/order');

describe('result - service', function () {
  const OrdersService = proxyquire('../components/orders/ordersService', {
    '../../lib/mongo': MongoLibMock,
  });

  const ordersService = new OrdersService();


  describe('when createOrder method is called', async function () {
    it('should call the create mongoLib methods', async function () {
      await ordersService.createOrder(ordersMock[0]);
      assert.strictEqual(createStub.called, true);
    });

    it('should return a id', async function () {
      const result = await ordersService.createOrder(ordersMock[0]);
      assert.deepEqual(result, ordersMock[0]._id);
    });
  });

  describe('when getOrder method is called', async function () {
    it('should call the get mongoLib methods', async function () {
      await ordersService.getOrder(ordersMock[0]._id);
      assert.strictEqual(getStub.called, true);
    });

    it('should return a order', async function () {
      const result = await ordersService.getOrder(ordersMock[0]._id);
      assert.deepEqual(result, ordersMock[0]);
    });
  });

  describe('when getOrders method is called', async function () {
    it('should call the getAll mongoLib methods', async function () {
      await ordersService.getOrders({ patient: ordersMock[0].patientId });
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return all orders', async function () {
      const result = await ordersService.getOrders({ patient: ordersMock[0].patientId });
      assert.deepEqual(result, [ordersMock[0]]);
    });
  });
});