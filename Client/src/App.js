import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Envelopes from './components/envelopes.js';
import Budget from './components/budget.js';
import AddEnvelopeForm from './components/imputForm.js';
import EnvelopeDetails from './components/envelopeDetails.js';

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
            <Route path="/" element={
                  <Envelopes onSelectEnvelope={setSelectedEnvelopeId} />
              }
            />
            <Route path="/add-envelope" element={<AddEnvelopeForm />} />
            <Route path="/api/envelopes/:envelopeId" element={<EnvelopeDetails />} />
          </Routes>
        </main>
        <footer className="App-footer"></footer>
      </div>
    </Router>
  )
  };

export default App;
