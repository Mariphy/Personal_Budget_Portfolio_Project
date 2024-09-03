import React, { useEffect, useState } from 'react';
import '../App.css';
import Card from './card';
import Button from './button';
import { useNavigate } from 'react-router-dom';

const Envelopes = ({ onSelectEnvelope }) => {
  const [envelopes, setEnvelopes] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnvelopes = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/envelopes`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEnvelopes(data);
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchEnvelopes();
  }, []);

  const handleAddEnvelope = () => {
    navigate('/add-envelope');
  }

  const handleShowAll = () => {
    setShowAll(true);
  }

  const handleSelectEnvelope = (envelopeId) => {
    navigate(`/api/envelopes/${envelopeId}`);
  };

  return (
    <div>
      <h2>Categories</h2>
      <div className="flex-container">
        {error ? (
          <p>Error: {error}</p>
        ) : envelopes.length > 0 ? (
          envelopes.slice(0, showAll ? envelopes.length : 6).map(envelope => (
            <Card 
              key={envelope.id} 
              name={envelope.name} 
              amount={envelope.amount} 
              onClick={() => handleSelectEnvelope(envelope.id)} 
            />
          ))
        ) : (
          <p>No envelopes found.</p>
        )}
      </div>
      {!showAll && envelopes.length > 6 && (
        <Button onClick={handleShowAll}>Show All</Button>
      )}
      <Button onClick={handleAddEnvelope}>Add New Category</Button>
    </div>
  );
};

export default Envelopes;