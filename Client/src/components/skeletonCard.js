import React from 'react';
import '../App.css';

const SkeletonCard = () => {
  return (
    <div className="flex-item skeleton-card">
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-amount"></div>
    </div>
  );
};

export default SkeletonCard;