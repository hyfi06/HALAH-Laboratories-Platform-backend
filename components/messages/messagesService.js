const MongoLib = require('../../lib/mongo');
const { ObjectId } = require('mongodb');
const { config } = require('../../config');
const MessagesModel = require('../../utils/schema/messagesSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');

class MessagesService {
  constructor() {
    this.collection = config.dbCollections.messages;
    this.mongoDB = new MongoLib();
  }

  /**
   * Create a new message
   * @param {Object} message data of message
   * @returns {string} id of new message
   */
  async createMessages(message) {
    await validationModelHandler(message, MessagesModel);

    const createMessageId = await this.mongoDB.create(
      this.collection,
      new MessagesModel(message)
    );

    return createMessageId;
  }

  /**
   *
   * @param {Object} query query
   * @param {string} query.user user id
   * @param {Boolean} query.read
   * @returns {Object[]}
   */
  async getMessages({ patient, read }) {
    const query = {};
    if (read == false && patient) {
      query['$and'] = [{ read: read }, { patientId: ObjectId(patient) }];
    } else if (patient) {
      query.patientId = ObjectId(patient);
    }

    console.log(query);

    const messages = await this.mongoDB.getAll(this.collection, query);

    await this.mongoDB.updateMany(this.collection, messages, {
      read: true,
    });

    return messages;
  }
}

module.exports = MessagesService;
