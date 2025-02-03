import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ModalComponent.css';

const ModalComponent = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [isExiting, setIsExiting] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [userName, setUserName] = useState('');
  const [whatsappError, setWhatsappError] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showWhatsAppInput, setShowWhatsAppInput] = useState(false);
  const [showFinalButtons, setShowFinalButtons] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef(null);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      closeModal();
    }, 300);
  }; 

  const stepContent = {
    1: {
      message: "Olá! 👋 Sou Carlos, consultor especializado em cassinos online. Para te ajudar melhor, preciso saber: Qual é seu orçamento para investimento?",
      options: [
        { value: 'Até R$5.000', label: 'Até R$5.000' },
        { value: 'R$10.000 - R$15.000', label: 'R$10.000 - R$15.000' },
        { value: 'Acima de R$20.000', label: 'Acima de R$20.000' }  
      ]
    },
    2: {
      message: "Entendi! E me diz uma coisa, você já tem experiência com cassinos online?",
      options: [
        { value: 'Sim, já operei', label: 'Sim, já operei um cassino' },
        { value: 'Tenho conhecimento', label: 'Tenho conhecimento, mas nunca operei' },
        { value: 'Sou iniciante', label: 'Sou iniciante no mercado' }
      ]
    },
    3: {
      message: "Legal! E o que mais te interessa em nossos serviços?",
      options: [
        { value: 'Plataforma completa', label: 'Plataforma completa de cassino' },
        { value: 'Suporte técnico', label: 'Suporte técnico especializado' },
        { value: 'Consultoria', label: 'Consultoria para operação' }
      ]
    }
  };

  const handleOptionSelect = (question, answer, label) => {
    setAnswers({ ...answers, [question]: answer });
    
    // Remove as opções anteriores
    setMessages(prev => prev.filter(msg => !msg.isOptions));
    
    // Adiciona a resposta do usuário
    setMessages(prev => [...prev, { type: 'user', text: label }]);
    
    // Simula digitação
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      if (step < 3) {
        // Adiciona a próxima mensagem do bot
        setMessages(prev => [...prev, {
          type: 'bot',
          text: stepContent[step + 1].message,
          delay: 500
        }]);
        
        // Adiciona as novas opções como mensagem
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'options',
            options: stepContent[step + 1].options,
            isOptions: true,
            delay: 500
          }]);
        }, 1000);
      } else {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Ótimo! Agora preciso de algumas informações para continuar.',
          delay: 500
        }]);
        
        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Por favor, me diga seu nome:',
            delay: 500
          }]);
          setShowNameInput(true);
        }, 2000);
      }
    }, 1500);
    
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

  const handleNameInput = (e) => {
    setUserName(e.target.value);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!userName.trim()) return;

    setShowNameInput(false);
    setMessages(prev => [...prev, { type: 'user', text: userName }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: `Prazer em conhecer você, ${userName}! 👋`,
        delay: 500
      }]);

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Para finalizar, preciso do seu número de WhatsApp para enviar informações detalhadas sobre como podemos te ajudar.',
          delay: 500
        }]);
        setShowWhatsAppInput(true);
      }, 2000);
    }, 1500);
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    if (!validateWhatsApp(whatsappNumber)) {
      setWhatsappError('Por favor, insira um número válido com DDD');
      return;
    }

    setIsSubmitting(true);
    setShowWhatsAppInput(false);
    setMessages(prev => [...prev, { type: 'user', text: whatsappNumber }]);
    setIsTyping(true);

    try {
      await saveToGoogleSheets();
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Perfeito! Seus dados foram salvos com sucesso. 🎉',
          delay: 500
        }]);

        setTimeout(() => {
          setMessages(prev => [...prev, {
            type: 'bot',
            text: 'Gostaria de iniciar agora uma conversa no WhatsApp para discutirmos seu projeto?',
            delay: 500
          }]);
          
          // Adiciona as opções finais como mensagem
          setTimeout(() => {
            setMessages(prev => [...prev, {
              type: 'options',
              options: [
                { value: 'whatsapp', label: 'Sim, abrir WhatsApp' },
                { value: 'close', label: 'Não, fechar chat' }
              ],
              isOptions: true,
              delay: 500
            }]);
            setIsTyping(false);
          }, 1000);
        }, 1000);
      }, 1000);
    } catch (error) {
      setWhatsappError('Erro ao salvar os dados. Por favor, tente novamente.');
      setShowWhatsAppInput(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFinalOption = (option) => {
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);
    
    if (option.value === 'whatsapp') {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Ótimo! Redirecionando para o WhatsApp... 👋',
          delay: 300
        }]);
        setTimeout(() => {
          openWhatsApp();
          handleClose();
        }, 1500);
      }, 500);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          type: 'bot',
          text: 'Obrigado pelo contato! Até a próxima! 👋',
          delay: 300
        }]);
        setTimeout(handleClose, 1500);
      }, 500);
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
        name: userName,
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
      
    } catch (error) {
      console.error('Error saving to Google Sheets:', error);
      throw error;
    }
  };

  const initializeChat = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        { 
          type: 'bot', 
          text: stepContent[1].message,
          delay: 500 
        },
        {
          type: 'options',
          options: stepContent[1].options,
          isOptions: true,
          delay: 1000
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll quando mensagens são atualizadas
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    initializeChat();
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        className="chat-widget"
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
      >
        <div className="chat-header">
          <div className="chat-title">
            <div className="avatar">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B00">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
              </svg>
            </div>
            <span>Carlos - Consultor</span>
          </div>
          <button className="close-chat" onClick={handleClose}>
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="chat-messages">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: message.delay / 1000 }}
              className={`chat-message ${message.type}`}
            >
              {message.type === 'bot' && (
                <div className="avatar">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B00">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
              )}
              {message.type === 'options' ? (
                <div className="chat-options">
                  {message.options.map((option, optIndex) => (
                    <motion.button
                      key={optIndex}
                      className="chat-option-button"
                      onClick={() => {
                        if (option.value === 'whatsapp' || option.value === 'close') {
                          handleFinalOption(option);
                        } else {
                          handleOptionSelect(
                            step === 1 ? 'investment' : 
                            step === 2 ? 'experience' : 'interest',
                            option.value,
                            option.label
                          );
                        }
                      }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: optIndex * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className={`message-content ${message.type}`}>
                  {message.text}
                </div>
              )}
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="chat-message bot"
            >
              <div className="avatar">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B00">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                </svg>
              </div>
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </motion.div>
          )}
          {/* Elemento de referência para o scroll */}
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-area">
          {showNameInput && (
            <form onSubmit={handleNameSubmit} className="chat-input-form">
              <input
                type="text"
                value={userName}
                onChange={handleNameInput}
                placeholder="Digite seu nome..."
                className="chat-input"
              />
              <button type="submit" className="send-button">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B00">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </button>
            </form>
          )}

          {showWhatsAppInput && (
            <form onSubmit={handleWhatsAppSubmit} className="chat-input-form">
              <input
                type="tel"
                value={whatsappNumber}
                onChange={handleWhatsAppInput}
                placeholder="(XX) XXXXX-XXXX"
                className="chat-input"
                maxLength="15"
              />
              <button type="submit" className="send-button" disabled={!isValidNumber || isSubmitting}>
                {isSubmitting ? (
                  <div className="spinner" />
                ) : (
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#FF6B00">
                    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                  </svg>
                )}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalComponent;