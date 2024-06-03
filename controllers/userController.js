const prisma =require("../db/config.js")
var jwt = require('jsonwebtoken');
const config=require("../helper/config/config.js")


const createUser=async(req,res)=>{
    const {username,email,password}=req.body
        let userExist=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(userExist){
            return res.json({
                success:false,
                message:"email alredy exist please enter another email"
            })
        }
        else{
            let createUser= await prisma.user.create({
                data:{
                   username:username,
                   email:email,
                   password:password
                }
            })
            
            if(createUser){
                return res.json({
                    success:true,
                    message:"user created successfully",
                    data:createUser


                })
            }
            else{
                return res.json({
                    success:false,
                    message:"somethine went wrong please try again"
                })
            }
        }

    
}
const loginUser=(req,res)=>{

    const token = jwt.sign({ userId:req.body.userId  },config.auth.SECRET_KEY );

    return res.json({

        success:true,
        message:"you are login successfully",
        token:token

    })


}
module.exports={
    createUser,
    loginUser
}