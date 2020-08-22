const Transaction=require('../models/Transaction');

// desc get all transactions
// route GET/api/v1/transactions
//access public

exports.getTransactions=async (req,res,next)=>{
    try{
        const transactions=await Transaction.find();
        return res.status(200).json({
            success:true,
            count:transactions.length,
            data:transactions
        });
    }catch(err){
        return res.send(500).json({
            error:'Server error'
        });

    }
}
// desc add an transactions
// route POST/api/v1/transactions
//access public

exports.addTransactions=async (req,res,next)=>{
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

exports.deleteTransactions=async (req,res,next)=>{
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
}