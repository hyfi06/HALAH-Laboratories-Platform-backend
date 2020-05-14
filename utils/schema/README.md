# Schemas

## Users Schema

## Order Schema

```js
{
  patientId: ObjectId,
  doctorId: ObjectId,
  isComplete: Boolean,
  createdAt: Date,
  updatedAt: Date,
}
```

### patientId

It is a ObjectId of Mongo. It models the id of patient order owner. It is required.

### doctorId

It is a ObjectId of Mongo. It models the id of doctor who created the order. It is required.

### isComplete

It is boolean. It models if the order has already been completed. It is false for default.

### createdAt, updatedAt

They are Number. They model the date of create and update a order.

## Exams Schema

```js
{
  name: String,
  shortName: String,
  description: String,
  indications: String,
  resultTemplate: Object[],
  scheduledDays: Number,
  resultWaitingDays: Number,
  createdAt: Date,
  updatedAt: Date,
}
```

### name

It is a String. It models the name of clinical test. It is required.

### shortName

It is a String. It models the nomenclature of clinical test. It is required.

### description

It is a String. It models the test description for doctors. It is required.

### indications

It is a String. It models indications for patient.

### resultTemplate

It is a Array of results fields. It models the template for the results.

It contains the next structure:

```js
{
  fieldName: String,
  value: null,
  reference: String,
}
```

Example:

```js
{
  ...,
  resultTemplate: [
    {
        fieldName: 'Octanoic Acid, C8:0',
        value: null,
        reference: '<1 year: 7-63 nmol/mL\n1-17 years: 9-41 nmol/mL\n> or =18 years: 8-47 nmol/mL',
      },
      {
        fieldName: 'Decenoic Acid, C10:1',
        value: null,
        reference: '<1 year: 0.8-4.8 nmol/mL\n1-17 years: 1.6-6.6 nmol/mL\n> or =18 years: 1.8-5.0 nmol/mL',
      },
  ]
  ...,
}
```

### scheduledDays

It is a Number. It models the days that the patient must wait to be tested.

### resultWaitingDays

It is a Number. It models the days the result take.

### createdAt, updatedAt

They are Number. They model the date of create and update a test.
