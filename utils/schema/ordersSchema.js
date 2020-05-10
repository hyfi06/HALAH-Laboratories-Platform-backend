const mongoose = require('mongoose');
const { config } = require('../../config');

const { Schema } = mongoose;

const ordersSchema = new Schema({
  id_patient: Schema.Types.ObjectId,
  id_doctor: Schema.Types.ObjectId,
  is_complete: {
    type: Boolean,
    default: false,
  },
  created_at: Number,
  updated_at: Number,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

const OrdersModel = mongoose.model(config.dbCollections.orders, ordersSchema);

module.exports = OrdersModel;