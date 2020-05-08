const mongoose = require('mongoose');

const schema = mongoose.Schema;

const csvSchema = new schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
});

const model = mongoose.model('usersCSV', csvSchema);

module.exports = model;
