const express=require('express');
const router=express.Router();
const  Auth=require('../middleware/Auth')

const {verifyUser,login}=require('../controllers/authController');
router.route('/')
.post(verifyUser);
router.route('/user')
.get(Auth,login);
module.exports= router;