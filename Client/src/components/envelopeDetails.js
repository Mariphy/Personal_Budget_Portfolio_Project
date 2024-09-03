import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Transactions from './transactions';

const EnvelopeDetails = () => {
  const { envelopeId } = useParams();
  console.log(envelopeId);
  const [envelope, setEnvelope] = useState(null);
  const [error, setError] = useState(null);

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

  return (
    <div>
      {error ? (
        <p>Error: {error}</p>
      ) : envelope ? (
        <div>
          <h2>{envelope.name}</h2>
          <p>{envelope.amount}</p>
          
          <Transactions envelopeId={envelopeId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EnvelopeDetails;