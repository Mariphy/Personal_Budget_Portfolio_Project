import React from 'react';
import '../App.css';

function Card({ name, amount, onClick }) {
  return (
    <div className="flex-item" onClick={onClick} style={{ cursor: 'pointer' }}>
      <h3>{name}</h3>
      <p>{amount}</p>
    </div>
  );
}

export default Card;