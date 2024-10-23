import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Header = () => {
  return (
    <header className="App-header">
      
        <a className='title' href="/">
          Personal Budget Manager
        </a>
        <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/add-envelope" className="nav-link">Add Envelope</Link>
            <a href="https://github.com/Mariphy/Personal_Budget_Portfolio_Project" target="_blank" rel="noopener noreferrer" className="nav-link">
              GitHub
            </a>
         </nav>
      
        
    </header>
    
  );
};

export default Header;