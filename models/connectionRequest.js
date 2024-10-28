const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    status : {
        type : String,
        enum : {
            values : ["interested","ignored","rejected","accepted"]
        },
        required : true
    }
},{timestamps : true}
)

connectionRequestSchema.pre("save", function (next) {
    const connectRequest = this;
    if (connectRequest.fromUserId.toString() === connectRequest.toUserId.toString()) {
        throw new Error("Connection request cannot be sent to yourself");
    }
    next();
});

connectionRequestSchema.index({fromUserId : 1,toUserId : 1})
const ConnectionRequestModel = mongoose.model('connectionrequest',connectionRequestSchema)

module.exports = ConnectionRequestModel
