const express = require('express');
const supertest = require('supertest');
const { errorHandler, wrapErrors } = require('./middleware/errorHandler');
function testServer(route) {
  const app = express();
  app.use(express.json());

  route(app);

  app.use(wrapErrors);
  app.use(errorHandler);
  return supertest(app);
}

module.exports = testServer;