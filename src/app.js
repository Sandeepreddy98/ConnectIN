const express = require('express');
const mongodb = require('../config/database')
const app = express();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const validator = require('validator')
const cookieParser = require('cookie-parser');
const { userAuth } = require('../middlewares/auth');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser())

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
        const user = await User.findOne({emailId : req.body.emailId})
        if(!user){
            throw new Error("Invalid Credentials");
        }
        await user.validatePassword(req.body.password)
        const token  = await user.getJWT()
        res.cookie('token',token,{ expires: new Date(Date.now() + 24 * 60 * 60 * 1000)})
        res.send('User logged in successfully')
    }catch(err){
        res.status(400).send("Login failed : "+err.message)
    }
})

app.get('/profile',userAuth, async (req, res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.status(400).send("profile failed: " + err.message)
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

