const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const mongoose = require("mongoose");
const dbURL = process.env.dbURL;
const PORT = process.env.PORT;
const userRouter = require("./routes/user.route.js");
const captainRouter = require("./routes/captain.route.js");
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

app.listen(PORT,()=>{
    console.log(`The server is listening at PORT ${PORT}`)
})