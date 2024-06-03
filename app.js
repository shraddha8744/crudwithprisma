const express=require("express")
const app=express();
app.use(express.json())

const router = require("./routes/allRoute.js");
app.use("/",router)
app.use("/test",(req,res)=>{
    res.send(`<h1>server started</h1>`)

})
module.exports=app