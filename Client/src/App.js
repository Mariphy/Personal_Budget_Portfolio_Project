import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Envelopes from './components/envelopes.js';
import Budget from './components/budget.js';
import AddEnvelopeForm from './components/inputForm.js';
import EnvelopeDetails from './components/envelopeDetails.js';
import UpdateEnvelopeForm from './components/updateEnvelopeForm.js';
import Header from './components/header.js';
import AddTransactionForm from './components/addTransactionForm.js';

function App () {
  const [selectedEnvelopeId, setSelectedEnvelopeId] = useState(null);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Budget />
          <Routes>
            <Route path="/" element={
                  <Envelopes onSelectEnvelope={setSelectedEnvelopeId} />
              }
            />
            <Route path="/add-envelope" element={<AddEnvelopeForm />} />
            <Route path="/update-envelope/:envelopeId" element={<UpdateEnvelopeForm />} />
            <Route path="/add-transaction/:envelopeId" element={<AddTransactionForm />} />
            <Route path="/api/envelopes/:envelopeId" element={<EnvelopeDetails />} />
          </Routes>
        </main>
        <footer className="App-footer"></footer>
      </div>
    </Router>
  )
  };

export default App;
