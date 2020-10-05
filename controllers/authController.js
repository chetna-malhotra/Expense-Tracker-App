const User=require('../models/User');
const bcrypt =require('bcryptjs');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:'./config/config.env'});
const jwt=require('jsonwebtoken');
const auth=require('../middleware/Auth');

// desc get all transactions
// route GET/api/v1/users
//access public


exports.verifyUser= (req,res,next)=>{
  const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({message:'Please enter all fields'});
    }
    User.findOne({email}).then(user=>{
    if(!user) return res.status(400).json({message:'User does not exist'});
    bcrypt.compare(password,user.password)
    .then((isMatch)=>{
        if(!isMatch) return res.status(400).json({message:'Invalid'});
        jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                return res.status(200).json({
                    token:token,
                    user:{
                        id:user._id,
                        username:user.username
                    }
                });

            }
        )
    })
    },(err=>(next(err))));
    
    
    
}
exports.login=(req,res,next)=>{
    User.findById(req.user.id)
    .select('-password')
    .then(user=>{
        res.json(user)
    });
}
