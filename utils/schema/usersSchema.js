const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const UsersSchema = new schema({
  documentID: {
    type: Number,
    min: 6,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  contactNumber: {
    type: Number,
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
  },
  imageURL: {
    type: String,
  },
  typeOfUser: {
    type: String,
  },
});

const UserModel = mongoose.model(config.dbCollections.users, UsersSchema);

module.exports = UserModel;
