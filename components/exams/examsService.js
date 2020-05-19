const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');
const ExamsModel = require('../../utils/schema/examsSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');
const boom = require('@hapi/boom');

class ExamsService {
  constructor() {
    this.collection = config.dbCollections.exams;
    this.mongoDB = new MongoLib();
  }

  /**
   * Retrieve a exam by id
   * @param {string} id id of exam
   * @returns {Object} exam information
   */
  async getExam(id) {
    const exam = await this.mongoDB.get(
      this.collection,
      id
    );

    if (!exam) {
      throw boom.notFound('test not found');
    }

    return exam;
  }

  /**
   * Retrieve a exams by query
   * @param {Object} query query data
   * @param {string} query.short exam shortName
   * @returns {Object[]} exams
   */
  async getExams({ name }) {
    const query = name ? {
      $or: [{
        name: {
          $regex: new RegExp(`.*${name}.*`),
          $options: 'i',
        },
      }, {
        shortName: {
          $regex: new RegExp(`.*${name}.*`),
          $options: 'i',
        },
      }],
    } : {};

    const exams = await this.mongoDB.getAll(this.collection, query);

    if (!exams[0]) {
      throw boom.notFound('tests not found');
    }

    return exams;
  }

  /**
 * Create a new exam
 * @param {Object} exam exam data
 * @returns {string} id of new exam
 */
  async createExam(exam) {
    validationModelHandler(exam, ExamsModel);
    const createExamId = await this.mongoDB.create(
      this.collection,
      new ExamsModel(exam)
    );
    return createExamId;
  }
}

module.exports = ExamsService;
