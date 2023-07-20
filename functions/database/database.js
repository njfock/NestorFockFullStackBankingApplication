
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

async function getCollection() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');
    return collection;
  }
  
async function getCollectionUser() {
  getCollection()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
}
async function putCollection(data) {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('users');
    const insertResult = await collection.insertMany([data]);
    console.log('Inserted documents =>', insertResult);
    return collection;
  }
  
async function putCollectionUser(data) {
    putCollection(data)
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
}
module.exports = { getCollectionUser, putCollectionUser };