# Orders

This component manager the orders.

## Routes

```http
/api/orders
```

### POST `/api/orders`

Create a new order and exams associated with the current order.

Data send in body as JSON.

```js
{
  "patientId": "",
  "doctorId": "",
  "examTypeId": ""
}
```

Response code 201:

```js
{
  "data": orderId,
  "message": "Patient test created"
}
```

Response code 400:

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "orders validation failed: xxxx"
}
```

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "### isn't a id",
}
```

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "xxxxId is required",
}
```

### GET `/api/orders/:orderId`

Retrieve a order by id.

Response code 200:

```js
{
  "data": {
    "_id": "",
    "name": "",
    "shortName": "",
    "isComplete": false,
    "doctor": {
      "documentID": 0,
      "firstName": "",
      "lastName": ""
    },
    "patient": {
      "firstName": "",
      "lastName": ""
    },
    "appointmentDate": "",
    "createdAt": ""
  },
  "message": "Patient test details retrieved"
}
```

```js
{
  "data": {
    "_id": "",
    "name": "",
    "shortName": "",
    "isComplete": true,
    "doctor": {
      "documentID": 0,
      "firstName": "",
      "lastName": ""
    },
    "patient": {
      "firstName": "",
      "lastName": ""
    },
    "appointmentDate": "",
    "createdAt": "",
    "resultId":""
  },
  "message": "User test details retrieved"
}
```

Response 404:

```js
{
  "statusCode": 404,
  "error": "Not Found",
  "message": "Test details could not be found"
}
```

### GET `/api/orders?patient=`

Retrieve a order by patient's id.

Response 200:

```js
{
  "data": [
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "isComplete": false,
      "appointmentDate": "",
      "createdAt": ""
    },
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "isComplete": true,
      "appointmentDate": "",
      "createdAt": "",
      "resultDate": "",
      "resultId": "",
    },
  ],
  "message": "Patient orders retrieved"
}
```

Response 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "There isn't test for this patient",
}
```

Responses 400:

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "### isn't a id"
}
```

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "patient or username query is required"
}
```

### GET `/api/orders?username=`

Retrieve a order by patient's username.

Response 200:

```js
{
  "data": [
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "isComplete": false,
      "appointmentDate": "",
      "createdAt": ""
    },
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "isComplete": true,
      "appointmentDate": "",
      "createdAt": "",
      "resultDate": "",
      "resultId": "",
    },
  ],
  "message": "Patient tests retrieved"
}
```

Response 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Patient not found",
}
```

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "There isn't test for this patient",
}
```

Response 400:

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "patient or username query is required"
}
```

### GET `/api/orders?patient=&isComplete=` `/api/orders?username=&isComplete=`

Retrieve a complete patient order.

Response 200:

```js
{
  "data": [
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "isComplete": true,
      "appointmentDate": "",
      "createdAt": "",
      "resultDate": "",
      "resultId": "",
    },
  ],
  "message": "Patient orders retrieved"
}
```

Response 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "There isn't test completed for this patient",
}
```

Responses 400:

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "### isn't a id"
}
```

```js
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "patient or username query is required"
}
```

## Order Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method      | Params              | Result  | Description                |
| ----------- | ------------------- | ------- | -------------------------- |
| createOrder | OrderModel(order)   | string  | Add a new order            |
| getOrder    | string(id)          | Order   | Get a order by id          |
| getOrders   | string({ patient }) | Order[] | Get patient's orders by id |

#### OrdersService.createOrder(order)

The param `order` should have `patientId`, `doctorId` and `examTypeId` attributes.

It returns a ObjectId.

```js
const orderService = new OrdersService();

const createdOrderId = orderService.createOrder({
  patientId: '5ec609a6fc13ae6f86000001',
  doctorId: '5ec609a6fc13ae6f86000002',
  examTypeId: '5ec609a6fc13ae6f86000004',
});

console.log(createdOrderId); // 5ec609a6fc13ae6f86000000
```

#### OrdersService.getOrder(id)

The param `id` should be a string of a ObjectId.

It returns a object with the order's data. See more in [order's schema](https://github.com/hyfi06/platzi-master-end-game-backend/tree/master/utils/schema#order-schema).

```js
const orderService = new OrdersService();

const order = orderService.getOrder('5ec609a6fc13ae6f86000000');

console.log(order);
/*{
  "_id": "5ec609a6fc13ae6f86000000",
  "isComplete": true,
  "createdAt": "2020-05-18T23:52:42.378Z",
  "updatedAt": "2020-05-19T00:33:19.703Z",
  "patientId": "5ec609a6fc13ae6f86000001",
  "doctorId": "5ec609a6fc13ae6f86000002",
  "resultId": "5ec609a6fc13ae6f86000004",
  "examTypeId": "5ec609a6fc13ae6f86000004",
}*/
```

#### OrdersService.getOrders({patient, isComplete})

The param `patient` should be a string of a ObjectId.

It returns a array with patient's orders.

```js
const orderService = new OrdersService();

const patientOrders = orderService.getOrders({
  patient: '5ec609a6fc13ae6f86000000',
  isComplete: true,
});

console.log(patientOrders);
/*[{
  "_id": "5ec609a6fc13ae6f86000000",
  "isComplete": true,
  "createdAt": "2020-05-18T23:52:42.378Z",
  "updatedAt": "2020-05-19T00:33:19.703Z",
  "patientId": "5ec609a6fc13ae6f86000001",
  "doctorId": "5ec609a6fc13ae6f86000002",
  "resultId": "5ec609a6fc13ae6f86000004",
  "examTypeId": "5ec609a6fc13ae6f86000004",
}]*/
```
