import React, { useEffect, useState } from 'react';
import '../App.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const envelopeId = 12;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <div className="flex-container">
        {error ? (
          <p>Error: {error}</p>
        ) : transactions.length > 0 ? (
          transactions.map(transaction => (
            <div key={transaction.id}>
              <p>{transaction.date}</p>
              <p>{transaction.amount}</p>
              <p>{transaction.recipient}</p>
            </div>
          ))
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;