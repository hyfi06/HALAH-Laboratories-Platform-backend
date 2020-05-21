/* eslint-disable no-console */
const UsersService = require('../../components/users/usersService');
const { usersMock } = require('../mocks/users');

const uService = new UsersService();

const main = async () => {
  const usersCreated = await usersMock.map(async user => {
    const id = await uService.createUser({ user });
    console.log(`user ${id} created`);
  });

  Promise.all(usersCreated)
    .then(() => {
      console.log(`${usersCreated.length} users created`);
      process.exit(0);
    });
};

main();