import React, {useState, useEffect} from 'react';
import './App.css';
import Envelopes from './components/Envelopes';
import Transactions from './components/Transactions';
import Budget from './components/Budget';

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
