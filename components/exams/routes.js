const express = require('express');
const passport = require('passport');
require('../../utils/auth/strategies/jwt');

const ExamsService = require('./examsService');

function examsApi(app) {
  const router = express.Router();

  app.use('/api/exams', router);

  const examsService = new ExamsService();

  router.get(
    '/:examId',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { examId } = req.params;

      try {
        const exam = await examsService.getExam(examId);

        res.status(200).json({
          data: exam,
          message: 'test retrieved',
        });
      } catch (error) {
        next(error);
      }
    });

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { short } = req.query;

      try {
        const exams = await examsService.getExams({ short });
        res.status(200).json({
          data: exams,
          message: 'test retrieved',
        });
      } catch (error) {
        next(error);
      }
    });
}

module.exports = examsApi;