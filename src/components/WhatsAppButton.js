import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = ({ isLoading }) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/5515991540730', '_blank');
  };

  // Se estiver carregando, não renderiza o botão
  if (isLoading) return null;

  return (
    <button 
      className="whatsapp-button"
      onClick={handleWhatsAppClick}
      aria-label="Contato WhatsApp"
    >
      <FaWhatsapp className="whatsapp-icon" />
      <span className="whatsapp-tooltip">Fale Conosco</span>
    </button>
  );
};

export default WhatsAppButton; 