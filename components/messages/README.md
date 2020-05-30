# Messsages

This component manager the messages.

## Routes

```http
/api/messsages
```

### POST `/api/messsages`

Create a message record.

Data send in body as JSON.

```js
{
  "patientId": "",
  "messageText": ""
}
```

Response code 201:

```js
{
  "data": createMessageId,
  "message": "Message created"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not Found",
}
```

### GET `api/messages?patientId=`

Retrieve a message by patient's id.

Response 200:

```js
{
  "data": {
    "_id": "",
    "createdAt": "",
    "updatedAt": "",
    "read": false,
    "patientId":""
    "messageText": ""
    ]
  },
  "message": "Messages retrieved"
}
```

## Messages Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method         | Params          | Result | Description          |
| -------------- | --------------- | ------ | -------------------- |
| getMessages    | string(id)      | Object | Get a messages       |
| createMessages | Message(Object) | string | Create a new message |

#### MessagesService.getMessages(id)

Get messages by id.

The param `id` should be a string of ObjectId.

Return a object with the message data

```js
const messagesService = new MessagesService();

const messages = await messagesService.getMessages('5ecfda99da80860ec24ea439');

console.log(messages);
/*
[
  {
    _id: 5ed1ddabc0f381982068a797,
    createdAt: 2020-05-30T04:14:35.043Z,
    updatedAt: 2020-05-30T04:14:35.043Z,
    read: false,
    patientId: 5ecfda99da80860ec24ea439,
    messageText: 'Listo tu resultado 4'
  }
]
*/
```

#### MessagesService.createMessages(message)

The param `message` should have `patientId`, `messageText` attributes.

Return a ObjectId.

```js
const messagesService = new MessagesService();

const createUserId = await messagesService.createMessages({
  patientId: '5ecfda99da80860ec24ea439',
  messageText: 'Listo tu resultado 4',
});

console.log(createUserId); // 5ed1ddabc0f381982068a797
```
