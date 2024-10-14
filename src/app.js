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
    try{
        const user = await new User(req.body).save()
        res.status(200).send("User added sucessfully")
    }catch(err){
        res.status(400).send("Failed to save user :" + err.message)
    }
})

//Feed API -GET /feed - get all users from User collection
app.get('/feed',async (req,res) => {
    try{
        const users = await User.find({})
        if(users.length === 0){
            res.status(404).send("Users not found")
        }else{
            res.send(users)
        }
    }catch(err){
        res.status(400).send("Something went wrong!")
    }
})

//GET /user - get user by email
app.get('/user',async (req,res) => {
    try{
        const user = await User.findOne({emailId : req.body.emailId})
        if(!user){
            res.status(404).send("User not found")
        }else{
            res.send(user)
        }
    }catch(err){
        res.status(400).send("Something went wrong!")
    }
})

//GET /userId - get user by Id
app.get('/userId', async (req,res) => {
    try{
        const user = await User.findById(req.body._id)
        if(!user){
            res.status(404).send("User not found")
        }else{
            res.send(user)
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//DELETE /user - Delete user by ID
app.delete('/user',async (req,res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.body._id)
        if(!deletedUser){
            res.status(404).send("User not found")
        }else{
            res.send("User deleted successfully")
        }
    }catch(err){
        res.status(400).send("Something went wrong")
    }
})

//PATCH /user - Update user data by Id
app.patch('/user',async (req,res) => {
    try{
        const user = await User.findByIdAndUpdate(req.body._id,req.body)
        if(!user){
            res.status(404).send("User not found")
        }else{
            res.send("User updated successfully")
        }
    }catch(err){
        res.status(400).send("Something went wrong!")
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

