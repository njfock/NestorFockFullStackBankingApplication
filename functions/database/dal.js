
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:23Guatemala23@serverlessinstance0.x7kwsvi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }});
const dbName = 'badbank';
const collectionName = 'accounts';

async function connectCollection() {
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection;
}

async function updateCollection(data) {
  const collection = await connectCollection();
  await collection.updateOne({ _id: data._id }, { $set: {...data} });
  const response = await collection.find(data).toArray();
  client.close()
  return response;
}

async function getCollection(data) {
  const collection = await connectCollection();
  const response = await collection.find(data).toArray();
  client.close()
  return response;
}

async function getCollections() {
  const collection = await connectCollection();
  const response = await collection.find({}).toArray();
  client.close()
  return response;
}

async function putCollection(data) {
  let number = Math.floor(Math.random() * (9999999999 - 1000000000 + 1) + 1000000000)
  const collection = await connectCollection();
  const response = await collection.insertMany([{...data, number: number}]);
  client.close();
  return response;
}

module.exports = { getCollection, putCollection, updateCollection, getCollections };