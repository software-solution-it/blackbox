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
      <div className="bg-white flex px-3 overflow-hidden">
        <section className="px-5 additional-services py-20 container mx-auto px-4 min-h-screen">
          <div className="text-left ms-3 mb-10 flex items-center">
            <h2
              className="text-5xl md:text-7xl mr-3 font-bold text-gray-800"
              style={{
                fontFamily: 'Poppetier, sans-serif',
                fontSize: '5.3vh',  // 1/3 do tamanho original, usando vh para responsividade
                lineHeight: '1.2', // Ajuste para o espaçamento entre as linhas
              }}
            >
              Serviços e produtos
            </h2>
            <h3
              className="text-7xl md:text-5xl font-bold text-orange-500"
              style={{
                fontFamily: 'Poppetier, sans-serif',
                fontSize: '4.7vh',  // 1/3 do tamanho original
                lineHeight: '1.3',
              }}
            >
              adicionais
            </h3>
          </div>

          <div className="flex flex-wrap justify-start gap-4 mb-20 px-4">
            {isMobile ? (
              <select
                onChange={this.handleSelectChange}
                value={selectedCategoryIndex}
                className="px-6 py-2 border-2 border-orange-500 text-orange-500 font-semibold rounded hover:bg-orange-500 hover:text-white transition"
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

          <div
            className={`flex flex-col md:flex-row gap-8 justify-center transition-opacity duration-300 ${
              contentFade ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {!isMobile && (
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={additionalServices[selectedCategoryIndex].image}
                  alt={additionalServices[selectedCategoryIndex].title}
                  className="w-full max-w-md rounded-lg border-2 border-orange-500"
                  style={{
                    objectFit: 'cover', // Ensures the image covers the container
                    minWidth: 600, // Increases the width of the image
                    maxHeight: '500px',
                  }}
                />
              </div>
            )}

            <div className="w-full md:w-1/2 text-left">
              <h4
                className="text-3xl md:text-4xl font-bold text-orange-500 mb-4"
                style={{
                  fontFamily: 'Poppetier, sans-serif',
                  fontSize: '3vh',  // 1/3 do tamanho original
                  lineHeight: '1.4',
                }}
              >
                {additionalServices[selectedCategoryIndex].title}
              </h4>
              <h2
                className="text-xl md:text-2xl text-gray-600 mb-6"
                style={{
                  fontFamily: 'Poppetier, sans-serif',
                  fontSize: '2.3vh',  // 1/3 do tamanho original
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
                className="bg-orange-500 text-white px-10 md:px-40 py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
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
