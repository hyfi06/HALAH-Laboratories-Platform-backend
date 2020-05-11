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
