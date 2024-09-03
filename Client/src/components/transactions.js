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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
  };

  return (
    <div>
      <h2>Transactions</h2>
      <div>
        {error ? (
          <p>Error: {error}</p>
        ) : transactions.length > 0 ? (
          <table className = "transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Amount</th>
                <th>Recipient</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.recipient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;