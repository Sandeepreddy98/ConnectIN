const express = require('express');
const mongodb = require('../config/database')
const app = express();

const User = require('../models/user')

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (usually from forms)
app.use(express.urlencoded({ extended: true }));

//Signup api for posting the data to User collection
app.post('/signup',async (req,res) => {
    const userData = {
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        emailId : req.body.emailId,
        password : req.body.password,
        age : req.body.age,
        gender : req.body.gender
    }
    try{
        const user = await new User(userData).save()
        res.status(200).send("User added sucessfully")
    }catch(err){
        res.status(400).send("Failed to save user :" + err.message)
    }
})

const connectMongo = async () => {
    try{
        await mongodb()
        console.log("Database connection established !!");
        app.listen(3000,() => {
            console.log("App is listening to : 3000");
        })
    }catch(err){
        console.log("Database connection failed!");
        
    }
}

connectMongo()

