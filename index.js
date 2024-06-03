
require("dotenv").config()
const port=process.env.PORT

//----import app file here

const app = require("./app");

app.listen(port,(err)=>{
    if(!err){
        console.log("server started port",port);
    }

})