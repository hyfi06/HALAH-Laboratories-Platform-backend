const assert = require('assert');
const proxyquire = require('proxyquire');

const { UsersServiceMock } = require('../utils/mocks/users');
const { OrderServiceMock, ordersMock } = require('../utils/mocks/order');
const { ExamsServiceMock } = require('../utils/mocks/exams');
const { ResultsServiceMock } = require('../utils/mocks/result');
const { pdfMock } = require('../utils/mocks/pdf');

describe('pdf - service', function () {
  const PDFService = proxyquire('../components/pdfs/pdfsService', {
    '../users/usersService': UsersServiceMock,
    '../orders/ordersService': OrderServiceMock,
    '../exams/examsService': ExamsServiceMock,
    '../results/resultsService': ResultsServiceMock,
  });
  const pdfService = new PDFService();

  describe('when resultsHTMLString method is called', async function () {
    it('shold return a html', async function () {
      const result = await pdfService.resultsHTMLString([ordersMock[0]._id]);
      assert.equal(result, pdfMock);

    });
  });

});