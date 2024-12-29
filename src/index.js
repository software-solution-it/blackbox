import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes/AppRoutes';
import './index.css';
import './styles/global.css';

// Google Tag Manager script
(function () {
  window.dataLayer = window.dataLayer || [];
  const script = document.createElement('script');
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=AW-16813181591";
  document.head.appendChild(script);

  script.onload = () => {
    window.gtag = function() {
      window.dataLayer.push(arguments);
    }
    window.gtag('js', new Date());
    window.gtag('config', 'AW-16813181591');
  };
})();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
