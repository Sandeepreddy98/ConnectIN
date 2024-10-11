const express = require('express');
const app = express();

app.use('/user',(req,res,next) => {
    // res.send("Response 1!")
    next()
},(req,res,next) => {
    next()
    // res.send("Response 2!")
},(req,res) => {
    res.send("Response 3!")
})

app.listen(3000,() => {
    console.log("App is listening to : 3000");
})
