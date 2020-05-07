const express = require('express');
const app = express();

const { config } = require('../config/index');
const usersApi = require('../components/users/routes');

app.use(express.json());

//Routes
usersApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
