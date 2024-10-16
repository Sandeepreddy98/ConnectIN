const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
        maxLength : 10
    },
    lastName : {
        type : String
    },
    emailId : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        //Mongoose level regex validation for checkign valid email
        // match : [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,'Please enter a valid email'],
        //using validator package
        validate : function(email){
            if(!validator.isEmail(email)){
                throw new Error("Enter a valid email")
            }
        },
        unique : true,
    },
    password : {
        type  :String,
        required : true,
        // minLength : 8,
        // maxLength : 12,
        //Mongoose  level regex match for strong password
        // match : [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password should have atleast 1 alphabet,1 number and 1 special characters']
        //Validator package validation
        validate :function (password){
            if(!validator.isStrongPassword(password)){
                throw new Error("Please enter strong password");
            }
        }
    },
    age : {
        type : Number,
        required : true,
        min : 18
    },
    gender : {
        type : String,
        required : true,
        // //JS level validation for check element is present in that array.
        // validate : (value) => {
        //     if(!['male','female','others'].includes(value)){
        //         throw new Error('Please enter a valid gender')
        //     }
        // }
        //Using validator
        validate : function (gender) {
            if(!validator.isIn(gender,['male','female','others'])){
                throw new Error('Please enter a valid gender')
            }
        }
    },
    about : {
        type : String,
        default : function () {
            return `This is a default about of ${this.firstName || ''} ${this.lastName || ''}`
        }
    },
    photos : {
        type : [String],
        default : function (){
            if(this.gender === 'male'){
                return ['https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg']
            }else if(this.gender === 'female'){
                return ['https://t4.ftcdn.net/jpg/08/06/57/87/240_F_806578723_04VaC2SNtBv9vWWibVBAKx8iJCbSNt0H.jpg']
            }else{
                return ['https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg']
            }
        },
        //JS Level Validations
        validate : (arr) => {
            if(arr.length >=5){
                throw new Error("Photos more than 5 are not allowed")
            }
        },
        validate : function(pics){
            const isValidURL = pics.every(pic => validator.isURL(pic))
            if(!isValidURL){
                throw new Error('Invalid Photos')
            }
        }
    },
    skills:{
        type : [String],
        validate : (arr) => {
            if(arr.length >=20){
                throw new Error("Skills can't be more than 20")
            }
        }
    }
    
},{ timestamps: true })

userSchema.methods.getJWT = async function (){
    const user = this
    const token = await jwt.sign({_id : user._id},'wkhgfiyst6yei2043uJHC,xzmMFEQHTeg',{expiresIn : '1d'})
    return token
}

userSchema.methods.validatePassword = async function (password){
    const user = this
    const isUserValid = await bcrypt.compare(password,user.password)
    if(!isUserValid){
        throw new Error("Invalid Credentials");
    }
    return isUserValid
}

const User = mongoose.model("User",userSchema);

module.exports = User