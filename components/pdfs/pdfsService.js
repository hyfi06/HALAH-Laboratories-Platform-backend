const boom = require('@hapi/boom');

const UsersService = require('../users/usersService');
const OrdersService = require('../orders/ordersService');
const ExamsService = require('../exams/examsService');
const ResultsService = require('../results/resultsService');

const usersService = new UsersService();
const ordersService = new OrdersService();
const examsService = new ExamsService();
const resultsService = new ResultsService();

const patientTemplate = require('../../utils/templates/resultsPDF/patient');
const rowTestTemplate = require('../../utils/templates/resultsPDF/rowtest');
const resultTestTemplate = require('../../utils/templates/resultsPDF/resultTest');
const layout = require('../../utils/templates/resultsPDF/layout');

class PDFService {
  /**
   * Get a html string of results
   * @param {Object[]} orderIds 
   * @param {string}
   */
  async resultsHTMLString(orderIds) {
    try {
      const regExpId = /[0-9a-fA-F]{24}/;
      const validation = orderIds
        .map(id => regExpId.test(id))
        .reduce((ant, curr) => ant && curr);
      if (!validation) {
        throw boom.badRequest();
      }
    } catch (error) {
      throw boom.badRequest("It isn't a array of valid ids");
    }

    const data = await this.getResultsData(orderIds);
    const patientHtml = patientTemplate(data.patient);
    const resultsHTML = data.results
      .map(result => {
        const testRows = result.result
          .map(test => rowTestTemplate(test))
          .join('\n');

        return resultTestTemplate({ ...result, testRows });
      })
      .join('\n');
    return layout(patientHtml, resultsHTML);
  }

  async getResultsData(orderIds) {
    const orders = await Promise.all(
      orderIds.map(async id => await ordersService.getOrder(id)))
      .then((res) => res);

    if (orders.length === 0) {
      boom.notFound('Orders not found');
    }

    const patient = await this._getUsersByIds(orders[0].patientId);

    const doctorsIds = this._getIds(orders, 'doctorId');
    const doctors = await Promise.all(
      doctorsIds.map(this._getUsersByIds)
    ).then(res => res);

    const examIds = this._getIds(orders, 'examTypeId');
    const exams = await Promise.all(
      examIds.map(async id => await examsService.getExam(id))
    ).then(res => res);

    const resultIds = this._getIds(orders, 'resultId');
    const results = await Promise.all(
      resultIds.map(async id => await resultsService.getResult(id))
    ).then(res => res);

    const bacteriologistIds = this._getIds(results, 'bacteriologistId');
    const bacteriologists = await Promise.all(
      bacteriologistIds.map(this._getUsersByIds)
    ).then(res => res);

    const data = orders.map((order) => {
      const orderExam = this._findById(exams, order.examTypeId);
      const orderDoctor = this._findById(doctors, order.doctorId);
      const orderResult = this._findById(results, order.resultId);
      const orderBacteriologist = this._findById(
        bacteriologists,
        orderResult.bacteriologistId
      );
      const result = orderResult.results.map(result => {
        delete result._id;
        if (!['Positive', 'Negative'].includes(result.value)) {
          result.value = this._round(result.value);
        }
        result.reference = orderExam.resultTemplate
          .filter(template => template.fieldName == result.fieldName)[0].reference;
        return result;
      });

      return {
        examName: orderExam.name,
        date: order.createdAt,
        doctor: {
          firstName: orderDoctor.firstName,
          lastName: orderDoctor.lastName,
          document: orderDoctor.documentID,
        },
        resultDate: orderResult.createdAt,
        bacteriologist: {
          firstName: orderBacteriologist.firstName,
          lastName: orderBacteriologist.lastName,
          document: orderBacteriologist.documentID,
        },
        result,
      };
    });

    return {
      patient: {
        firstName: patient.firstName,
        lastName: patient.lastName,
        contactNumber: patient.contactNumber,
      },
      results: data,
    };
  }

  _round(number, decimals = 3) {
    return Math.round(number * (10 ** decimals)) / (10 ** decimals);
  }

  _getIds(arr, keyId) {
    return Object.keys(arr
      .map(item => item[keyId])
      .reduce((ids, id) => {
        if (ids[id]) {
          ids[id] += 1;
        } else {
          ids[id] = 1;
        }
        return ids;
      }, {}));
  }

  _findById(arr, id) {
    return arr.filter(item => item._id.toString() == id.toString())[0];
  }

  async _getUsersByIds(id) {
    const user = await usersService.getUserId({
      userId: id,
    });
    delete user.password;
    return user;
  }
}

module.exports = PDFService;