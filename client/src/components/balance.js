import React,{useContext} from 'react'
import { GlobalContext } from '../context/globalState';

export const Balance = () => {
    const {transactions}=useContext(GlobalContext);
    const amounts = transactions.map(transaction => transaction.amount);
    console.log(amounts);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(0);
    return (
        <div>
            <h4>Your Balance</h4>
    <h1 id="balance">Rs. {total}</h1>
        </div>
    )
}
