const express=require("express")
const app=express();
app.use(express.json())

const router = require("./routes/allRoute.js");
app.use("/",router)
module.exports=app