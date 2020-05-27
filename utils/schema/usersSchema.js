const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const UsersSchema = new schema({
  documentID: {
    type: Number,
    min: 4,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  imageURL: {
    type: String,
  },
  typeOfUser: {
    type: String,
    required: true,
  },
});

const UserModel = mongoose.model(config.dbCollections.users, UsersSchema);

module.exports = UserModel;
