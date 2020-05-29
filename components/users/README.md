# Users

This component manage the users.

## Routes

```http
/api/users
```

### POST `/api/users`

Create a user record.

Data send in body as JSON.

```js
{
  "documentID": 0,
  "firstName": "",
  "lastName": "",
  "email": "",
  "contactNumber": 0,
  "isActive": "",
  "typeOfUser": "
}
```

Response code 201:

```js
{
  "data": users created succesfully,
  "message": "user created"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not found",
}
```

### GET `api/users/`

Retrieve a list of users

Response code 200:

```js
{
  "data": {
   "_id": "",
   "username": "",
   "lastName": "",
   "typeOfUser": "",
   "imageURL": "",
   "firstName": "",
   "lastName": "",
   "isActive": "",
   "documentID": "",
  },
  "message": "users listed"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not found",
}
```

### GET `api/users/:userId`

Retrieve a user

Response code 200:

```js
{
  "data": {
    "_id": "",
    "isActive": "",
    "documentID": 0,
    "firstName": "",
    "lastName":""
    "email": "",
    "contactNumber": 0,
    "typeOfUser" : "",
    "imageURL": "",
    "username": ""
    "createdAt": "",
    "updateAt": ""
  },
  "message": "user retrieved"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not found",
}
```

### GET `api/users/?username=?name=?typeOfUser=?email=`

Find test by slice of field do you want to find.

Response code 200:

```js
{
  "data": {
   "_id": "",
   "username": "",
   "lastName": "",
   "typeOfUser": "",
   "imageURL": "",
   "firstName": "",
   "lastName": "",
   "isActive": "",
  },
  "message": "users listed"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Users cannot found in these filters",
}
```

### PATCH `api/users/:userId`

Partial update a user, the server requires being provided with all the properties that can be subject to update

Data send in body as JSON.

```js
{
  "documentID": 0,
  "firstName": "",
  "lastName": "",
  "email": "",
  "contactNumber": 0,
  "isActive": "",
  "imageURL": "",
  "typeOfUser": "
}
```

Response code 201:

```js
{
  "data": username,
  "message": "Data updated"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not found",
}
```

## Users Service

### Attributes

| Attribute         | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| collection        | Name of predeterminate collection of data base             |
| mongoDB           | Instance of MongoLib                                       |
| generatePassword  | Name of function to generate random password for each user |
| UsernameGenerator | Name of function to generate a username                    |
| mailService       | Name of function to send credentials for email             |

### Methods

| Method      | Params                                            | Result | Description                                               |
| ----------- | ------------------------------------------------- | ------ | --------------------------------------------------------- |
| getUser     | string(username)                                  | User[] | Get a user to authentication layer                        |
| getUserId   | string(id)                                        | User[] | Get a user                                                |
| getUsers    |                                                   | User[] | Get a list of users                                       |
| getUsers    | { string(name, typeOfUser, isActive,documentID) } | User[] | Get users by name or typeOfUSer or isActive or DocumentID |
| createUser  | userModel(user)                                   | User[] | Create a new user                                         |
| createUsers | userModel(user)                                   | User[] | Create bulk users from CSV                                |
| updateUser  | string(id), object(user)                          | string | Update a user                                             |

#### UserService.getUser({ username })

Get user by username or email.

The param `username` should be a string of username or email.

Return a object with the user data

```js
const userService = new UsersService();

const user = await userService.getUser({ 'msnasel0@tripadvisor.com || mayne.snasel.4171' });

console.log(user);
/*
{
  _id: 5ec5ce16fc13ae1506000064,
  isActive: false,
  documentID: 21873837287,
  firstName: 'Mayne',
  lastName: 'Snasel',
  email: "msnasel0@tripadvisor.com",
  contactNumber: 624215528148,
  typeOfUser: "Administrator",
  username: 'mayne.snasel.4171',
  createdAt: 2020-05-28T15:36:57.064Z,
  updatedAt: '2020-05-28T17:58:55.489Z'
}
*/
```

#### UserService.getUser({userId})

Get user by id.

The param `id` should be a string of ObjectId.

Result is a object with user data.

```js
const userService = new UsersService();

const user = await userService.getUserId({ '5ec5ce16fc13ae1506000064' });

console.log(user);
/*
{
  _id: 5ec5ce16fc13ae1506000064,
  isActive: false,
  documentID: 21873837287,
  firstName: 'Mayne',
  lastName: 'Snasel',
  email: "msnasel0@tripadvisor.com",
  contactNumber: 624215528148,
  typeOfUser: "Administrator",
  username: 'mayne.snasel.4171',
  createdAt: 2020-05-28T15:36:57.064Z,
  updatedAt: '2020-05-28T17:58:55.489Z'
}
*/
```

#### UserService.getUsers()

Get all users

Result is a array that contains objects with users data.

```js
const userService = new UsersService();

const users = await usersService.getUsers();

console.log(users);
/*
[
      {
        _id: 5ec5ce16fc13ae1506000064,
        isActive: false,
        documentID: 21873837287,
        firstName: 'Mayne',
        lastName: 'Snasel',
        email: "msnasel0@tripadvisor.com",
        contactNumber: 624215528148,
        typeOfUser: "Administrator",
        username: 'mayne.snasel.4171',
        createdAt: 2020-05-28T15:36:57.064Z,
        updatedAt: '2020-05-28T17:58:55.489Z'
      },

],
*/
```

#### UserService.getUsers({ name || typeOfUser || documentID || isActive})

Get all users by name or typeOfUser or documentID or isActive.

Result is a array that contains objects with users data.

```js
const userService = new UsersService();

const users = await usersService.getUsers(
  { name: 'Mayne' } || { typeOfUser: 'Administrator' } || {
      documentID: 21873837287,
    } || { isActive: false }
);

console.log(users);
/*
[
      {
        _id: 5ec5ce16fc13ae1506000064,
        isActive: false,
        documentID: 21873837287,
        firstName: 'Mayne',
        lastName: 'Snasel',
        email: "msnasel0@tripadvisor.com",
        contactNumber: 624215528148,
        typeOfUser: "Administrator",
        username: 'mayne.snasel.4171',
        createdAt: 2020-05-28T15:36:57.064Z,
        updatedAt: '2020-05-28T17:58:55.489Z'
      },

],
*/
```

#### UserService.createUser({ user })

The param `user` should have `documentID`, `firstName` and `lastName` and `email` and `contactNumber` and `typeOfUser` attributes.

Return a ObjectId.

```js
const usersService = new UsersService();

const { createUserId: id, username } = await usersService.createUser({
  documentID: 21873837287,
  firstName: 'Mayne',
  lastName: 'Snasel',
  email: 'msnasel0@tripadvisor.com',
  contactNumber: 624215528148,
  typeOfUser: 'Administrator',
});

console.log((createUserId: id), username); // 5ec5ce16fc13ae1506000064 , mayne.snasel.4171
```

#### UserService.createUsers({ user })

The param `user` should have `documentID`, `firstName` and `lastName` and `email` and `contactNumber` and `typeOfUser` attributes.

Return a ObjectId for each User.

```js
const usersService = new UsersService();

const { createUserId: id, username } = await usersService.createUser({
  documentID: 21873837287,
  firstName: 'Mayne',
  lastName: 'Snasel',
  email: 'msnasel0@tripadvisor.com',
  contactNumber: 624215528148,
  typeOfUser: 'Administrator',
});

console.log((createUserId: id), username); // 5ec5ce16fc13ae1506000064 , mayne.snasel.4171
```
