const express = require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user')
const userRouter = express.Router();
const user_safe_data = ["firstName","lastName","photos","skills","age","gender"]

userRouter.get('/requests/received',userAuth,async (req,res) => {
    try{
        const loggedInUser = req.user
        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id,
            status : "interested"
        }).populate("fromUserId",user_safe_data)
        res.json({
            message : "Data fetched successfully",
            data : connectionRequests
        })
    }catch(err){
        res.status(400).send("Error" + err.message)
    }
})


userRouter.get("/connections",userAuth,async (req,res) => {
    try{
        const loggedInUser = req.user
        const connections = await ConnectionRequest.find({
            status : "accepted",
            $or : [
                {toUserId : loggedInUser._id},
                {fromUserId : loggedInUser._id}
            ]
        }).populate("fromUserId",user_safe_data).populate("toUserId",user_safe_data)
        const data = connections.map(usr => usr.fromUserId._id.toEquals(loggedInUser._id) ? usr.fromUserId : usr.toUserId)
        res.json({
            message : "Connections fetched successfully",
            data
        })
    }catch(err){
        res.status(400).send("message : "+err.message)
    }
})

userRouter.get("/feed",userAuth,async (req,res) => {
    try{
        const loggedInUser = req.user
        const page = parseInt(req.query.page) || 1
        let limit = parseInt(req.query.limit) || 10
        limit > 50 ? limit = 50 : limit
        const connectionReqestsofLoggedInUser = await ConnectionRequest.find({
            $or : [
                {toUserId : loggedInUser._id},
                {fromUserId : loggedInUser._id}
            ]
        })
        const hideFromFeed = new Set()
        connectionReqestsofLoggedInUser.forEach((user) => {
            hideFromFeed.add(user.fromUserId)
            hideFromFeed.add(user.toUserId)
        })
        const feed = await User.find({
            $and:[
                {_id : {$nin : Array.from(hideFromFeed)}},
                {_id : {$ne : loggedInUser._id}}
            ]
        }).skip((page-1)*limit).limit(limit).select(user_safe_data)
        res.json({
            message : "Feed fetched successfully",
            data : feed
        })
    }catch(err){
        res.status(400).json({message : err.message})
    }
})

module.exports = userRouter