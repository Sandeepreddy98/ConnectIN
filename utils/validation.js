const validator = require('validator');

const signUpValidation = (body) => {
    if(validator.isStrongPassword(validator)){}
}

const validateEditProfileData = (req,res) => {
    const allowedFieldsToEdit = ["firstName","lastName","emailId","age","gender","about","photos","skills"]
    const isEditFieldsAllowed = Object.keys(req.body).every(key => allowedFieldsToEdit.includes(key))
    return isEditFieldsAllowed
}

const validateEditPassword = (req,res) => {
    const isEditPasswordAllowed = Object.keys(req.body).every(key => key === 'password')
    return isEditPasswordAllowed
}

module.exports = {
    validateEditProfileData,
    validateEditPassword
}