const User=require('../models/User');
const bcrypt =require('bcryptjs');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:'./config/config.env'});
const jwt=require('jsonwebtoken');

// desc get all transactions
// route GET/api/v1/users
//access public
//const {JWT_SECRET}=config;

exports.registerUser= (req,res,next)=>{
  const {username,email,password}=req.body;

    if(!username || !email || !password){
        return res.status(400).json({message:'Please enter all fields'});
    }
    User.findOne({ email}).then(user=>{
    if(user) return res.status(400).json({message:'You are already registered!'});
    const newuser= new User({
        username,
        email,
        password
    });
    //create salt and hash
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(newuser.password,salt,(err,hash)=>{
            if(err) throw err;
            newuser.password=hash;
            newuser.save().then(user=>{
                jwt.sign(
                    {id:user.id},
                    process.env.JWT_SECRET,
                    {expiresIn:3600},
                    (err,token)=>{
                        if(err) throw err;
                        res.json({
                            token,
                            user:{
                                id:user.id,
                                username:newuser.username
                            }
                        })

                    }
                )
              
            });
    });
    
        })
    },(err=>(next(err))));
    
    
    
}
// desc add an transactions
// route POST/api/v1/transactions
//access public
/**
exports.loginUser=async (req,res,next)=>{
    try{
        const {text,amount}=req.body;
        const transaction=await Transaction.create(req.body);
        return res.status(201).json({
            success:true,
            data:transaction
        });
    }catch(err){
        if(err.name==='ValidationError'){
            const messages=Object.values(err.errors).map(val=>val.message);
            return res.status(400).json({succes:false,error:messages});
        }
        else{
        return res.sendStatus(500).json({
            success:false,
            error:'Server error'
        
        });
    }
    }
}
// desc get all transactions
// route DEL/api/v1/transactions
//access public

exports.logoutUser=async (req,res,next)=>{
    try{
        const transaction=await Transaction.findById(req.params.id);
        if(!transaction){
            return res.status(404).json({
                succes:false,
                error:'Not Found'
            });
        }
        await transaction.remove();
        return res.status(200).json({
            success:true,
            data:{}
        });
    }catch(err){
        return res.send(500).json({
            error:'Server error'
    })
}
}*/