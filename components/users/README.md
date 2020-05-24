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
  "imageURL": "",
  "typeOfUser": "
}
```

Response code 201:

```js
{
  "data": username,
  "message": "user created"
}
```

Response code 400:

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
  },
  "message": "users listed"
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

### GET `api/users/?username`

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
  "message": "user updated"
}
```

Response code 400:

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
| mailService       | Name of function to send credential for email              |

### Methods

| Method       | Params         | Result | Description         |
| ------------ | -------------- | ------ | ------------------- |
| getResult    | string(id)     | Object | Get a result        |
| createResult | Result(result) | string | Create a new result |

#### ResultServices.getResult(id)

Get result by id.

The param `id` should be a string of ObjectId.

Return a object with the result data

```js
const resultServices = new ResultService();

const result = await resultService.getResult('5eb96c9ffc13ae25db00001a');

console.log(result);
/*
{
  "_id": "5eb96c9ffc13ae25db00001a",
  "createdAt": "2020-05-18T23:52:42.378Z",
  "updatedAt": "2020-05-19T00:33:19.703Z",
  "orderId": "5eb96c9ffc13ae25db00003c",
  "bacteriologistId":"5eb96c9ffc13ae25db000009"
  "results": [
    {
      "_id": "5eb96c9ffc13ae25db000061",
      "fieldName": "DVHD",
      "value": 0.6
    },
  ]
}
*/
```

#### ResultServices.createResult(result)

The param `result` should have `orderId`, `bacteriologistId` and `results` attributes.

Return a ObjectId.

```js
const resultServices = new ResultService();

const createdResultId = await  resultsService.createResult({
  'orderId': '5eb96c9ffc13ae25db00003c',
  'bacteriologistId':'5eb96c9ffc13ae25db000009'
  'results': [
    {
      'fieldName': 'DVHD',
      'value': 0.6
    },
  ]
});

console.log(createdResultId); // 5eb96c9ffc13ae25db00001a
```
