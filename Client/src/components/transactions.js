import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Transactions = ({envelopeId}) => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!envelopeId) return;

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

  const handleEdit = (transactionId) => {
    navigate(`/envelopes/${envelopeId}/transactions/${transactionId}/update`);
  }

  const handleDelete = async (transactionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}/transactions/${transactionId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Make sure there are no transactions in this category before deleting');
      }
      alert('Transaction deleted successfully!');
      navigate('/'); // Redirect to the home page or another page after deletion
    } catch (error) {
      setError(error.message);
      console.error('There was an error deleting the category!', error);
    }
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
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td>{formatDate(transaction.date)}</td>
                  <td>{transaction.amount}</td>
                  <td>{transaction.recipient}</td>
                  <td className='edit-button' onClick={()=> handleEdit(transaction.id)}>Edit</td>
                  <td className='delete-button' onClick={()=>handleDelete(transaction.id)}>Delete</td>
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