const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const UsersSchema = new schema({
  documentID: {
    type: Number,
    unique: true,
    trim: true,
    required: 'Please Supply an identification number',
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
    default: function () {
      const first = this.firstName.split(' ').slice(0, 1).join(' ');
      const last = this.lastName.split(' ').slice(0, 1).join(' ');
      const digits = this.documentID.toString().slice(-4);
      const firstLast = first + '.' + last + '.' + digits;
      return firstLast;
    },
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
  hash: String,
  salt: String,
});

const UserModel = mongoose.model(config.dbCollections.users, UsersSchema);

module.exports = UserModel;
