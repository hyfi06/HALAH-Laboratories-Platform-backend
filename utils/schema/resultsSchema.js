const mongoose = require('mongoose');
const { config } = require('../../config');

const { Schema } = mongoose;

const resultsSchema = new Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Supply order's id"],
  },
  bacteriologistId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Supply bacteriologist's id"],
  },
  results: [{
    fieldName: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const ResultsModel = mongoose.model(config.dbCollections.results, resultsSchema);

module.exports = ResultsModel;