const { connectToDB } = require('./db'); 

async function add_user_score_bigger(username, minigame, userscore) {
    // Connect the client to the server (optional starting in v4.7)
    const db = await connectToDB("User_scores"); 
    const collection = db.collection('scores');

    // Get userName if exists from database and refresh result if it is better than before
    const getUser = await collection.findOne({ userName: username, miniGame: minigame });
    const data = new Date().toString();
    
    if (getUser) {
        console.log("First if");
        if (getUser.userName == username && getUser.miniGame == minigame) {
            const getUserScore = await collection.findOne({ userName: username, miniGame: minigame }, { score: 1, _id: 0 });
            const score = Number(getUserScore.score); // Convert score to a number
            const userScoreNum = Number(userscore); // Convert userscore to a number
            
            console.log(`"Second if" with score: ${score} and userscore: ${userScoreNum} bigger`);
            
            if (score < userScoreNum) {
                console.log("Third if");
                console.log(typeof(userScoreNum));
                const updateScore = await collection.updateOne({ "userName": username, "miniGame": minigame }, { $set: { score: userscore } });
                console.log(updateScore);
                return "Your score was updated, Good job 😎";
            } else {
                return "Unfortunately your last try was better 😓, it wasn't written to the database 😉";
            }
        }
    } else {
        const result = await collection.insertOne({ userName: `${username}`, miniGame: `${minigame}`, score: `${userscore}`, date: data });
        console.log("Inserted score id: ", result.insertedId);
        return `User ${username} score ${userscore} was added for ${minigame}`;
    }
}

async function add_user_score_smaller(username, minigame, userscore) {
    // Connect the client to the server (optional starting in v4.7)
    const db = await connectToDB("User_scores"); 
    const collection = db.collection('scores');

    // Get userName if exists from database and refresh result if it is better than before
    const getUser = await collection.findOne({ userName: username, miniGame: minigame });
    const data = new Date().toString();
    
    if (getUser) {
        console.log("First if");
        if (getUser.userName == username && getUser.miniGame == minigame) {
            const getUserScore = await collection.findOne({ userName: username, miniGame: minigame }, { score: 1, _id: 0 });
            const score = Number(getUserScore.score); // Convert score to a number
            const userScoreNum = Number(userscore); // Convert userscore to a number
            
            console.log(`"Second if" with score: ${score} and userscore: ${userScoreNum} smaller`);
            
            if (score > userScoreNum) {
                console.log("Third if");
                console.log(typeof(userScoreNum));
                const updateScore = await collection.updateOne({ "userName": username, "miniGame": minigame }, { $set: { score: userScoreNum } });
                console.log(updateScore);
                return "Your score was updated, Good job 😎";
            } else {
                return "Unfortunately your last try was better 😓, it wasn't written to the database 😉";
            }
        }
    } else {
        const result = await collection.insertOne({ userName: `${username}`, miniGame: `${minigame}`, score: `${userscore}`, date: data });
        console.log("Inserted score id: ", result.insertedId);
        return `User ${username} score ${userscore} was added for ${minigame}`;
    }
}

// instead of rewrite user score this function sum score like in slot machine sum total credits
async function sum_user_score(username, minigame, userscore){
    const db = await connectToDB("User_scores"); 
    const collection = db.collection('scores');

    // Get userName if exists from database and refresh result if it is better than before
    const getUser = await collection.findOne({ userName: username, miniGame: minigame });
    const data = new Date().toString();
    
    if (getUser) {
        console.log("First if");
        if (getUser.userName == username && getUser.miniGame == minigame) {
            const getUserScore = await collection.findOne({ userName: username, miniGame: minigame }, { score: 1, _id: 0 });
            const score = Number(getUserScore.score); // Convert score to a number
            const userScoreNum = Number(userscore) + score; // Convert userscore to a number
            const updateScore = await collection.updateOne({ "userName": username, "miniGame": minigame }, { $set: { score: userScoreNum } });
            return "Your score was updated, Good job 😎";
        }
    } else {
        const result = await collection.insertOne({ userName: `${username}`, miniGame: `${minigame}`, score: `${userscore}`, date: data });
        console.log("Inserted score id: ", result.insertedId);
        return `User ${username} score ${userscore} was added for ${minigame}`;
    }
}


async function getUserScores_fromBigger (minigame) {

        const db = await connectToDB("User_scores"); 
        const collection = db.collection('scores');
        console.log('get score bigger');
        
        const getMinigameScores = await collection
        .aggregate([
            { $match: { miniGame: minigame } },
            { $project: { _id: 0, userName: 1, score: { $toDouble: "$score" } } },  
            { $sort: { score: -1 } }
        ])
        .toArray();



        return getMinigameScores;

}
async function getUserScores_fromSmaller (minigame) {

    const db = await connectToDB("User_scores"); 
    const collection = db.collection('scores');
    console.log("get Score smaller");
    
    const getMinigameScores = await collection
    .aggregate([
        { $match: { miniGame: minigame } },
        { $project: { _id: 0, userName: 1, score: { $toDouble: "$score" } } }, 
        { $sort: { score: 1 } }
    ])
    .toArray();


    return getMinigameScores;

}


module.exports = {add_user_score_bigger, add_user_score_smaller, getUserScores_fromBigger, getUserScores_fromSmaller,sum_user_score}; 