/* eslint-disable no-console */
const OrdersService = require('../../components/orders/ordersService');
const ResultsService = require('../../components/results/resultsService');
const ExamsService = require('../../components/exams/examsService');
const UserService = require('../../components/users/usersService');
const SecurityPassword = require('../../lib/password');
const oServices = new OrdersService();
const rServices = new ResultsService();
const eServices = new ExamsService();
const uService = new UserService();
const randomService = new SecurityPassword();

const randomResults = (orders, exams, users) => {

  const bacteriologists = users
    .filter(user => user.typeOfUser == 'bacteriologist');

  let index = -1;
  const results = orders
    .filter((order, i) => i % 3 != 1)
    .map((order) => {
      const exam = exams
        .filter(exam =>
          exam._id.toString() == order.examTypeId.toString()
        )[0];

      if (!exam) return 0;

      const values = exam.resultTemplate
        .map(template => {
          const value = template.reference == 'Negative' ?
            randomService.choiceOne(['Negative', 'Positive']) :
            randomService.randomNumber(100, 0, true);
          return {
            fieldName: template.fieldName,
            value,
          };
        });

      index += 1;

      return ({
        orderId: order._id,
        bacteriologistId: bacteriologists[index%bacteriologists.length]._id,
        results: values,
      });

    });

  return results;
};

const main = async () => {
  const orders = await oServices.getOrders({});
  const exams = await eServices.getExams({});
  const users = await uService.getUsers({});

  const results = randomResults(orders, exams, users);

  const resultsCreated = await results
    .map(async result => {
      const id = await rServices.createResult(result);
      console.log(`result ${id} created`);
    });

  Promise.all(resultsCreated).then(() => {
    console.log(`${resultsCreated.length} results created`);
    process.exit(0);
  });
};

main();
