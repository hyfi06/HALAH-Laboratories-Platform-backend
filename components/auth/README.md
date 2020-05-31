# Auth

This component manager the authentication.

## Routes

```http
/api/auth
```

### POST `api/auth/sign-in`

Sign in with username and password

Response code 200:

```js
{
    "token": "",
    "user": {
        "id": "",
        "username": "",
        "typeOfUser": "",
        "isActive": boolean,
        "imageURL": "",
        "firstName": "",
        "lastName": "",
        "defaultPath": ""
    }
}
```

Response code 401:

```js
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Unauthorized"
}
```

Response code 401:

```js
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "apiKeyToken is required"
}
```

Response code 401:

```js
{
    "statusCode": 401,
    "error": "Unauthorized",
    "message": "Please verify username or password"
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

## ApiKeys Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method    | Params        | Result | Description |
| --------- | ------------- | ------ | ----------- |
| getApiKey | string(token) | Object | Get a token |

#### ExamServices.getExam(id)

Get token.

The param `id` should be a string of ObjectId.

ApiKey is a object with token data.

```js
const apiKeysService = new ApiKeysService();

const apiKey = await apiKeysService.getApiKey(
  '8c54592de87a6bd06cde3aeb5fab7c3ce986e8d3cab6d65060119b7d9380e59f'
);

console.log(apiKey);
/*
{
  _id: 5ec5d649c5664b2a0be22791,
  token: '8c54592de87a6bd06cde3aeb5fab7c3ce986e8d3cab6d65060119b7d9380e59f',
  createdAt: '2020-05-21T01:15:39.144Z',
  updatedAt: '2020-05-21T01:15:39.144Z'
}
*/
```
