import React from 'react';

const ModalComponent = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 px-4 py-8">
      <div className="bg-white rounded-lg w-full max-w-sm p-4 relative transform transition-transform duration-300 font-poppins mx-auto overflow-y-auto max-h-full">
        {/* Botão de fechar */}
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
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

        {/* Conteúdo do Modal */}
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold text-center text-orange-500 mb-4">Informações de Contato</h2>

          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              <strong>WhatsApp:</strong> +55 15 9912412570
            </p>
            <p className="text-sm font-medium text-gray-700">
              <strong>Telegram:</strong> @black_box_igaming
            </p>
            <p className="text-sm font-medium text-gray-700">
              <strong>Skype:</strong> live:.cid.97c26325520f5320
            </p>
          </div>

          <div className="text-center mt-4">
            <button
              onClick={closeModal}
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-400 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;