const OrdersService = require('../../components/orders/ordersService');
const ResultsService = require('../../components/results/resultsService');
const ExamsService = require('../../components/exams/examsService');

const oServices = new OrdersService();
const rServices = new ResultsService();
const eServices = new ExamsService();

const randomResults = (orders, exams) => {
  const results = [];
  orders.forEach((order, i) => {
    if (i % 3 == 0) return;
    const exam = exams.filter(exam => exam._id.toString() == order.examTypeId.toString())[0];

    if(!exam) return;

    const resultsValues = exam.resultTemplate
      .map(template => {
        return {
          fieldName: template.fieldName,
          value: Math.random().toFixed(3) * 10,
        };
      });

    results.push({
      orderId: order._id,
      results: resultsValues,
    });
  });

  return results;
};

const main = async () => {
  const orders = await oServices.getOrders({});
  const exams = await eServices.getExams({});

  const results = randomResults(orders, exams);

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
