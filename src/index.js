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
const usersApi = require('../components/users/routes');
const ordersApi = require('../components/orders/ordersRoutes');

app.use(helmet());
app.use(express.json());

//Routes
usersApi(app);
ordersApi(app);


// Catch 404
app.use(notFoundHandler);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);


// error middleware


app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
