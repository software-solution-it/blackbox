import React from 'react';
import './MiniLoader.css';

const MiniLoader = () => {
  return (
    <div className="mini-loader-overlay">
      <div className="mini-loader-content">
        <div className="mini-loader-spinner">
          <div className="mini-loader-circle"></div>
          <div className="mini-loader-circle"></div>
          <div className="mini-loader-circle"></div>
        </div>
        <div className="mini-loader-text">Carregando...</div>
      </div>
    </div>
  );
};

export default MiniLoader; 