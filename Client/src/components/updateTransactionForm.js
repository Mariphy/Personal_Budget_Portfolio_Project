import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from './button';

const UpdateTransactionForm = () => {
    const { envelopeId, transactionId } = useParams();
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransaction = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions/${transactionId}`);
            if (!response.ok) {
              throw new Error('Failed to fetch transaction data');
            }
            const transaction = await response.json();
            const formattedDate = transaction[0].date.split('T')[0];
            const formattedAmount = parseFloat(transaction[0].amount.replace('$', ''));
            setDate(formattedDate);
            setAmount(formattedAmount);
            setRecipient(transaction[0].recipient);
            setIsLoading(false);
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
            <label htmlFor="date">Date:</label>
            <input 
                type="date"
                id="date"
                name="date" 
                value={date || ''} 
                onChange={(e) => setDate(e.target.value)} 
                required 
            />
            </div>
            <div>
            <label htmlFor="amount">Amount:</label>
            <input 
                type="number" 
                id="amount"
                name="amount"
                value={amount || ''} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
            />
            </div>
            <div>
            <label htmlFor="recipient">Recipient:</label>
            <input 
                type="text" 
                id="recipient"
                name="recipient"
                value={recipient || ''} 
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