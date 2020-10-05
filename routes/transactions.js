const express=require('express');
const router=express.Router();
const {getTransactions,addTransactions,deleteTransactions}=require('../controllers/transController');
const auth =require('../middleware/Auth');
router.route('/')

.get(getTransactions)
.post(auth,addTransactions);

router.route('/:id')
.delete(auth,deleteTransactions);
module.exports= router;