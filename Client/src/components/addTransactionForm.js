import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button';

const AddTransactionForm = () => {
  const [date, setDate] = useState('');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [envelopeId, setEnvelopeId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ date, amount, recipient, envelope_id: envelopeId })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/'); // Redirect to the main page after successful submission
    } catch (error) {
      setError(error.message);
      console.error('There was an error adding the transaction!', error);
    }
  };

  return (
    <div className="new-transaction-form">
      <h2>Add New Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Amount:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Recipient:</label>
          <input 
            type="text" 
            value={recipient} 
            onChange={(e) => setRecipient(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Envelope ID:</label>
          <input 
            type="text" 
            value={envelopeId} 
            onChange={(e) => setEnvelopeId(e.target.value)} 
            required 
          />
        </div>
        {error && <p>Error: {error}</p>}
        <Button type="submit">Add Transaction</Button>
      </form>
    </div>
  );
};

export default AddTransactionForm;