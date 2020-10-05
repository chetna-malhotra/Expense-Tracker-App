const express=require('express');
const dotenv=require('dotenv');
const colors=require('colors');
const morgan=require('morgan');
const path=require('path');
dotenv.config({path:'./config/config.env'});
const connectDB=require('./config/db');
const bodyParser=require('body-parser');
connectDB();

const transactions=require('./routes/transactions');
const users=require('./routes/users');
const auth=require('./routes/auth');
const app=express();
app.use(express.json());
if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));

}
app.use('/api/v1/transactions',transactions);
app.use('/api/v1/users',users);
app.use('/api/v1/auth',auth);

//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
    //set static folder
    app.use(express.static('client/build'));
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });

}
const PORT =process.env.PORT||5000;
app.listen(PORT,console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));