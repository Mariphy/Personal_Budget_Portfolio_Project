import React from 'react';
import '../App.css';

const Footer = () => {
  return (
    <footer className="App-footer">
       <div className="social-icons">
        <a href="https://github.com/Mariphy/Personal_Budget_Portfolio_Project" target="_blank" rel="noopener noreferrer">
          <img
            src={`${process.env.PUBLIC_URL}/github-mark.png`}
            alt="GitHub"
            className="github-icon"
          />
        </a>
      </div>  
      <p>&copy; {new Date().getFullYear()} Personal Budget Manager. Licensed under the MIT License.</p>
    </footer>
  );
};

export default Footer;