import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Button from './button';

const UpdateEnvelopeForm = () => {
  const location = useLocation();
  const { envelope } = location.state;
  const [name, setName] = useState(envelope.name || '');
  const [amount, setAmount] = useState(envelope.amount || '');
  const [budgetId, setBudgetId] = useState(envelope.budget_id || '');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { envelopeId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ envelopeId, name, amount, budget_id: budgetId })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      navigate('/'); // Redirect to the main page after successful submission
    } catch (error) {
      setError(error.message);
      console.error('There was an error updating the envelope!', error);
    }
  };

  return (
    <div className="update-envelope-form">
      <h2>Update Category</h2>
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
        <Button type="submit">Update Category</Button>
      </form>
    </div>
  );
};

export default UpdateEnvelopeForm;