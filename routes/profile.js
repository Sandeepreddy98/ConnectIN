const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth')
const { validateEditProfileData } = require('../utils/validation')
const bcrypt = require('bcrypt')

profileRouter.get('/view',userAuth,(req,res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.status(400).send("profile view failed: " + err.message)
    }
})

profileRouter.patch('/edit',userAuth,async (req,res) => {
    try{
        if(!validateEditProfileData(req)){
            throw new Error("Invalid edit request");
        }
        const loggedInUser = req.user
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key])
        await loggedInUser.save()
        res.send({
            message : `${loggedInUser.firstName}, your profile updated successfully.`,
            data : loggedInUser
        })
    }catch(err){
        res.status(400).send("profile updated failed : "+err.message)
    }
})

profileRouter.patch('/password',userAuth,async (req,res) => {
    try{
        const loggedInUser = req.user
        if(!validateEditPassword(req)){
            throw new Error("Invalid password change request");
        }
        const passwordHash = await bcrypt.hash(req.user.password,10)
        loggedInUser.password = passwordHash
        await loggedInUser.save()
        res.send("Password updated successfully")
    }catch(err){
        res.status(400).send("password update failed :" +err.message)
    }
})

module.exports = profileRouter

