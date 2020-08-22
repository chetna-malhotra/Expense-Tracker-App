import React from 'react';
import {Header} from'./components/header';
import {Balance} from'./components/balance';
import {Income} from './components/income';
import {TransactionList} from './components/transactionList';
import {AddTransaction} from './components/addTransaction';
import {GlobalProvider} from './context/globalState';
import './App.css';


function App() {
  return (
    <GlobalProvider>
    <div className="shell">
      <Header/>
      <div className="container">
        <Balance />
        <Income/>
        <TransactionList/>
        <AddTransaction/>
      </div>
      
    </div>
    </GlobalProvider>
  );
}

export default App;
