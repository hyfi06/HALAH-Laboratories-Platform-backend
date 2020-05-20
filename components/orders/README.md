# Orders

This component manager the orders.

## Routes

```http
/api/orders
```

### POST `/`

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
  "message": "order created"
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

### GET `/:orderId`

Retrieve a order by id.

Response code 200:

```js
{
  "data": {
    "_id": ObjectId,
    "isComplete": Boolean,
    "createdAt": Date,
    "updatedAt": Date,
    "patientId": ObjectId,
    "doctorId": ObjectId
  },
  "message": "order retrieved"
}
```

## Order Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method      | Params            | Result | Description       |
| ----------- | ----------------- | ------ | ----------------- |
| createOrder | OrderModel(order) | string | Add a new order   |
| getOrder    | string(id)        | Order  | Get a order by id |

#### OrdersService.createOrder(order)

The param `order` should have `patientId` and `doctorId` attributes.

Return a ObjectId.

```js
const orderService = new OrdersService();

const createdOrderId = orderService.createOrder({
  patientId: '5eb96c9ffc13ae25db000014',
  doctorId: '5eb96c9ffc13ae25db000008',
  examTypeId: '5eb96c9ffc13ae25db000060',
});

console.log(createdOrderId); // 5eb96c9ffc13ae25db00003c
```

#### OrdersService.getOrder(id)

The param `id` should be a string of a ObjectId.

```js
const orderService = new OrdersService();

const order = orderService.getOrder('5eb96c9ffc13ae25db00003c');

console.log(order);
/*{
  "_id": "5eb96c9ffc13ae25db00003c",
  "isComplete": true,
  "createdAt": "2020-05-18T23:52:42.378Z",
  "updatedAt": "2020-05-19T00:33:19.703Z",
  "patientId": "5eb96c9ffc13ae25db000014",
  "doctorId": "5eb96c9ffc13ae25db000008",
  "resultId": "5eb96c9ffc13ae25db00001a",
  "examTypeId": "5eb96c9ffc13ae25db000060",
}*/
```
