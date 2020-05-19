const ExamsService = require('../../components/exams/examsService');
const UsersService = require('../../components/users/usersService');
const OrdersService = require('../../components/orders/ordersService');

const uServices = new UsersService();
const eServices = new ExamsService();
const oServices = new OrdersService();

const randomOrder = (users, exams) => {
  let userIndex = 0;
  let examIndex = 0;
  const orders = [];
  while (orders.length < 50) {
    const patientId = users[userIndex]['_id'];
    userIndex = (userIndex + 1) % users.length;
    const doctorId = users[userIndex]['_id'];
    userIndex = (userIndex + 1) % users.length;
    const examTypeId = exams[examIndex]['_id'];
    examIndex = (examIndex + 1) % exams.length;

    orders.push({
      patientId,
      doctorId,
      examTypeId,
    });
  }
  return orders;
};

const main = async () => {
  const users = await uServices.getUsers({});
  const exams = await eServices.getExams({});
  
  const orders = randomOrder(users, exams);

  const ordersCreated = await orders.map(async order => {
    const id = await oServices.createOrder(order);
    console.log(`order ${id} created`);
  });

  Promise.all(ordersCreated).then(() => {
    console.log(`${ordersCreated.length} orders created`);
    process.exit(0);
  });
};

main();