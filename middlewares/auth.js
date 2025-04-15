const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth= async (req,res,next) => {
    try{
        const {token} = req.cookies
        const userData = await jwt.verify(token,process.env.JWT)
        const user = await User.findById(userData._id)
        if(!user){
            throw new Error("User not found");
        }
        req.user = user
        next()
    }catch(err){
        res.status(400).send("Err : " + err.message)
    }

}

module.exports = {
    userAuth
}