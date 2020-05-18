# Schemas

## Users Schema

```js
{
  documentID: Number,
  firstName: String,
  lastName: String,
  email: String,
  contactNumber: Number,
  username: String,
  password: String,
  createdAt: Date,
  updateAt: Date,
  isActive: Boolean,
  imageURL: String
```

### documentID

It is a number. It models the id of user owner. It is required.

### firstName

It is string. It models the name of user who use the platform.

### lastName

It is string. It models the name of user who use the platform.

### email

It is string. It models the email of user who use the platform.

### contactNumber

It is a number. It models the contact number of user owner. It is required.

### username

It is string. It models the username of user who use the platform.

### password

It is string. It models the password of user who use the platform.

### createdAt, updatedAt

They are Number. They model the date of create and update a user.

### isActive

It is boolean. It models if the user is active or deactive in the platform.

### imageURL

It is string. It models the image url of user who use the platform and store picture from third party.

## Order Schema

```js
{
  patientId: ObjectId,
  doctorId: ObjectId,
  examTypeId:ObjectId,
  isComplete: Boolean,
  createdAt: Date,
  updatedAt: Date,
}
```

### patientId

It is a ObjectId of Mongo. It models the id of patient order owner. It is required.

### doctorId

It is a ObjectId of Mongo. It models the id of doctor who created the order. It is required.

### examTypeId

It is a ObjectId of Mongo. It models the id of test type. It is required.

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
  resultTemplate: [{
    fieldName: String,
    value: Number,
    reference: String,
  }],
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

## Results schema

```js
{
  orderId: ObjectId
  result: [{
    fieldName: String,
    value: Number,
    reference: String,
  }],
  createdAt: Date,
  updatedAt: Date,
}
```

### orderId

It is a ObjectId of Mongo. It models the id of order. It is required.

### result

It is a array. It contains objects with next structure:

```js
{
  fieldName: String,
  value: Number,
  reference: String,
}
```

#### fieldName

It is a strings. It models name of the measured property.

#### value

It is a number. It models the value of measured property.

#### reference

It is a string. It models the reference values for measured property.

### createdAt, updatedAt

They are Number. They model the date of create and update the results.
