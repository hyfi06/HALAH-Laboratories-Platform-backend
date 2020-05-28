const express = require('express');
const passport = require('passport');
require('../../utils/auth/strategies/jwt');
const pdf = require('@hyfi06/html2pdf');
const boom = require('@hapi/boom');

const PDFService = require('./pdfsService');

const pdfService = new PDFService();


function pdfApi(app) {
  const router = express.Router();

  app.use('/api/pdfs', router);
  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    pdf,
    async function (req, res, next) {
      const { orderIds } = req.body;

      if (!orderIds || orderIds.length == 0) {
        next(boom.badRequest('orderIds is required'));
        return;
      }

      try {
        const html = await pdfService
          .resultsHTMLString(orderIds);

        await res.html2pdf({
          filename: 'result.pdf',
          htmlString: html,
          options: { 'printBackground': true },
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = pdfApi;