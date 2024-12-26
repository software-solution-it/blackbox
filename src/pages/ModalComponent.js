import React, { useState } from 'react';

const ModalComponent = ({ closeModal }) => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

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
    window.open(`https://wa.me/5515999124570?text=${message}`);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4 py-3">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-6">Qual é seu orçamento para investimento?</h2>
            <div className="grid gap-3">
              <button 
                onClick={() => handleAnswer('investment', 'Até $10.000')} 
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Até $10.000
              </button>
              <button 
                onClick={() => handleAnswer('investment', '$10.000 - $30.000')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                $10.000 - $30.000
              </button>
              <button 
                onClick={() => handleAnswer('investment', 'Acima de $30.000')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Acima de $30.000
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-6">Você já tem experiência com cassinos online?</h2>
            <div className="grid gap-3">
              <button 
                onClick={() => handleAnswer('experience', 'Sim, já operei')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Sim, já operei um cassino
              </button>
              <button 
                onClick={() => handleAnswer('experience', 'Tenho conhecimento')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Tenho conhecimento, mas nunca operei
              </button>
              <button 
                onClick={() => handleAnswer('experience', 'Sou iniciante')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Sou iniciante no mercado
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-6">Qual seu prazo para iniciar o projeto?</h2>
            <div className="grid gap-3">
              <button 
                onClick={() => handleAnswer('timeline', 'Imediato')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Imediato
              </button>
              <button 
                onClick={() => handleAnswer('timeline', '1-3 meses')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Nos próximos 1-3 meses
              </button>
              <button 
                onClick={() => handleAnswer('timeline', 'Ainda pesquisando')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Ainda estou pesquisando
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-6">O que mais te interessa em nossos serviços?</h2>
            <div className="grid gap-3">
              <button 
                onClick={() => handleAnswer('interest', 'Plataforma completa')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Plataforma completa de cassino
              </button>
              <button 
                onClick={() => handleAnswer('interest', 'Suporte técnico')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Suporte técnico especializado
              </button>
              <button 
                onClick={() => handleAnswer('interest', 'Consultoria')}
                className="w-full p-3 text-left border border-gray-700 rounded-lg bg-gray-800 text-white hover:bg-gray-700 hover:border-orange-500/50 transition-colors"
              >
                Consultoria para operação
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center text-orange-500 mb-6">Ótimo! Vamos conversar sobre seu projeto?</h2>
            <p className="text-center text-white mb-6">
              Nosso especialista está pronto para te ajudar a montar seu cassino online de forma profissional e segura.
            </p>
            <div className="text-center">
              <button
                onClick={openWhatsApp}
                className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors inline-flex items-center"
              >
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Falar com Especialista
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/70 transition-opacity duration-300 px-4 py-8">
      <div className="bg-gray-900 rounded-xl w-full max-w-md p-6 relative transform transition-transform duration-300 font-poppins mx-auto overflow-y-auto max-h-full border border-orange-500/20 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <div className="w-6" />
          <h3 className="text-orange-500 text-lg font-semibold">Passo {step} de 5</h3>
          <button
            onClick={closeModal}
            className="text-orange-500 hover:text-orange-400 w-6 h-6 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="w-full bg-gray-800 rounded-full h-2 mb-6">
          <div 
            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          ></div>
        </div>

        <div className="text-white">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;