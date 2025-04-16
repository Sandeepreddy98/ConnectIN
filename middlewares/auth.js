const jwt = require('jsonwebtoken');
const User = require('../models/user')

const userAuth= async (req,res,next) => {
    try{
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({message : "User not authorised"})
        }
        const userData = await jwt.verify(token,process.env.JWT)
        const user = await User.findById(userData._id)
        if(!user){
            throw new Error("User not found");
        }
        req.user = user
        next()
    }catch(err){
        res.status(400).json({message : err.message})
    }

}

module.exports = {
    userAuth
}