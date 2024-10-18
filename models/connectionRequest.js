const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId
    },
    status : {
        enum : {
            values : ["interested","ignored","rejected","accepted"]
        }
    }
},{timestamps : true}
)

connectionRequestSchema.pre("save", function (next) {
    const connectRequest = this;
    if (connectRequest.fromUserId.equals(connectRequest.toUserId)) {
        throw new Error("Connection request cannot be sent to yourself");
    }
    next();
});

connectionRequestSchema.index({fromUserId : 1,toUserId : 1})
const ConnectionRequestModel = mongoose.model('connectionrequest',connectionRequestSchema)

module.exports = ConnectionRequestModel
