import React, { useEffect, useState } from 'react';
import '../App.css';
import Card from './Card';

const Envelopes = ({ onSelectEnvelope }) => {
  const [envelopes, setEnvelopes] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <div>
      <h2>Envelopes</h2>
      <div className="flex-container">
        {error ? (
          <p>Error: {error}</p>
        ) : envelopes.length > 0 ? (
          envelopes.map(envelope => (
            <Card 
              key={envelope.id} 
              name={envelope.name} 
              amount={envelope.amount} 
              onClick={() => onSelectEnvelope(envelope.id)} 
            />
          ))
        ) : (
          <p>No envelopes found.</p>
        )}
      </div>
    </div>
  );
};

export default Envelopes;