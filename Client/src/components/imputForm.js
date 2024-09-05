import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './button';

const AddEnvelopeForm = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [budgetId, setBudgetId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, amount, budget_id: budgetId })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/'); // Redirect to the main page after successful submission
    } catch (error) {
      setError(error.message);
      console.error('There was an error creating the envelope!', error);
    }
  };

  return (
    <div className="new-envelope-form">
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
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
          <label>Budget ID:</label>
          <input 
            type="text" 
            value={budgetId} 
            onChange={(e) => setBudgetId(e.target.value)} 
            required 
          />
        </div>
        {error && <p>Error: {error}</p>}
        <Button type="submit">Add Category</Button>
      </form>
    </div>
  );
};

export default AddEnvelopeForm;