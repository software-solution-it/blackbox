import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ModalComponent.css';

const ModalComponent = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isExiting, setIsExiting] = useState(false);

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

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Olá! Tenho interesse em montar um cassino online.\n` +
      `Investimento: ${answers.investment}\n` +
      `Experiência: ${answers.experience}\n` +
      `Prazo: ${answers.timeline}\n` +
      `Interesse: ${answers.interest}`
    );
    window.open(`https://wa.me/5522988270013?text=${message}`);
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
      title: "Qual seu prazo para iniciar o projeto?",
      key: 'timeline',
      options: [
        { value: 'Imediato', label: 'Imediato' },
        { value: '1-3 meses', label: 'Nos próximos 1-3 meses' },
        { value: 'Ainda pesquisando', label: 'Ainda estou pesquisando' }
      ]
    },
    4: {
      title: "O que mais te interessa em nossos serviços?",
      key: 'interest',
      options: [
        { value: 'Plataforma completa', label: 'Plataforma completa de cassino' },
        { value: 'Suporte técnico', label: 'Suporte técnico especializado' },
        { value: 'Consultoria', label: 'Consultoria para operação' }
      ]
    },
    5: {
      title: "Ótimo! Vamos conversar sobre seu projeto?",
      isFinal: true
    }
  };

  const renderStep = () => {
    if (step === 5) {
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
          <motion.button
            className="contact-button"
            onClick={() => window.open('https://wa.me/5522988270013', '_blank')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="whatsapp-icon" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
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
            <div className="step-indicator">Passo {step} de 5</div>
          </div>

          <div className="progress-bar-container">
            <div 
              className="progress-bar"
              style={{ width: `${(step / 5) * 100}%` }}
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