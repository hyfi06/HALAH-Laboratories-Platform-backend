const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');

const notFoundHandler = require('../utils/middleware/notFoundHandler');
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('../utils/middleware/errorHandler');

const { errorRegister } = require('../utils/middleware/errorRegister');

const { config } = require('../config/index');
const authApi = require('../components/auth/routes');
const usersApi = require('../components/users/routes');
const ordersApi = require('../components/orders/routes');
const examsApi = require('../components/exams/routes');
const resultsApi = require('../components/results/routes');
const pdfApi = require('../components/pdfs/routes');

app.use(helmet());
app.use(cors());
app.use(express.json());

//Routes
authApi(app);
usersApi(app);
ordersApi(app);
examsApi(app);
resultsApi(app);
pdfApi(app);

// Catch 404
app.use(notFoundHandler);

// error middleware
if(config.dev){
  app.use(logErrors);
} else {
  app.use(errorRegister);
}
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
