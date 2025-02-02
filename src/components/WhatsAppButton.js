import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

const WhatsAppButton = ({ isLoading, openModal }) => {
  const handleWhatsAppClick = () => {
    openModal('whatsapp');
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