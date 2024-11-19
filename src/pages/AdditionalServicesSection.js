import React, { Component } from 'react';
import { additionalServices } from '../data/data';

class AdditionalServicesSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryIndex: 0,
      contentFade: true,
      isMobile: window.innerWidth <= 768, // Verifica se está no mobile
    };
  }

  handleCategoryClick = (index) => {
    if (index !== this.state.selectedCategoryIndex) {
      this.setState({ contentFade: false });
      setTimeout(() => {
        this.setState({ selectedCategoryIndex: index, contentFade: true });
      }, 300);
    }
  };

  handleSelectChange = (event) => {
    this.setState({ selectedCategoryIndex: event.target.value });
  };

  render() {
    const { openModal } = this.props;
    const { selectedCategoryIndex, contentFade, isMobile } = this.state;

    return (
      <div className="bg-white flex justify-center items-center min-h-screen overflow-hidden px-3">
        <section className="additional-services container mx-auto flex flex-col justify-center items-center px-4 py-10 min-h-[90vh] max-h-screen overflow-hidden">
          {/* Títulos Responsivos e Centralizados */}
          <div className="text-center mb-10">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-800"
              style={{
                fontFamily: 'Poppetier, sans-serif',
                lineHeight: '1.2',
              }}
            >
              Serviços e produtos
            </h2>
            <h3
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-orange-500"
              style={{
                fontFamily: 'Poppetier, sans-serif',
                lineHeight: '1.3',
              }}
            >
              adicionais
            </h3>
          </div>

          {/* Seleção ou Botões (Centralizados) */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 px-4">
            {isMobile ? (
              <select
                onChange={this.handleSelectChange}
                value={selectedCategoryIndex}
                className="px-6 py-2 border-2 border-orange-500 text-orange-500 font-semibold rounded hover:bg-orange-500 hover:text-white transition block mx-auto w-4/5 sm:w-3/4"
                style={{ fontFamily: 'Poppetier, sans-serif' }}
              >
                {additionalServices.map((service, index) => (
                  <option key={index} value={index}>
                    {service.title}
                  </option>
                ))}
              </select>
            ) : (
              additionalServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => this.handleCategoryClick(index)}
                  className={`px-6 py-2 border-2 border-orange-500 text-orange-500 font-semibold rounded hover:bg-orange-500 hover:text-white transition ${
                    selectedCategoryIndex === index ? 'bg-orange-500 text-white' : ''
                  }`}
                  style={{ fontFamily: 'Poppetier, sans-serif' }}
                >
                  {service.title}
                </button>
              ))
            )}
          </div>

          {/* Conteúdo das Categorias */}
          <div
            className={`flex flex-col md:flex-row gap-8 justify-center items-center transition-opacity duration-300 ${
              contentFade ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ maxHeight: 'calc(100vh - 400px)' }}
          >
            {!isMobile && (
              <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                <img
                  src={additionalServices[selectedCategoryIndex].image}
                  alt={additionalServices[selectedCategoryIndex].title}
                  className="w-full max-w-md rounded-lg border-2 border-orange-500"
                  style={{
                    objectFit: 'cover',
                    minWidth: '300px',
                    maxHeight: '400px',
                  }}
                />
              </div>
            )}

            <div className="w-full md:w-1/2 text-left overflow-y-auto max-h-[400px]">
              <h4
                className="text-3xl sm:text-4xl font-bold text-orange-500 mb-4"
                style={{
                  fontFamily: 'Poppetier, sans-serif',
                  lineHeight: '1.4',
                }}
              >
                {additionalServices[selectedCategoryIndex].title}
              </h4>
              <h2
                className="text-xl sm:text-2xl text-gray-600 mb-6"
                style={{
                  fontFamily: 'Poppetier, sans-serif',
                  lineHeight: '1.4',
                }}
              >
                {additionalServices[selectedCategoryIndex].description}
              </h2>
              <button
                onClick={() =>
                  openModal(
                    `Serviço Adicional: ${additionalServices[selectedCategoryIndex].title}`
                  )
                }
                className="bg-orange-500 text-white px-10 sm:px-12 md:px-40 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
                style={{ fontFamily: 'Poppetier, sans-serif' }}
              >
                Contratar
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default AdditionalServicesSection;
