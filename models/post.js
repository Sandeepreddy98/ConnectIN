const mongoose = require('mongoose');
const validator = require('validator');

const postRequestSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
        minLength : 2,
        maxLength : 150,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 1000
    },
    url : {
        type : [String],
        validate : (arr) => {
            if(arr.length > 5){
                throw new Error("Photos more than 5 are not allowed")
            }
            const isInvalidUrl = arr.every(url => validator.isURL(url))
            if(!isInvalidUrl){
                throw new Error("Invalid Photos");
                
            }
        }
    },
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User",
        index : 1
    }
},{timestamps : true})

const Post = mongoose.model('post',postRequestSchema)

module.exports = Post