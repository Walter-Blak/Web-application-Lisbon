// db.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://walterwhitehi3:Rodzinka1234!@firstcluster.rmigdp1.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection = null;

async function connectToDB(db) {
  if (!dbConnection) {
    await client.connect();
    dbConnection = client.db(`${db}`);
    console.log("✅ Connected to MongoDB!");
  }
  return dbConnection;
}

module.exports = { connectToDB };
