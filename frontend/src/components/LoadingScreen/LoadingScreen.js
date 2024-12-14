// LoadingScreen.js
import React from 'react';
import './LoadingScreen.css'; // Add this CSS file for styles if needed

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingScreen;
