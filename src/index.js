// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import './styles/global.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />,
  </React.StrictMode>
);
