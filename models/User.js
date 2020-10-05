const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:[true, 'Please add valid username']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'Please add valid email']
    },
    password:{
        type:String,
        required:[true,'Please add a password']
    },
    register_date:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('User',UserSchema);