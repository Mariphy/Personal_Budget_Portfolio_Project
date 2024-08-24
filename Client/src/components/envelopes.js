import React, { useEffect, useState } from 'react';


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
        {envelopes.length > 0 ? (
          envelopes.map(envelope => (
            <div key={envelope.id}>
                <h3>{envelope.name}</h3>
                <p>{envelope.amount}</p>
            </div>
          ))  
        ) : (
            <p>No envelopes found.</p>
        )}
     
    </div>
    
  );
};

export default Envelopes;