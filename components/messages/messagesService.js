const MongoLib = require('../../lib/mongo');

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
}

module.exports = MessagesService;
