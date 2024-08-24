import React from 'react';
import '../App.css';

function Card({ name, amount }) {
  return (
    <div className="flex-item">
      <h3>{name}</h3>
      <p>{amount}</p>
    </div>
  );
}

export default Card;