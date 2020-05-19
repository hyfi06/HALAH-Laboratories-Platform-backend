const express = require('express');
const passport = require('passport');
require('../../utils/auth/strategies/jwt');
const validationIdHandler = require('../../utils/middleware/validationIdHandler');

const ExamsService = require('./examsService');

function examsApi(app) {
  const router = express.Router();

  app.use('/api/exams', router);

  const examsService = new ExamsService();

  router.get(
    '/:examId',
    passport.authenticate('jwt', { session: false }),
    validationIdHandler('examId'),
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
      const { name } = req.query;

      try {
        const exams = await examsService.getExams({ name });

        exams.forEach(exam => {
          delete exam.resultWaitingDays;
          delete exam.createdAt;
          delete exam.updatedAt;
          exam.resultTemplate
            .forEach(template => {
              delete template._id;
              delete template.reference;
            });
        });

        res.status(200).json({
          data: exams,
          message: 'tests retrieved',
        });
      } catch (error) {
        next(error);
      }
    });
}

module.exports = examsApi;