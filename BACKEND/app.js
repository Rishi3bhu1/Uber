const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const mongoose = require("mongoose");
const {initializeSocket} = require('./socket.js');
const dbURL = process.env.dbURL;

const userRouter = require("./routes/user.routes.js");
const captainRouter = require("./routes/captain.routes.js");
const mapsRouter = require("./routes/maps.routes.js");
const ridesRouter = require("./routes/ride.routes.js");
const cookieParser = require("cookie-parser")
main()
.then((res)=>{
    console.log("DB is successfully connected")
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(dbURL);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/users",userRouter)
app.use("/captain",captainRouter)
app.use("/maps",mapsRouter)
app.use("/rides",ridesRouter)

module.exports = app;