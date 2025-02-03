import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ModalComponent.css';

const ModalComponent = ({ closeModal }) => {
  const [userName, setUserName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxTucbL04sMf0QOsg8SJh7v0kkhIff0mAgxEt_SjBL1TwlAKs7eqGqXOZDwyvhxH_oq/exec';

  const handleClose = () => {
    closeModal();
  };

  const formatWhatsApp = (value) => {
    const numbers = value.replace(/\D/g, '');
    let formatted = numbers;
    if (numbers.length > 0) {
      formatted = `(${numbers.slice(0,2)}`;
      if (numbers.length > 2) {
        formatted += `) ${numbers.slice(2,7)}`;
        if (numbers.length > 7) {
          formatted += `-${numbers.slice(7,11)}`;
        }
      }
    }
    return formatted;
  };

  const validateWhatsApp = (number) => {
    const cleanNumber = number.replace(/\D/g, '');
    if (cleanNumber.length !== 11) return false;
    const ddd = parseInt(cleanNumber.substring(0, 2));
    if (ddd < 11 || ddd > 99) return false;
    return true;
  };

  const handleWhatsAppInput = (e) => {
    const formatted = formatWhatsApp(e.target.value);
    setWhatsappNumber(formatted);
    const isValid = validateWhatsApp(formatted);
    setIsValidNumber(isValid);
    setWhatsappError(isValid ? '' : 'Número inválido');
  };

  const saveToGoogleSheets = async (data) => {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: data.timestamp,
          name: data.name,
          whatsapp: data.whatsapp,
          source: data.source
        })
      });
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNumber || !userName.trim() || isSubmitting) return;

    setIsSubmitting(true);

    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    const timestamp = new Date().toISOString();

    const sheetData = {
      timestamp: timestamp,
      name: userName.trim(),
      whatsapp: cleanNumber,
      source: 'Chat Modal'
    };

    try {
      const saved = await saveToGoogleSheets(sheetData);
      
      if (!saved) {
        throw new Error('Falha ao salvar os dados');
      }

      const message = `Olá! Me chamo ${userName} e gostaria de saber mais sobre os serviços da BlackBox iGaming.`;
      const whatsappUrl = `https://wa.me/+55${cleanNumber}?text=${encodeURIComponent(message)}`;
      
      const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      if (newWindow) newWindow.opener = null;
      
      closeModal();
    } catch (error) {
      console.error('Erro ao processar submissão:', error);
      alert('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
 
  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleClose}
      >
        <motion.div 
          className="chat-widget"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
        >
          <div className="chat-header">
            <div className="chat-title">
              <span>Fale com um especialista</span>
            </div>
            <button className="close-chat" onClick={handleClose}>
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="chat-content">
            <p className="intro-message">
              Antes de seguirmos, me conta seu nome e um número para que eu possa te chamar da melhor forma!
            </p>
            
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="input-group">
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Seu nome"
                  className="contact-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="tel"
                  value={whatsappNumber}
                  onChange={handleWhatsAppInput}
                  placeholder="Seu WhatsApp"
                  className={`contact-input ${whatsappError ? 'error' : ''}`}
                  maxLength="15"
                  required
                />
                {whatsappError && <span className="error-message">{whatsappError}</span>}
              </div>

              <button 
                type="submit" 
                className="whatsapp-submit-button"
                disabled={!isValidNumber || !userName.trim() || isSubmitting}
              >
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                {isSubmitting ? 'Enviando...' : 'Iniciar Atendimento no WhatsApp'}
              </button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalComponent;