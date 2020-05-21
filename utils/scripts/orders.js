/* eslint-disable no-console */
const ExamsService = require('../../components/exams/examsService');
const UsersService = require('../../components/users/usersService');
const OrdersService = require('../../components/orders/ordersService');

const uServices = new UsersService();
const eServices = new ExamsService();
const oServices = new OrdersService();

const randomOrder = (users, exams) => {
  const doctors = users
    .filter(user => user.typeOfUser == 'doctor');
  const patients = users
    .filter(user => user.typeOfUser == 'patient');

  let index = 0;
  const orders = [];
  while (orders.length < 300) {
    const patientId = patients[index % patients.length]['_id'];
    const doctorId = doctors[index % doctors.length]['_id'];
    const examTypeId = exams[index % exams.length]['_id'];
    index += 1;
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