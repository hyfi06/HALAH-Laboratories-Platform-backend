const express = require('express');
const passport = require('passport');
const MessagesService = require('./messagesService');

// strategy JWT
require('../../utils/auth/strategies/jwt');

function usersApi(app) {
  const router = express.Router();
  app.use('/api/messages', router);
  const messagesService = new MessagesService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const { patientId } = req.query;

      try {
        const messages = await messagesService.getMessages(patientId);
        console.log(messages);

        res.status(200).json({
          data: messages,
          message: 'Messages retrieved',
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async function (req, res, next) {
      const message = req.body;
      try {
        const createUserId = await messagesService.createMessages(message);

        res.status(201).json({
          data: createUserId,
          message: 'Message created',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}

module.exports = usersApi;
