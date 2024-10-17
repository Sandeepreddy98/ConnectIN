const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');

authRouter.post('/signup',async (req,res) => {
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

authRouter.post('/login',async (req,res) => {
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

module.exports = authRouter