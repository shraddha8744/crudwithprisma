const express=require("express");
const { createUser, loginUser } = require("../controllers/userController");
const encryptPassword = require("../helper/middleware/encryptPasswordMiddleware");
const checkUserAuthentication = require("../helper/middleware/checkUserAuthentication");
const authRouter=express.Router();

//---------------create userRoute with encryptPassword middleware -------------
authRouter.post("/createUser",encryptPassword,createUser)

///---------------------login user Route with checkuser(check authorized user)-------------
authRouter.post("/login",checkUserAuthentication,loginUser)

module.exports=authRouter