const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');
const OrdersModel = require('../../utils/schema/ordersSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');

class OrdersService {
  constructor() {
    this.collection = config.dbCollections.orders;
    this.mongoDB = new MongoLib();
  }

  /**
   * Create a new Order
   * @param {Object} order data of order
   * @returns {string} id of new order
   */
  async createOrder(order) {
    await validationModelHandler(order, OrdersModel);

    const createOrderId = await this.mongoDB.create(
      this.collection,
      new OrdersModel(order),
    );

    return createOrderId;
  }

  /**
   * Retrieve a order
   * @param {string} id id of order
   * @returns {Object} order information
   */
  async getOrder(id) {
    const order = await this.mongoDB.get(
      this.collection,
      id,
    );

    return order || {};
  }
}

module.exports = OrdersService;
