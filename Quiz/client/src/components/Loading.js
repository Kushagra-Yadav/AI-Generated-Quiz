import React from 'react';
import '../styles/Loading.css';

const LoadingBar = () => {
  return (
    <div>
      <div className="loading-bar-container">
        <div className="loading-bar"></div>
      </div>
      <div className="loading-text">Loading...</div>
    </div>
  );
};

export default LoadingBar;
