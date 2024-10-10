const express = require('express');

const app = express()

app.use("/",(req,res) => {
    res.send("Namaste NodeJS")
})

app.listen(3000,() => {
    console.log("App is listening to : 3000");
})
