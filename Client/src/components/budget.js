import React, { useEffect, useState } from 'react';
import '../App.css';

const Budget = () => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalBudget = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/budget/1`, {
          method: 'GET'
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTotalBudget(data); 
      } catch (error) {
        setError(error.message);
        console.error('There was an error fetching the total budget!', error);
      }
    };

    fetchTotalBudget();
  }, []);

  return (
    <div>
      <h2>Total Budget: ${totalBudget.amount}</h2>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default Budget;