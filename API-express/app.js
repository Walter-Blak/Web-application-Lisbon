const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const {add_user, get_users_name} = require("./user_db");

app.get('/addUser', async (req,res) =>{
    const query = req.query.userName;
    const result = await add_user(query);
    if (result){
        res.send("Your user was added");
    }else if(!result){
        res.send("This user name is already exists");
    }
})

app.get("/getUsers", async (req, res) => {
    const usersName = await get_users_name();
    res.send( usersName);
})

app.get("/", (req,res) => {
    res.send("Work");
})

app.listen(port, () =>{
    console.log(`Example app listening at http://localhost:${port}`);
})