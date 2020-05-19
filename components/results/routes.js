const express = require('express');
const passport = require('passport');
require('../../utils/auth/strategies/jwt');

const validationIdHandler = require('../../utils/middleware/validationIdHandler');

const ResultsService = require('./resultsService');

function resultsApi(app) {
  const router = express.Router();

  app.use('/api/results', router);

  const resultsService = new ResultsService();

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const result = req.body;

      try {
        const createResultId = await resultsService.createResult(result);

        res.status(201).json({
          data: createResultId,
          message: 'result created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.get(
    '/:resultId',
    passport.authenticate('jwt', { session: false }),
    validationIdHandler('resultId'),
    async function (req, res, next) {
      const { resultId } = req.params;

      try {
        const result = await resultsService.getResults(resultId);

        res.status(200).json({
          data: result,
          message: 'result retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = resultsApi;