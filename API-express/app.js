const express = require('express');
const path = require('path');
const app = express();
const port = 3010;
const cors = require('cors');
const {add_user, get_users_name} = require("./user_db");
const {add_user_score_bigger, add_user_score_smaller, getUserScores_fromBigger, getUserScores_fromSmaller, sum_user_score} = require("./user_score_db");

app.use(cors());


app.get('/addUser', async (req, res) => {
    try {
        const query = req.query.userName;
        const result = await add_user(query);
        
        if (result) {
            res.send("1");
        } else {
            res.send("0");
        }
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/getUsers", async (req, res) => {
    const usersName = await get_users_name();
    res.send( usersName);
})

app.get("/", (req,res) => {
    res.send("Work");
})

app.get("/addScore", async (req, res) => {
    const query = req.query.score.split(',');
    let result;


    if (query[3] === "bigger") {
        result = await add_user_score_bigger(query[0], query[1], query[2]);
    } else if (query[3] === "smaller") {
        result = await add_user_score_smaller(query[0], query[1], query[2]);
    }

    if (result) {
        console.log(result); 
        res.send(result); 
    } else {
        res.status(500).send("Error while adding score");
    }
});

app.get("/addScoreSum", async(req,res) => {
    const query = req.query.score.split(',');
    result = await sum_user_score(query[0], query[1] ,query[2]);
    if (result) {
        console.log(result); 
        res.send(result); 
    } else {
        res.status(500).send("Error while adding score");
    }
})


app.get("/getScore" , async (req,res) => {
    const query = req.query.minigame.split(',');
    let result;
    if(query[1] === 'smaller'){
        result = await getUserScores_fromSmaller(query[0]);
    }
    if(query[1] === 'bigger'){
        result = await getUserScores_fromBigger(query[0]);
    }
    res.json(result);
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})