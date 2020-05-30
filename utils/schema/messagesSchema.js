const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const MessagesSchema = new schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  messageText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const MessagesModel = mongoose.model(
  config.dbCollections.messages,
  MessagesSchema
);

module.exports = MessagesModel;
