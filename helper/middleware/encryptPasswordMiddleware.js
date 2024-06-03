const bcrypt = require('bcrypt');



//-----encrypt user password
const encryptPassword=(req,res,next)=>{
    const {username,email,password}=req.body
    if(username && email && password){
        const saltRounds=8

       bcrypt.hash(password, saltRounds, function(err, hash) {
        if(err){
            return res.json({
                success:false,
                message:err
            })
        }
        else{
            req.body.password=hash
            next()
        }
        // Store hash in your password DB.
    });

    }
    else{
        return res.json({
            success:false,
            message:"All fields required"
        })
    }
}
    
    module.exports=encryptPassword
