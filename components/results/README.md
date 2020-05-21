# Results

This component manager the results.

## Routes

```http
/api/exams
```

### POST `/api/exams`

Create a results record.

Data send in body as JSON.

```js
{
  "orderId": "",
  "bacteriologistId":""
  "results": [
    {
      "fieldName": "",
      "value": 0
    }
  ]
}
```

Response code 201:

```js
{
  "data": resultId,
  "message": "result created"
}
```

Response code 400:

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

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Order not found",
}
```

### GET `api/results/:resultId`

Retrieve a result

Response code 200:

```js
{
  "data": {
    "_id": "",
    "createdAt": "",
    "updatedAt": "",
    "orderId": "",
    "bacteriologistId":""
    "results": [
      {
        "fieldName": "",
        "value": 0,
        "reference":""
      },
    ]
  },
  "message": "result retrieved"
}
```

## Results Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method | Params | Result | Description |
|--|--|--|--|
| getResult | string(id) | Object | Get a result |
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
