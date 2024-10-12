const express = require('express');
// const { adminAuth, userAuth } = require('../middlewares/auth');
const app = express();

app.get('/user/data',(req,res) => {
    try{
        throw {message : "Something went wrong"}
        // res.send("User data fetched successfully!!")
    }catch(err){
        // console.log(err);
        
        res.status(500).send(err.message)
    }
})

app.use('/',(err,req,res,next) => {
    console.log("hello");
    
    if(err){
        res.status(500).send(err.message)
    }
})

app.listen(3000,() => {
    console.log("App is listening to : 3000");
})
