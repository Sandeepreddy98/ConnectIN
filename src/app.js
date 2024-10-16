const express = require('express');
const mongodb = require('../config/database')
const app = express();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const validator = require('validator')

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (usually from forms)
app.use(express.urlencoded({ extended: true }));

//Signup api for posting the data to User collection
app.post('/signup',async (req,res) => {
    try{
        // const allowedFields = ["firstName","lastName","emailId","password","age","gender","about","photos","skills"];
        // const areFieldsAllowed = Object.keys(req.body).every(key => allowedFields.includes(key))
        // if(!areFieldsAllowed){
        //     throw new Error('Fields are not allowed to create user')
        // }
        const {firstName,lastName,emailId,password,age,gender,about,photos,skills} = req.body
        const passwordHash = await bcrypt.hash(password,10)
        const user = await new User({
            firstName,lastName,emailId,password : passwordHash,age,gender,about,photos,skills
        }).save()
        res.status(200).send("User added sucessfully")
    }catch(err){
        res.status(400).send("Failed to save user :" + err.message)
    }
})

//Login API for authenticating the user.
app.post('/login',async (req,res) => {
    try{
        const isEmailExist = await User.findOne({emailId : req.body.emailId})
        if(!isEmailExist){
            throw new Error("Invalid Credentials");
        }
        const isUserValid = await bcrypt.compare(req.body.password,isEmailExist.password)
        if(!isUserValid){
            throw new Error("Invalid Credentials");
        }
        res.send('User logged in successfully')
    }catch(err){
        res.status(400).send("Login failed : "+err.message)
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
app.patch('/user/:userID',async (req,res) => {
    try{
        const allowedFields = ["password","about","photos","skills"];
        const isFieldAllowedToUpdate = Object.keys(req.body).every(key => allowedFields.includes(key))
        if(!isFieldAllowedToUpdate){
            throw new Error('Some of the fields are not allowed to update')
        }
        const user = await User.findByIdAndUpdate(req.params.userID,req.body,{returnDocument : "after",runValidators : true})
        if(!user){
            res.status(404).send("User not found")
        }else{
            res.send("User updated successfully")
        }
    }catch(err){
        res.status(400).send("Update failed: "+err.message)
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

