const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middlewares/auth')

profileRouter.get('/view',userAuth,(req,res) => {
    try {
        res.send(req.user)
    } catch (err) {
        res.status(400).send("profile failed: " + err.message)
    }
})

module.exports = profileRouter

