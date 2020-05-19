const mongoose = require('mongoose');
const { config } = require('../../config');

const { Schema } = mongoose;

const examsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  indications: {
    type: String,
  },
  resultTemplate: [{
    fieldName: {
      type: String,
    },
    reference: {
      type: String,
    },
  }],
  scheduledDays: {
    type: Number,
  },
  resultWaitingDays: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});


const ExamsModel = mongoose.model(config.dbCollections.exams, examsSchema);

module.exports = ExamsModel;