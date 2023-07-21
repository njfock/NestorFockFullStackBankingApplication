
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://root:23Guatemala23@serverlessinstance0.x7kwsvi.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const dbName = 'badbank';

async function getCollection(data) {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('accounts');
  const response = await collection.find(data).toArray();
  client.close()
  return response;
}

async function getCollections() {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('accounts');
  const response = await collection.find({}).toArray();
  client.close()
  return response;
}

async function updateCollection(data) {
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('accounts');
  await collection.updateOne({ _id: data._id }, { $set: {...data} });
  const response = await collection.find(data).toArray();
  client.close()
  return response;
}

async function updateCollectionAccount(data) {
  const response = await updateCollection(data)
  return response
}

async function getCollectionAccount(data) {
  const response = await getCollection(data)
  return response
}

async function getCollectionAccounts() {
  const response = await getCollections()
  return response
}

async function putCollection(data) {
    console.log('putCollection', data)
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('accounts');
    await collection.insertMany([data]);
    return collection;
  }
  
async function putCollectionUser(data) {
  console.log('data', data)
    putCollection(data)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
}
module.exports = { getCollectionAccount, putCollectionUser, updateCollectionAccount, getCollectionAccounts };