const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const MessagesSchema = new schema({
  patientId: {
    type: mongoose.Types.ObjectId,
  },
  messageText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
});

const MessagesModel = mongoose.model(
  config.dbCollections.messages,
  MessagesSchema
);

module.exports = MessagesModel;
