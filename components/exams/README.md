# Exams

This component manager the exams.

## Routes

```http
/api/exams
```

### GET `api/exams`

Retrieve all test

Response code 200:

```js
{
  "data": [
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "description": "",
      "indications": "",
      "resultTemplate": [
        {
          "fieldName": "",
        }
      ],
      "scheduledDays": 0,
    }
  ],
  "message": "tests retrieved"
}
```

### GET `api/exams?name=`

Find test by slice of name or shortName.

Response code 200:

```js
{
  "data": [
    {
      "_id": "",
      "name": "",
      "shortName": "",
      "description": "",
      "indications": "",
      "resultTemplate": [
        {
          "fieldName": "",
        }
      ],
      "scheduledDays": 0,
    }
  ],
  "message": "tests retrieved"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "tests not found",
}
```

### GET `api/exams/:examId`

Retrieve a test

Response code 200:

```js
{
  "data": {
      "_id": "",
      "createdAt": "",
      "updatedAt": "",
      "name": "",
      "shortName": "",
      "description": "",
      "indications": "",
      "resultTemplate": [
        {
          "fieldName": "",
          "reference": ""
        }
      ],
      "scheduledDays": 0
  },
  "message": "test retrieved"
}
```

Response code 400:

```js
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "#### isn't a id",
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "test not found",
}
```

## Exams Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method     | Params           | Result   | Description                   |
| ---------- | ---------------- | -------- | ----------------------------- |
| getExam    | string(id)       | Object   | Get a test                    |
| getExams   |                  | Object[] | Get all test                  |
| getExams   | { string(name) } | Object[] | Get test by name or shortname |
| createExam | Exam(exam)       | string   | Create a new test             |

#### ExamServices.getExam(id)

Get test by id.

The param `id` should be a string of ObjectId.

Result is a object with test data.

```js
const examsService = new ExamsService();

const exam = await examsService.getExam('5eb96c9ffc13ae25db000060');

console.log(exam);
/*
{
  _id: '5eb96c9ffc13ae25db000060',
  createdAt: 2020-05-18T23:51:37.346Z,
  updatedAt: 2020-05-18T23:51:37.346Z,
  name: '1,25-Dihydroxyvitamin D, Serum',
  shortName: 'DHVD',
  description: 'As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia',
  indications: 'Fasting (4-hour preferred but not required)',
  resultTemplate: [
    {
      _id: '5eb96c9ffc13ae25db000061',
      fieldName: 'DVHD',
      reference: 'Males:\n<16 years: 24-86 pg/mL\n  > or =16 years: 18-64 pg/mL\nFemales:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-78 pg/mL'
    }
  ],
  scheduledDays: 1,
  resultWaitingDays: 2
}
*/
```

#### ExamServices.getExams()

Get all exams

Result is a array that contains objects with test data.

```js
const examsService = new ExamsService();

const exams = await examsService.getExams();

console.log(exams);
/*
[
  {
    _id: '5eb96c9ffc13ae25db000060',
    createdAt: 2020-05-18T23:51:37.346Z,
    updatedAt: 2020-05-18T23:51:37.346Z,
    name: '1,25-Dihydroxyvitamin D, Serum',
    shortName: 'DHVD',
    description: 'As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia',
    indications: 'Fasting (4-hour preferred but not required)',
    resultTemplate: [
      {
        _id: '5eb96c9ffc13ae25db000061',
        fieldName: 'DVHD',
        reference: 'Males:\n<16 years: 24-86 pg/mL\n  > or =16 years: 18-64 pg/mL\nFemales:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-78 pg/mL'
      }
    ],
    scheduledDays: 1,
    resultWaitingDays: 2
  }
]
*/
```

#### ExamServices.getExams({ name })

Get all test by short name, using the regular expression `/.*name.*/i`.

Result is a array that contains objects with test data.

```js
const examsService = new ExamsService();

const exams = await examsService.getExams({ name: 'VH' });

console.log(exams);
/*
[
  {
    _id: '5eb96c9ffc13ae25db000060',
    createdAt: 2020-05-18T23:51:37.346Z,
    updatedAt: 2020-05-18T23:51:37.346Z,
    name: '1,25-Dihydroxyvitamin D, Serum',
    shortName: 'DHVD',
    description: 'As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia',
    indications: 'Fasting (4-hour preferred but not required)',
    resultTemplate: [
      {
        _id: '5eb96c9ffc13ae25db000061',
        fieldName: 'DVHD',
        reference: 'Males:\n<16 years: 24-86 pg/mL\n  > or =16 years: 18-64 pg/mL\nFemales:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-78 pg/mL'
      }
    ],
    scheduledDays: 1,
    resultWaitingDays: 2
  }
]
*/
```

#### ExamServices.createExam(exam)

Create a new test.

The param `exam` should have `name`, `shortName` and `description` attributes.

See more attributes in [exams schema documentation](https://github.com/hyfi06/platzi-master-end-game-backend/tree/master/utils/schema#exams-schema).

The result is a ObjectId.

```js
const examsService = new ExamsService();

const examsId = await examsService.createExam({
  name: '1,25-Dihydroxyvitamin D, Serum',
  shortName: 'DHVD',
  description:
    'As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia',
});

console.log(examsId); // 5eb96c9ffc13ae25db000060
```
