import React, { useEffect, useState } from 'react';
import '../App.css';
import Card from './card';
import Button from './button';
import SkeletonCard from './skeletonCard';
import { useNavigate } from 'react-router-dom';

const Envelopes = ({ onSelectEnvelope }) => {
  const [envelopes, setEnvelopes] = useState([]);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnvelopes = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
    navigate(`/envelopes/${envelopeId}`);
  };

  const renderSkeletons = () => {
    return Array.from({ length: 6 }, (_, index) => (
      <SkeletonCard key={index} />
    ));
  };

  return (
    <div className="envelopes-container">
      <h2>Categories</h2>
      <div className="flex-container">
        {isLoading ? (
          renderSkeletons()
        ) : error ? (
          <div className="error-container">
            <p className="error-message">Error: {error}</p>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
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
          <div className="empty-state">
            <p>No categories found.</p>
            <Button onClick={handleAddEnvelope}>Create Your First Category</Button>
          </div>
        )}
      </div>
      {!isLoading && !error && envelopes.length > 6 && !showAll && (
        <Button onClick={handleShowAll}>Show All</Button>
      )}
      {!isLoading && !error && envelopes.length > 0 && (
        <Button onClick={handleAddEnvelope}>Add New Category</Button>
      )}
    </div>
  );
};

export default Envelopes;