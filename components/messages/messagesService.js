const MongoLib = require('../../lib/mongo');
const { ObjectId } = require('mongodb');
const { config } = require('../../config');
const boom = require('@hapi/boom');
const MessagesModel = require('../../utils/schema/messagesSchema');
const validationModelHandler = require('../../utils/middleware/validationModelHandler');

class MessagesService {
  constructor() {
    this.collection = config.dbCollections.messages;
    this.mongoDB = new MongoLib();
  }

  /**
   * Create a new Message
   * @param {object} message message data
   * @param {string} message.patientId id of patient
   * @param {string} message.messageText message
   * @returns {string} created messages id
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
   * Retrieve a patient messages
   * @param {string} patientId patient id
   * @return {object[]} messages of patient
   */
  async getMessages(patientId) {
    const query = {
      $and: [{ patientId: ObjectId(patientId) }, { read: false }],
    };

    const messages = await this.mongoDB.getAll(this.collection, query);

    if (messages.length == 0) {
      throw boom.notFound('Not exist new messages for this patient');
    }

    const messagesUpdates = messages.map((message) => ObjectId(message._id));

    await this.mongoDB.updateMany(
      this.collection,
      {
        _id: {
          $in: messagesUpdates,
        },
      },
      { read: true }
    );

    return messages || [];
  }
}

module.exports = MessagesService;
