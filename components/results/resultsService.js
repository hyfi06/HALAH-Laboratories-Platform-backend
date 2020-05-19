const MongLib = require('../../lib/mongo');
const boom = require('@hapi/boom');
const { config } = require('../../config');
const ResultsModel = require('../../utils/schema/resultsSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');

const OrdersService = require('../orders/ordersService');

class ResultsService {
  constructor() {
    this.collection = config.dbCollections.results;
    this.mongoDB = new MongLib();
    this.ordersService = new OrdersService();
  }

  /**
   * Create a new results
   * @param {Object} result  data of results
   * @returns {string} id of new results
   */
  async createResult(result) {
    validationModelHandler(result, ResultsModel);

    const order = await this.ordersService.getOrder(result.orderId);
    if (!order) throw boom.badRequest('OrderId not found');

    const createResultId = await this.mongoDB.create(
      this.collection,
      new ResultsModel(result)
    );

    const updateOrderId = await this.mongoDB.update(
      config.dbCollections.orders,
      result.orderId,
      {
        resultId: createResultId,
        isComplete: true,
      }
    );
    console.log(updateOrderId);
    return createResultId;
  }

  /**
   * Retrieve a result by id
   * @param {string} id id of result
   * @returns {Object} results details
   */
  async getResults(id) {
    const result = await this.mongoDB.get(
      this.collection,
      id
    );

    if (!result) throw boom.notFound('Not found result');
    return result;
  }
}

module.exports = ResultsService;