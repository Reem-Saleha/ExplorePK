import React from 'react';
import '../styles/spinner.css';

const Spinner = () => (
  <div className="spinner-wrapper">
    <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Loading...</span>
    </div>
    <p className="mt-3 spinner-text">Loading...</p>
  </div>
);

export default Spinner;
