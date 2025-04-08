const { connectToDB } = require('./db'); 

async function add_user(user_name) {

        // Connect the client to the server	(optional starting in v4.7)
        const db = await connectToDB("Users"); 
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

}

async function get_users_name() {

        // Connect the client to the server	(optional starting in v4.7)
        const db = await connectToDB("Users"); 
        const collection = db.collection('user');

        // Check if this user name is already exists in database
        const getUsersNames = await collection.find({}, { projection: { _id: 0, userName: 1 } }).toArray();
        
        // Konwertujemy wyniki na tablicę samych nazw użytkowników
        const userNames = getUsersNames.map(user => user.userName);
        
        console.log("Znalezione nazwy użytkowników:", userNames);
        return userNames

}



module.exports={add_user, get_users_name};

