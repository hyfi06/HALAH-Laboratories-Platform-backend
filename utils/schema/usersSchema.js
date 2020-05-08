const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const UsersSchema = new schema({
  documentID: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: 'Please Supply an email address',
  },
  contactNumber: {
    type: Number,
  },
  username: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  modifiedAt: {
    type: Date,
  },
});

const UserModel = mongoose.model(config.dbCollections.users, UsersSchema);

module.exports = UserModel;
