const express = require('express');
const app = express();
const helmet = require('helmet');

const notFoundHandler = require('../utils/middleware/notFoundHandler');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('../utils/middleware/errorHandler');

const { config } = require('../config/index');
const authApi = require('../components/auth/routes');
const usersApi = require('../components/users/routes');
const ordersApi = require('../components/orders/routes');
const examsApi = require('../components/exams/routes');

app.use(helmet());
app.use(express.json());

//Routes
authApi(app);
usersApi(app);
ordersApi(app);
examsApi(app);

// Catch 404
app.use(notFoundHandler);

// error middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
