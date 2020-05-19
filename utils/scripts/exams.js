/* eslint-disable no-console */
const ExamsService = require('../../components/exams/examsService');

const examsMock = require('../mocks/exams');
examsMock.forEach( exam => {
  delete exam._id;
  delete exam.createdAt;
  delete exam.updatedAt;
  exam.resultTemplate.forEach(template => {
    delete template._id;
  });
});

const eService = new ExamsService();

const main = async () => {
  const examsCreated = await examsMock.map(async exam => {
    const id = await eService.createExam(exam);
    console.log(`exam ${id} created`);
  });
  Promise.all(examsCreated).then(() => {
    console.log(`${examsCreated.length} exams created`);
    process.exit(0);
  });
};


main();