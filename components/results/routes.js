const express = require('express');
const passport = require('passport');
require('../../utils/auth/strategies/jwt');

const validationIdHandler = require('../../utils/middleware/validationIdHandler');

const ResultsService = require('./resultsService');
const OrdersService = require('../orders/ordersService');
const ExamsService = require('../exams/examsService');
const MessagesService = require('../messages/messagesService');

function resultsApi(app) {
  const router = express.Router();

  app.use('/api/results', router);

  const resultsService = new ResultsService();
  const ordersService = new OrdersService();
  const examsService = new ExamsService();
  const messagesService = new MessagesService();

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationIdHandler('orderId', 'body'),
    validationIdHandler('bacteriologistId', 'body'),
    async function (req, res, next) {
      const result = req.body;

      try {
        const createResultId = await resultsService.createResult(result);

        const order = await ordersService.getOrder(result.orderId);
        const exam = await examsService.getExam(order.examTypeId);

        const message = `${exam.name} test results are now available`;

        await messagesService.createMessages({
          patientId: order.patientId,
          messageText: message,
        });
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
        const result = await resultsService.getResult(resultId);
        const order = await ordersService.getOrder(result.orderId);
        const exam = await examsService.getExam(order.examTypeId);

        result.results.forEach(resultItem => {
          resultItem.reference = exam.resultTemplate
            .filter(template =>
              template.fieldName == resultItem.fieldName
            )[0].reference;
        });

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