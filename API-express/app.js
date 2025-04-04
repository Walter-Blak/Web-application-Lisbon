const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const cors = require('cors');
const {add_user, get_users_name} = require("./user_db");
const {add_user_score} = require("./user_score_db");

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
    const result = await add_user_score(query[0], query[1], query[2]);
    if (result){
        res.send(result);
    }
    
    // res.send(`${query[0]} ${query[1]} ${query[2]}`)
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})