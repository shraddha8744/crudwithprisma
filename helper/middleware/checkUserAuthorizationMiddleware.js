const jwt = require('jsonwebtoken');
const config = require('../config/config');


const  checkAuthorization=(req,res,next)=>{
    const authorizationToken = req.headers.authorization;

    if(authorizationToken){
        try {
            const decoded = jwt.verify(authorizationToken, config.auth.SECRET_KEY);
            req.body.userId=decoded.userId
            next();
          } catch(err) {
            return res.json({
                success:false,
                message:"invalid token"
            })
            // err
          }

    }else{
        return res.json({
            success:false,
            message:"token is required"
        })
    }


}
module.exports={
    checkAuthorization
}


