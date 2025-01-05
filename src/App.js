import React from 'react';
import AppRoutes from './routes/AppRoutes';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

// Desabilitar logs em produção
if (process.env.NODE_ENV === 'production') {
  console.error = () => {};
  console.warn = () => {};
  console.log = () => {};
}

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <WhatsAppButton />
    </div>
  );
}

export default App;
