import React,{useContext,useEffect} from 'react';
import { GlobalContext } from '../context/globalState';
import {Transaction} from './transaction';

export const TransactionList = () => {
    const {transactions, getTransaction}=useContext(GlobalContext);
    useEffect(()=>{
        getTransaction();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    console.log(transactions);
    
    return (
        <>
        <h3>History</h3>
      <ul  className="list">
          
          {transactions.map(transaction=>(
               <Transaction key={transaction._id} transaction={transaction} />
          ))}
    
      </ul>
            
    </>
        
    )
}
