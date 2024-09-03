import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Envelopes from './components/envelopes.js';
import Transactions from './components/transactions.js';
import Budget from './components/budget.js';
import AddEnvelopeForm from './components/imputForm.js';

function App () {
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState(null);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Personal Budget Manager</h1>
          <Budget />
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Envelopes onSelectEnvelope={setSelectedEnvelopeId} />
                  <Transactions envelopeId={selectedEnvelopeId} />
                </>
              }
            />
            <Route path="/add-envelope" element={<AddEnvelopeForm />} />
          </Routes>
        </main>
        <footer></footer>
      </div>
    </Router>
  )
  };

export default App;
