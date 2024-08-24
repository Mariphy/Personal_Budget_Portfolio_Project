import React from 'react';
import './App.css';
import Envelopes from './components/envelopes';
import Transactions from './components/transactions';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <h1>Personal Budget Manager</h1>
      </header>
      <main>
        <Envelopes />
        <p>Transactions:</p>
        <Transactions />
      </main>
      <footer></footer>
    </div>
  );
}

export default App;
