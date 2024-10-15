const mongoose = require('mongoose')

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
        match : [/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,'Please enter a valid email'],
        unique : true,
    },
    password : {
        type  :String,
        required : true,
        minLength : 8,
        maxLength : 12,
        match : [/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,'Password should have atleast 1 alphabet,1 number and 1 special characters']
    },
    age : {
        type : Number,
        required : true,
        min : 18
    },
    gender : {
        type : String,
        required : true,
        validate : (value) => {
            if(!['male','female','others'].includes(value)){
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
        validate : (arr) => {
            if(arr.length >=5){
                throw new Error("Photos more than 5 are not allowed")
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

const User = mongoose.model("User",userSchema);

module.exports = User