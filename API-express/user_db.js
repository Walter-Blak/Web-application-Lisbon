const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://walterwhitehi3:Rodzinka1234!@firstcluster.rmigdp1.mongodb.net/?retryWrites=true&w=majority&appName=FirstCluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function add_user(user_name) {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const db = client.db('Users');
        const collection = db.collection('user');

        // Check if this user name is already exists in database
        const getUserName = await collection.findOne({userName: user_name});
        if (!getUserName){
            const data = new Date().toString();
            const result = await collection.insertOne({userName: `${user_name}`, date: `${data}`});
            console.log("Inserted user id: " , result.insertedId);
            return true;
        }
        else {
            return false;
        }
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

async function get_users_name() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const db = client.db('Users');
        const collection = db.collection('user');

        // Check if this user name is already exists in database
        const getUsersNames = await collection.find({}, { projection: { _id: 0, userName: 1 } }).toArray();
        
        // Konwertujemy wyniki na tablicę samych nazw użytkowników
        const userNames = getUsersNames.map(user => user.userName);
        
        console.log("Znalezione nazwy użytkowników:", userNames);
        return userNames
        
        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports={add_user, get_users_name};

