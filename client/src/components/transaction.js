import React,{useContext} from 'react';
import {GlobalContext} from'../context/globalState';

export const Transaction = ({transaction}) => {
    const{ deletetransaction }=useContext(GlobalContext);
    const sign=transaction.amount<0?'-':'+';
    return (
        <div>
               <li className={transaction.amount<0?"minus":"plus"}>
               {transaction.text} 
                    <span>
                   {sign} $ {Math.abs(transaction.amount)}
                   
                   </span>
               <button className="delete-btn" onClick={()=>deletetransaction(transaction._id)}>
                x</button>
             </li> 
        </div>
    )
}
