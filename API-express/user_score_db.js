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

async function add_user_score(username, minigame, userscore){
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        
        const db = client.db('User_scores');
        const collection = db.collection('scores');

        // Get userName if exists from database and refresh result if it is better than before
        const getUser = await collection.findOne({userName: username, miniGame: minigame});
        if (getUser){
            console.log("First if");
            if (getUser.userName == username && getUser.miniGame == minigame){
                console.log("Second if");
                const getUserScore = await collection.findOne({userName: username, miniGame: minigame}, {score: 1, _id: 0});
                const score = getUserScore.score;
                if (score < userscore){
                    console.log("Third if");
                    const updateScore = await collection.updateOne({"userName" : username, "miniGame" : minigame}, {$set: {score: userscore}});
                    console.log(updateScore);
                    return "Your score was updated, Good job 😎";
                }else {
                    return "Unfortunately your last try was better 😓, it wasn't wrote to database 😉";
                }
            }
        }else {
            const result = await collection.insertOne({userName: `${username}`, miniGame: `${minigame}`, score: `${userscore}`});
            console.log("Inserted score id: ", result.insertedId);
            return `User ${username} score ${userscore} was added for ${minigame} `;
        }


        
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

module.exports = {add_user_score}; 