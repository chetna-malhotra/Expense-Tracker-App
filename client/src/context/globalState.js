import React,{createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import axios  from 'axios';
import { token } from 'morgan';
//initial state
const initialstate={
    Transactions:{
        transactions: [],
        error:null,
        loading:true
    },
    User:{
        
            token:localStorage.getItem(token),
            isAuthenticated:false,
            isLoading:false,
            user:{}

        
        
    },
    Errors:{
        msg:{},
        status:null,
        id:null
    }
    
         
};

//Create content
export const GlobalContext= createContext(initialstate);
//Provider component
export const GlobalProvider=({ children})=>{
    const [state1 , dispatch1]=useReducer(AppReducer,initialstate.Transactions);
    const [state3, dispatch3]=useReducer(errorReducer,initialstate.Errors);
    const [state2 , dispatch2]=useReducer(authReducer,initialstate.User);
//Actions
async function loadUser(token){
        
        dispatch2({ type: 'USER_LOADING' });
        const config={
            headers:{'Content-Type':'application/json'}
        }
        if(token){
            config.headers['x-auth-token']=token;
        }
        const res=await axios.get('/api/v1/auth/user',config);
        try{
        
            dispatch2({
                type:'USER_LOADED',
                payload:res.data.data
            });       
    
        }catch(err){
            dispatch2({
                type:'AUTH_ERROR',
                payload:err.response.data.error
            });
    
        }

};

async function getTransaction(){
    try{
        const res=await axios.get('/api/v1/transactions');
        dispatch1({
            type:"GET_TRANSACTIONS",
            payload:res.data.data
        });       

    }catch(err){
        dispatch1({
            type:'TRANSACTION_ERROR',
            payload:err.response.data.error
        });

    }
}

async function deletetransaction(id){
    
    try{
        await axios.delete(`/api/v1/transactions/${id}`);
        dispatch1({
            type:'DELETE_TRANSACTION',
            payload:id
        });
    }
    catch(err){
        dispatch1({
            type:'TRANSACTION_ERROR',
            payload:err.response.data.error
        });
    }
   
}
async function addtransaction(transaction){
    const config={
        headers:{'Content-Type':'application/json'}
    }
    try{
       const res=await axios.post('/api/v1/transactions',transaction,config);
        dispatch1({
            type:'ADD_TRANSACTION',
            payload:res.data.data
        });
    }catch(err){
        dispatch1({
            type:'TRANSACTION_ERROR',
            payload:err.response.data.error
        });
    }
    
}
async function registerUser(user){
    const config={
        headers:{'Content-Type':'application/json'}
    }
    try{
       const res=await axios.post('/api/v1/auth/register',user,config);
        dispatch2({
            type:'REGISTER_SUCCESS',
            payload:res.data.data
        });
    }catch(err){
        dispatch2({
            type:'REGISTER_FAIL',
            payload:err.response.data.error
        });
    }
    
}
/*async function transactionLoading(transaction){
    const config={
        headers:{'Content-Type':'application/json'}
    }
    try{
       const res=await axios.post('/api/v1/transactions',transaction,config);
        dispatch1({
            type:'TRANSACTION_LOADING',
            payload:res.loading
        });
    }catch(err){
        dispatch1({
            type:'LOADING_ERROR',
            payload:err.response.data.error
        });
    }
    
}*/

async function loginUser(user){
    const config={
        headers:{'Content-Type':'application/json'}
    }
    try{
       const res=await axios.post('/api/v1/auth/login',user,config);
        dispatch2({
            type:'LOGIN_SUCCESS',
            payload:res.data.data
        });
    }catch(err){
        dispatch2({
            type:'LOGIN_FAIL',
            payload:err.response.data.error
        });
    }
    
}
    return (<GlobalContext.Provider value={{
        Transactions:{
        transactions:state1.transactions,
        error:state1.error,
        loading:state1.loading,
        },
        User:{
        
            token:state2.token,
            isLoading:state2.isLoading,
            isAuthenticated:state2.isAuthenticated,
            user:state2.user
        
        
    },
    Errors:{
        msg:state3.msg,
        status:state3.status,
        id:state3.id
    },       
        getTransaction,
        deletetransaction,
        addtransaction,
        loadUser,
        registerUser,
        loginUser
        
    }}>
        {children}
    </GlobalContext.Provider>);

}

