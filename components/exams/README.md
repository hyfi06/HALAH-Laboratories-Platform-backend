# Exams

This component manager the orders.

## Routes

```http
/api/exams
```

## `/`

### GET

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

## `?short=`

Find test by shortName or slice shortName.

Response code 200:

```js
{
  "data": [
    {
      "_id": "",
      "resultTemplate": [
        {
          "fieldName": "",
        }
      ],
      "name": "",
      "shortName": "example",
      "description": "",
      "indications": "",
      "scheduledDays": 0,
    }
  ],
  "message": "test retrieved"
}
```

Response code 404:

```js
{
    "statusCode": 404,
    "error": "Not Found",
    "message": "Not found test",
}
```

## Exams Service

### Attributes

| Attribute  | Description                                    |
| ---------- | ---------------------------------------------- |
| collection | Name of predeterminate collection of data base |
| mongoDB    | Instance of MongoLib                           |

### Methods

| Method     | Params            | Result   | Description            |
| ---------- | ----------------- | -------- | ---------------------- |
| getExam    | string(id)        | Object   | Get a test             |
| getExams   |                   | Object[] | Get all test           |
| getExams   | { string(short) } | Object[] | Get test by short name |
| createExam | Exam(exam)        | string   | Create a new test      |

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
  "_id": "5eb96c9ffc13ae25db000060",
  "resultTemplate": [
    {
      "fieldName": "DVHD",
      "value": null,
      "reference": "Males:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-64 pg/mL\nFemales:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-78 pg/mL"
    }
  ],
  "createdAt": "2020-05-14T21:45:26.359Z",
  "updatedAt": "2020-05-14T21:45:26.359Z",
  "name": "1,25-Dihydroxyvitamin D, Serum",
  "shortName": "DHVD",
  "description": "As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia",
  "indications": "Fasting (4-hour preferred but not required)",
  "scheduledDays": 1,
  "resultWaitingDays": 2
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
    "_id": "5eb96c9ffc13ae25db000060",
    "resultTemplate": [
      {
        "fieldName": "DVHD",
        "value": null,
        "reference": "Males:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-64 pg/mL\nFemales:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-78 pg/mL"
      }
    ],
    "createdAt": "2020-05-14T21:45:26.359Z",
    "updatedAt": "2020-05-14T21:45:26.359Z",
    "name": "1,25-Dihydroxyvitamin D, Serum",
    "shortName": "DHVD",
    "description": "As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia",
    "indications": "Fasting (4-hour preferred but not required)",
    "scheduledDays": 1,
    "resultWaitingDays": 2
  }
]
*/
```

#### ExamServices.getExams({ short })

Get all test by short name, using the regular expression `/.*short.*/i`.

Result is a array that contains objects with test data.

```js
const examsService = new ExamsService();

const exams = await examsService.getExams({ short: 'VH' });

console.log(exams);
/*
[
  {
    "_id": "5eb96c9ffc13ae25db000060",
    "resultTemplate": [
      {
        "fieldName": "DVHD",
        "value": null,
        "reference": "Males:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-64 pg/mL\nFemales:\n  <16 years: 24-86 pg/mL\n  > or =16 years: 18-78 pg/mL"
      }
    ],
    "createdAt": "2020-05-14T21:45:26.359Z",
    "updatedAt": "2020-05-14T21:45:26.359Z",
    "name": "1,25-Dihydroxyvitamin D, Serum",
    "shortName": "DHVD",
    "description": "As a second-order test in the assessment of vitamin D status, especially in patients with renal disease Investigation of some patients with clinical evidence of vitamin D deficiency (eg, vitamin D-dependent rickets due to hereditary deficiency of renal 1-alpha hydroxylase or end-organ resistance to 1,25-dihydroxyvitamin D) Differential diagnosis of hypercalcemia",
    "indications": "Fasting (4-hour preferred but not required)",
    "scheduledDays": 1,
    "resultWaitingDays": 2
  }
]
*/
```

#### ExamServices.createExam(exam)

Create a new test.

The param `exam` should have `name`, `shortName` and `description` attributes.

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
