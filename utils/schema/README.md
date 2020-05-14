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
