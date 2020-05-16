const ExamsService = require('../../components/exams/examsService');
const examsMock = require('../mocks/exams');

const eService = new ExamsService();

const init = async () => {
  await examsMock.forEach(async exam => {
    const id = await eService.createExam(exam);
    console.log(`exam ${id} created`);
  });
  return;
}


init();