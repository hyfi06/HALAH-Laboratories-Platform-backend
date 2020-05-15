const mongoose = require('mongoose');
const { config } = require('../../config');

const { Schema } = mongoose;

const ordersSchema = new Schema({
  patientId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Supply patient's id"],
  },
  doctorId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Supply doctor's id"],
  },
  examTypeId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Supply exam type's id"],
  },
  isComplete: {
    type: Boolean,
    default: false,
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

ordersSchema.pre('save', function (next) {
  this.updatedAt(Date.now());
  next();
});

const OrdersModel = mongoose.model(config.dbCollections.orders, ordersSchema);

module.exports = OrdersModel;