const express = require('express');
const app = express();


app.get('/test',(req,res) => {
    res.send({name : "Sandeep Reddy",age : 26})
})

app.post('/test',(req,res) => {
    res.send("Data saved successfully!")
})

app.delete('/test',(req,res) => {
    res.send("Data deleted successfully!")
})


app.listen(3000,() => {
    console.log("App is listening to : 3000");
})
