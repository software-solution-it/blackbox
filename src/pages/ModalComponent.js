import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ModalComponent.css';

const ModalComponent = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isExiting, setIsExiting] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  }; 

  const handleAnswer = (question, answer) => {
    setAnswers({ ...answers, [question]: answer });
    setStep(step + 1);
  };

  const formatWhatsApp = (value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX
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
    // Remove todos os caracteres não numéricos
    const cleanNumber = number.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos (DDD + 9 + número)
    if (cleanNumber.length !== 11) {
      return false;
    }
    
    // Verifica se começa com DDD válido
    const ddd = parseInt(cleanNumber.substring(0, 2));
    if (ddd < 11 || ddd > 99) {
      return false;
    }
    
    return true;
  };

  const handleWhatsAppInput = (e) => {
    const value = e.target.value;
    const formatted = formatWhatsApp(value);
    setWhatsappNumber(formatted);
    
    const isValid = validateWhatsApp(value);
    setIsValidNumber(isValid);
    if (isValid) {
      setWhatsappError('');
    }
  };

  const handleWhatsAppSubmit = async () => {
    if (!validateWhatsApp(whatsappNumber)) {
      setWhatsappError('Por favor, insira um número válido com DDD (Ex: 11999999999)');
      return;
    }
    try {
      await saveToGoogleSheets();
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/5522988270013`);
  }; 

  const saveToGoogleSheets = async () => {
    try {
      const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzjXLpdCKITsIX2bC6bY_wiout33hGFdK-qtFrkKeNYvcMTRiobhecAajorGzw5ssH8/exec';
      
      const currentDate = new Date().toLocaleString('pt-BR', { 
        timeZone: 'America/Sao_Paulo' 
      });
      
      const cleanWhatsapp = whatsappNumber.replace(/\D/g, '');
      
      const data = {
        timestamp: currentDate,
        investment: answers.investment || '',
        experience: answers.experience || '',
        interest: answers.interest || '',
        whatsapp: cleanWhatsapp
      };

      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(data)
      });

     openWhatsApp();
      
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      setWhatsappError('Erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  const stepContent = {
    1: {
      title: "Qual é seu orçamento para investimento?",
      key: 'investment',
      options: [
        { value: 'Até R$5.000', label: 'Até R$5.000' },
        { value: 'R$10.000 - R$15.000', label: 'R$10.000 - R$15.000' },
        { value: 'Acima de R$20.000', label: 'Acima de R$20.000' }
      ]
    },
    2: {
      title: "Você já tem experiência com cassinos online?",
      key: 'experience',
      options: [
        { value: 'Sim, já operei', label: 'Sim, já operei um cassino' },
        { value: 'Tenho conhecimento', label: 'Tenho conhecimento, mas nunca operei' },
        { value: 'Sou iniciante', label: 'Sou iniciante no mercado' }
      ]
    },
    3: {
      title: "O que mais te interessa em nossos serviços?",
      key: 'interest',
      options: [
        { value: 'Plataforma completa', label: 'Plataforma completa de cassino' },
        { value: 'Suporte técnico', label: 'Suporte técnico especializado' },
        { value: 'Consultoria', label: 'Consultoria para operação' }
      ]
    },
    4: {
      title: "Ótimo! Vamos conversar sobre seu projeto?",
      isFinal: true
    }
  };

  const renderStep = () => {
    if (step === 4) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="final-step"
        >
          <h2 className="step-title">Ótimo! Vamos conversar sobre seu projeto?</h2>
          <p className="step-description">
            Nosso especialista está pronto para te ajudar a montar seu cassino online 
            de forma profissional e segura.
          </p>
          <div className="whatsapp-input-container">
            <p className="input-instruction">
              Digite seu número do WhatsApp com DDD para iniciarmos o contato
              <br />
              <span className="input-example">Exemplo: (11) 98765-4321</span>
            </p>
            <div className={`input-wrapper ${isValidNumber ? 'valid' : ''}`}>
              <div className="input-icon">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.967 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                </svg>
              </div>
              <input
                type="tel"
                placeholder="(XX) XXXXX-XXXX"
                value={whatsappNumber}
                onChange={handleWhatsAppInput}
                className="whatsapp-input"
                maxLength="15"
              />
              {isValidNumber && (
                <div className="valid-indicator">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#25D366" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </div>
              )}
            </div>
            {whatsappError && (
              <motion.p 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {whatsappError}
              </motion.p>
            )}
          </div>
          <motion.button
            className={`contact-button ${!isValidNumber ? 'disabled' : ''}`}
            onClick={handleWhatsAppSubmit}
            whileHover={isValidNumber ? { scale: 1.05 } : {}}
            whileTap={isValidNumber ? { scale: 0.95 } : {}}
            disabled={!isValidNumber}
          >
            Entrar em Contato
          </motion.button>
        </motion.div>
      );
    }

    const currentStep = stepContent[step];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="step-content"
      >
        <h2 className="step-title">{currentStep.title}</h2>
        <div className="options-grid">
          {currentStep.options.map((option, index) => (
            <motion.button
              key={index}
              className="option-button"
              onClick={() => handleAnswer(currentStep.key, option.value)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    );
  };

  return (
    <AnimatePresence>
      <div className={`modal-overlay ${isExiting ? 'overlay-exit' : ''}`}>
        <div className={`modal-container ${isExiting ? 'modal-exit' : ''}`}>
          <div className="close-button-wrapper">
            <button className="close-button-modal" onClick={handleClose}>
              <svg 
                viewBox="0 0 24 24" 
                width="24" 
                height="24" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="modal-header">
            <div className="step-indicator">Passo {step} de 4</div>
          </div>

          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>

          <div className="modal-content">
            {renderStep()}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default ModalComponent;