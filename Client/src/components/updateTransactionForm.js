import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './button';

const UpdateTransactionForm = () => {
    const { envelopeId, transactionId } = useParams();
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions/${transactionId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch transaction data');
            }
            const transaction = await response.json();
            setDate(transaction.date);
            setAmount(transaction.amount);
            setRecipient(transaction.recipient);
          } catch (error) {
            setError(error.message);
          }
        };
    
        fetchTransaction();
    }, [envelopeId, transactionId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions/${transactionId}`, {
            method: 'PUT',
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
        console.error('There was an error updating the envelope!', error);
        }
    };

    return (
        <div className="update-transaction-form">
        <h2>Update Transaction</h2>
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
            {error && <p>Error: {error}</p>}
            <Button type="submit">Update Transaction</Button>
        </form>
        </div>
    );
};

export default UpdateTransactionForm;