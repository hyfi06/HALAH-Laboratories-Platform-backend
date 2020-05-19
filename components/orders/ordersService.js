const MongoLib = require('../../lib/mongo');
const { ObjectId } = require('mongodb');
const { config } = require('../../config');
const OrdersModel = require('../../utils/schema/ordersSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');
const boom = require('@hapi/boom');

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
      new OrdersModel(order)
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
      id
    );

    if (!order) {
      throw boom.notFound('Order not found');
    }

    order.examTypeUrl = `/api/exams/${order.examTypeId}`;
    delete order.examTypeId;

    return order;
  }

  /**
   * 
   * @param {Object} query query
   * @param {string} query.user user id
   * @returns {Object[]}
   */
  async getOrders({ patient }) {
    const query = patient ? { patientId: ObjectId(patient) } : {};

    const orders = this.mongoDB.getAll(this.collection, query);

    return orders;
  }
}

module.exports = OrdersService;
