import React, { useEffect, useState } from 'react';
import '../App.css';

const Transactions = ({envelopeId}) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!envelopeId) return;

    console.log('Fetching transactions for envelope ID:', envelopeId);

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions`, {
          method: 'GET'
        });
        if (response.status === 404) {
          setNotFound(true);
          setTransactions([]);
          return;
        }
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTransactions(data);
        setNotFound(false);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchTransactions();
  }, [envelopeId]);

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