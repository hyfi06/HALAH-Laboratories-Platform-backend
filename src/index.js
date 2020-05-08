const express = require('express');
const app = express();
const helmet = require('helmet');

const { config } = require('../config/index');
const usersApi = require('../components/users/routes');

const usersApi = require('../components/users/routes');

app.use(helmet());
app.use(express.json());

//Routes
usersApi(app);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
