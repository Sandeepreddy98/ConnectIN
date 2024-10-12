const express = require('express');
const { adminAuth, userAuth } = require('../middlewares/auth');
const app = express();

app.use('/admin',adminAuth)

app.get('/admin/getAllData',(req,res) => {
    res.send("All data fetched successfully!!")
})

app.get('/user/data',userAuth,(req,res) => {
    res.send("User data fetched successfully!!")
})

app.post('/user/login',(req,res) =>{
    res.send('User logged in succesfully!!')
})

app.listen(3000,() => {
    console.log("App is listening to : 3000");
})
