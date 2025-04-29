const express = require('express');
const mongodb = require('../config/database')
const app = express();
const cookieParser = require('cookie-parser');
require('dotenv').config()
const cors = require('cors');
const http = require('http');
const authRouter = require('../routes/auth');
const profileRouter = require('../routes/profile');
const requestRouter = require('../routes/request');
const userRouter = require('../routes/user');
const postRouter = require('../routes/post');
const initializeSocket = require('../utils/socket');

//CORS for handle cross origin requests
app.use(cors({
    origin : process.env.CLIENT_URI,
    credentials : true
}))
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser())

// Middleware to parse URL-encoded bodies (usually from forms)
app.use(express.urlencoded({ extended: true }));

app.use('/profile',profileRouter)
app.use('/request',requestRouter)
app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/',authRouter)

const server = http.createServer(app);
initializeSocket(server)

const connectMongo = async () => {
    try{
        await mongodb()
        console.log("Database connection established !!");
        server.listen(3000,() => {
            console.log("App is listening to : 3000");
        })
    }catch(err){
        console.log("Database connection failed!");
        
    }
}

connectMongo()