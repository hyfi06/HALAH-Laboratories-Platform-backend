const express = require('express');
const OrdersService = require('./ordersService');


function ordersApi(app) {
  const router = express.Router();

  app.use('/api/orders', router);

  const ordersService = new OrdersService();

  router.post('/', async function (req, res, next) {
    const { order } = req.body;
    try {
      const createOrderId = await ordersService.createOrder(order);

      res.status(201).json({
        data: createOrderId,
        message: 'order created',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:orderId', async function (req, res, next) {
    const { orderId } = req.params;

    try {
      const order = await ordersService.getOrder(orderId);

      res.status(200).json({
        data: order,
        message: 'order retrieved',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/', async function (req, res, next) {
    const { patient } = req.query;

    try {
      const userOrders = await ordersService.getOrders({ patient });
      res.status(200).json({
        data: userOrders,
        message: 'user orders retrieved',
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = ordersApi;