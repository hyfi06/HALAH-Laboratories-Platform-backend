const express = require('express');
const app = express();

const { config } = require('../config/index');

app.use(express.json());

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
