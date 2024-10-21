const express = require('express');
const { userAuth } = require('../middlewares/auth');
const User = require('../models/user');
const requestRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');
const ConnectionRequestModel = require('../models/connectionRequest');

requestRouter.post('/send/:status/:toUserId', userAuth, async (req, res) => {
    try {
        const allowedRequestTypes = ["ignored", "interested"]
        if (!allowedRequestTypes.includes(req.params.status)) {
            throw new Error('Connection request type not allowed');
            
        }
        const toUserData = await User.findById(req.params.toUserId);
        if(!toUserData){
            throw new Error("Connect requested user doesn't exist");
        }
        const existingConnectionrequest = await ConnectionRequestModel.findOne(
            {$or : [
                {fromUserId : req.user._id,toUserId : req.params.toUserId},
                {fromUserId : req.params.toUserId,toUserId : req.user._id}
            ]}
        )
        
        if(existingConnectionrequest){
            throw new Error("Connection request already exist");
        }
        const connectionRequest = await new ConnectionRequest({
            fromUserId : req.user._id,
            toUserId : req.params.toUserId,
            status : req.params.status
        })
        const connectionRequestData = await connectionRequest.save()
        res.json({
          message:
            req.params.status === "interested"
              ? `${req.user.firstName} is interested in ${toUserData.firstName}`
              : `${req.user.firstName} ignored ${toUserData.firstName}`,
          data: connectionRequestData,
        });
    } catch (err) {
        res.status(400).send(err.message)
    }
})

requestRouter.post('/review/:status/:requestId',userAuth,async (req,res) =>{
    try{
        const loggedInUser = req.user
        const {status,requestId} = req.params
        const allowedRequestTypes = ["accepted","rejected"]
        if(!allowedRequestTypes.includes(status)){
            return res.status(400).json({message : 'Status not valid'})
        }
        
        const connectionRequest = await ConnectionRequest.findOne({
            _id : requestId,
            toUserId : loggedInUser._id,
            status : "interested"
        })
        
        if(!connectionRequest){
            return res.status(404).json({message : "Connection request not found"})
        }
        connectionRequest.status = status
        const data = await connectionRequest.save()
        res.json({
            message : "Connection request " + status,
            data : data
        })
    }catch(err){
        res.status(400).send("Error: "+err.message)
    }
})

module.exports = requestRouter