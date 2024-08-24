import React, { useEffect, useState } from 'react';
import '../App.css';
import Card from './card';


const Envelopes = () => {
  const [envelopes, setEnvelopes] = useState([]);  
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/envelopes`, {
        method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        setEnvelopes(data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);
  return (
    <div>
        <h2>Envelopes</h2>
        <div className = "flex-container">
            {envelopes.length > 0 ? (
            envelopes.map(envelope => (
                <Card key={envelope.id} name={envelope.name} amount={envelope.amount} />
            ))  
            ) : (
                <p>No envelopes found.</p>
            )}
        </div>
    </div>
    
  );
};

export default Envelopes;