
const bcrypt =require('bcryptjs');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:'./config/config.env'});
const jwt=require('jsonwebtoken');

function Auth(req,res,next){
    const token=req.header('x-auth-token');

    //check for token
    if(!token){
        res.status(401).json({
            message:'Unauthorized'
        })
    }
    try{
    // Verify Token
    const decoded =jwt.verify(token,process.env.JWT_SECRET);
    //Add user from payload

    req.user=decoded;
    next();
}catch(err){
    res.status(400).json({message:'invalid token'});
}

}
module.exports=Auth;