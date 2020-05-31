const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.dbName = DB_NAME;
  }

  /**
   * Get connection with mongodb
   * @returns {object} mongodb connection
   */
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }
          if (config.dev) {
            console.log('Connected succesfully to mongo');
          }
          resolve(this.client.db(this.dbName));
        });
      });
    }

    return MongoLib.connection;
  }

  /**
   * Get document by id
   * @param {string} collection collection name
   * @param {string} id object id
   * @returns {object} a document
   */
  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  /**
   * Ger document by username
   * @param {string} collection collection name
   * @param {object} query query for username field
   * @returns {object} document
   */
  getUsername(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ username: query });
    });
  }

  /**
   * Get all user by query
   * @param {string} collection collection name
   * @param {object} query mongo query
   * @returns {object[]} array of documents
   */
  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  /**
   * Create a new document
   * @param {string} collection collection name
   * @param {object} data data of new document
   * @returns {string} document created id
   */
  create(collection, data) {
    data['createdAt'] = new Date().toISOString();
    data['updatedAt'] = new Date().toISOString();
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  /**
   * Update document
   * @param {string} collection collection name
   * @param {string} id document id
   * @param {object} data data to update
   * @returns {string} document updated id
   */
  update(collection, id, data) {
    data['updatedAt'] = new Date().toISOString();
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id);
  }

  /**
   * Update many documents
   * @param {string} collection collection name
   * @param {object} query query for find documents to update
   * @param {object} data data to update
   * @returns {number} numbers of documents updated
   */
  updateMany(collection, query, data) {
    data['updatedAt'] = new Date().toISOString();
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateMany(query, { $set: data }, { upsert: true });
      })
      .then((result) => result.modifiedCount || query);
  }

  /**
   * Delete document by id
   * @param {string} collection collection name 
   * @param {string} id document id to delete
   * @returns document id deleted
   */
  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
