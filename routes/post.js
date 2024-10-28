const express = require('express');
const postRouter = express.Router();
const {userAuth} = require('../middlewares/auth');
const Post = require('../models/post')
const validator = require('validator');
const {isValidMongoId,validateEditPost} = require('../utils/validation');
const ConnectionRequestModel = require('../models/connectionRequest');
const user_safe_data = ["firstName","lastName","photos","skills","age","gender"]
const post_safe_data = ["title","description","url"]

postRouter.post('/create',userAuth,async (req,res) => {
    try{
        const {title,description,urls} = req.body
        const createdBy = req.user._id
        const post = await new Post({
            title,description,urls,createdBy
        }).save()
        res.status(200).json({
            data : post,
            message : "Post created successfully!"
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

postRouter.get("/feed",userAuth,async(req,res) => {
    try{
        const loggedInUser = req.user
        const connections = await ConnectionRequestModel.find({
            $or : [
                {toUserId : loggedInUser._id,status : "accepted"},
                {fromUserId : loggedInUser._id,status : "accepted"}
            ]
        })
        const connectionIds = connections.map(usr => usr.fromUserId === loggedInUser._id ? usr.toUserId : usr.fromUserId)
        const pageNumber = parseInt(req.query.page) || 1
        const pageLimit = parseInt(req.params.limit) || 10
        const feed = await Post.find({
            createdBy : {$in : connectionIds}
        }).skip((pageNumber-1)*pageLimit).limit(pageLimit).populate("createdBy",user_safe_data).select(post_safe_data)
        res.status(200).send({
            data : feed,
            message : "Feed fetched successfully"
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

postRouter.get('/:id',userAuth, async(req,res) => {
    try{
        const isValidPostId = isValidMongoId(req.params.id)
        if(!isValidPostId){
            throw new Error("PostId is not valid");
        }
        const post = await Post.findById(req.params.id)
        if(!post){
            res.status(404).json({
                message : "Post not found"
            })
        }
        res.status(200).json({
            data : post,
            message : 'Post fecthed successfully!'
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

postRouter.patch('/:id',userAuth,async (req,res) => {
    try{
        const isValidPostId = isValidMongoId(req.params.id)
        if(!isValidPostId){
            throw new Error("Invalid PostId");
        }
        if(!validateEditPost(req)){
            throw new Error("Invalid post edit request");
        }
        const post = await Post.findOne({_id : req.params.id,createdBy : req.user._id})
        Object.keys(req.body).forEach(key => post[key] = req.body[key])
        const updated = await post.save()
        res.status(200).json({
            data : updated,
            message : `${req.user.firstName} your post updated successfully`
        })
         
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

postRouter.delete('/:id',userAuth,async(req,res) =>{
    try{
        const isValidPostId = isValidMongoId(req.params.id)
        if(!isValidPostId){
            throw new Error("Invalid PostId");
        }
        const post = await Post.findOneAndDelete({_id : req.params.id,createdBy : req.user._id})
        if(!post){
            res.status(404).json({
                message : 'Invalid delete request.'
            })
        }
        res.status(200).json({
            message : 'Post deleted successfully!'
        })
    }catch(err){
        res.status(400).json({
            message : err.message
        })
    }
})

module.exports = postRouter