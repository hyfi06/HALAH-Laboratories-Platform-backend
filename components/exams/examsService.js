const MongoLib = require('../../lib/mongo');
const { config } = require('../../config');
const ExamsModel = require('../../utils/schema/examsSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');

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
      id,
    );

    return exam || {};
  }

  /**
   * Retrieve a exams by query
   * @param {Object} query query data
   * @param {string} query.short exam shortName
   * @returns {Object[]} exams
   */
  async getExams({ short }) {
    const query = short && { shortName: { $in: short } };
    const exams = await this.mongoDB.getAll(this.collection, query);
    return exams || [];
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
      new ExamsModel(exam),
    );
    return createExamId;
  }
}

module.exports = ExamsService;
