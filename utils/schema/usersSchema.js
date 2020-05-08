const mongoose = require('mongoose');
const { config } = require('../../config');

const schema = mongoose.Schema;

const UsersSchema = new schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
});

const model = mongoose.model(config.dbCollections.users, UsersSchema);

module.exports = model;
