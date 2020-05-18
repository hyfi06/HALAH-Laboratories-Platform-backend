const mongoose = require('mongoose');
const { config } = require('../../config');

const { Schema } = mongoose;

const resultsSchema = new Schema({
  orderId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Supply order's id"],
  },
  result: [{
    fieldName: {
      type: String,
    },
    value: {
      type: Number,
    },
    reference: {
      type: String,
    }
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