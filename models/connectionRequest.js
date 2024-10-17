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

connectionRequestSchema.pre('save', function (next){
    const data = this
    if(data.fromUserId === data.toUserId){
        throw new Error({message : "Connection request cannot be sent to yourself"});
    }
})

connectionRequestSchema.index({fromUserId : 1,toUserId : 1})
const ConnectionRequestModel = mongoose.model('connectionrequest',connectionRequestSchema)

module.exports = ConnectionRequestModel
