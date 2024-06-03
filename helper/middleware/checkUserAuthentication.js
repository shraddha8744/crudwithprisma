// const prisma = require('../db/config');
const prisma=require("../../db/config")
const checkUserAuthentication=async(req,res,next)=>{
    const {email,password}=req.body
    if(email && password){
        const user=await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(user){
            const match = await bcrypt.compare(password, user.password);
    
        if(match) {
            req.body.userId = user.id;
            next()
            //login
        }
        else{
            return res.json({
                success:false,
                message:"enter correct password"
            })
        }

        }else{
            return res.json({
                success:false,
                message:"user not found"
            })
        }
        
    

    }
    else{
        return res.json({
            sucess:false,
            message:"all fields reuired"
        })
    }
   
        //...
   
}
module.exports=checkUserAuthentication
