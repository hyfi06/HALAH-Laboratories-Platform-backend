# Schemas

## Users Schema

## Order Schema

```js
{
  id_patient: Schema.Types.ObjectId,
  id_doctor: Schema.Types.ObjectId,
  is_complete: {
    type: Number,
    default: false,
  },
  created_at: Number,
  updated_at: Number,
}
```

### id_patient

It is a ObjectId of Mongo. It models the id of patient order owener. It is required.

### id_doctor

It is a ObjectId of Mongo. It models the id of doctor who created the order. It is required.

### is_complete

It is boolean. It models if the order has already been completed. It is false for default.

### create_at, update_at

They are Number. They model the timestamp of create and update a order.
