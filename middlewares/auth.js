const adminAuth = (req,res,next) => {
    const token = 'xyz';
    const isAdminAuthorized = token === 'xyz'
    if(isAdminAuthorized){
        console.log("Admin Authorised!!")
        next()
    }else{
        res.status(401).send("Admin not authorised!")
    }
}

const userAuth= (req,res,next) => {
    const token = 'abc'
    const isUserAuthorized = token === 'abc'
    if(isUserAuthorized){
        console.log("User Authorised!!");
        
        next()
    }else{
        res.status(401).send("User not authorised!")
    }
}

module.exports = {
    adminAuth,
    userAuth
}