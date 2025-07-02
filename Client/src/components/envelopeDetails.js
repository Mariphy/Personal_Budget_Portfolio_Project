import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Transactions from './transactions';
import Button from './button';
import { useNavigate } from 'react-router-dom';

const EnvelopeDetails = () => {
  const { envelopeId } = useParams();
  const [envelope, setEnvelope] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnvelope = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}`, {
            method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEnvelope(data[0]);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchEnvelope();
  }, [envelopeId]);

  const handleUpdate = () => {
    navigate(`/update-envelope/${envelopeId}`, { state: { envelope } });
  };

  const handleAddTransaction = () => {
    navigate(`/add-transaction/${envelopeId}`, { state: { envelope } });
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes/${envelopeId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Make sure there are no transactions in this category before deleting');
      }
      alert('Category deleted successfully!');
      navigate('/');
    } catch (error) {
      setError(error.message);
      console.error('There was an error deleting the category!', error);
    }
  };    

  return (
    <div className='envelope-details'>
      {error ? (
        <p>Error: {error}</p>
      ) : envelope ? (
        <div>
          <div className='frame-content'>
            <h2>{envelope.name}</h2>
            <p>{envelope.amount}</p>
            <Transactions envelopeId={envelopeId} />
            <button 
              className="add-transaction-btn" 
              onClick={handleAddTransaction}
              title="Add Transaction"
            >
              +
            </button>
          </div>
          <div>
            <Button onClick={handleUpdate}>Update Category</Button>
            <Button onClick={handleDelete}>Delete Category</Button> 
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EnvelopeDetails;