import React, {useState} from 'react';
import './App.css';
import Envelopes from './components/envelopes.js';
import Transactions from './components/transactions.js';
import Budget from './components/budget.js';

function App () {
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState(null);

  return (
    <div className="App">
      <header className="App-header"> 
        <h1>Personal Budget Manager</h1>
        <Budget />
      </header>
      <main>
        <Envelopes onSelectEnvelope={setSelectedEnvelopeId} />
        <Transactions envelopeId={selectedEnvelopeId} />
      </main>
      <footer></footer>
    </div>
  )
}

export default App;
