import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import 'tailwindcss/tailwind.css';
import './HomePage.css';
import logo from '../assets/images/logo.png';

import IntroSection from './IntroSection';
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import AdditionalServicesSection from './AdditionalServicesSection';
import AboutUsSection from './AboutUsSection';
import ProvidersSection from './ProvidersSection';
import ModalComponent from './ModalComponent';

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalContext: null,
      isSubmitted: false,
      formData: {
        name: '',
        email: '',
        services: [],
        favoriteProduct: '',
        observation: '',
      },
      errors: {},
      activeSection: 0,
      isLoading: true, // Controle do estado de loading
    };
    this.fullpageApiRef = React.createRef();
  }

  componentDidMount() {
    // Timer de 3 segundos para o loading
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000);
  }

  openModal = (context) => {
    this.setState({
      isModalOpen: true,
      modalContext: context,
      isSubmitted: false,
      formData: {
        name: '',
        email: '',
        services: [],
        favoriteProduct: '',
        observation: '',
      },
      errors: {},
    });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalContext: null });
  };

  render() {
    const { isModalOpen, activeSection, isLoading } = this.state;

    return (
      <>
        {/* Tela de Loading */}
        {isLoading && (
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-50">
            <img
              src={logo}
              alt="Logo"
              className="w-48 h-16 mb-4 animate-spin-slow"
            />
            <p className="text-lg font-semibold animate-pulse">
              Conquiste sua própria plataforma
            </p>
          </div>
        )}

        {/* Conteúdo Principal com Transição Suave */}
        <div
          className={`transition-opacity duration-1000 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <PaginationTooltip
            fullpageApiRef={this.fullpageApiRef}
            activeSection={activeSection}
          />

          <ReactFullpage
            scrollingSpeed={1000}
            autoScrolling={true}
            fitToSection={true}
            scrollHorizontally={true}
            normalScrollElements=".slick-slider, .another-slider-class"
            debug={false}
            onLeave={(origin, destination) => {
              this.setState({ activeSection: destination.index });
            }}
            render={({ fullpageApi }) => {
              if (!this.fullpageApiRef.current) {
                this.fullpageApiRef.current = fullpageApi;
              }
              return (
                <ReactFullpage.Wrapper>
                  <div className="section">
                    <IntroSection openModal={this.openModal} />
                  </div>
                  <div className="section">
                    <ServicesSection />
                  </div>
                  <div className="section">
                    <ProductsSection openModal={this.openModal} />
                  </div>
                  <div className="section">
                    <ProvidersSection openModal={this.openModal} />
                  </div>
                  <div className="section">
                    <AdditionalServicesSection openModal={this.openModal} />
                  </div>
                  <div className="section">
                    <AboutUsSection />
                  </div>
                </ReactFullpage.Wrapper>
              );
            }}
          />

          {isModalOpen && (
            <ModalComponent
              isModalOpen={isModalOpen}
              closeModal={this.closeModal}
              modalContext={this.state.modalContext}
              formData={this.state.formData}
              errors={this.state.errors}
              isSubmitted={this.state.isSubmitted}
            />
          )}
        </div>
      </>
    );
  }
}

const PaginationTooltip = ({ fullpageApiRef, activeSection }) => {
  const sections = [
    'Intro',
    'Serviços',
    'Produtos',
    'Alguns de nossos provedores',
    'Serviços Adicionais',
    'Sobre Nós',
  ];

  const handleNavigation = (index) => {
    if (fullpageApiRef.current) {
      fullpageApiRef.current.moveTo(index + 1);
    }
  };

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4 z-50">
      {sections.map((section, index) => (
        <button
          key={index}
          className={`tooltip-item w-4 h-12 rounded-full ${
            activeSection === index ? 'bg-orange-500' : 'bg-gray-700'
          }`}
          onClick={() => handleNavigation(index)}
          title={section}
          aria-label={`Ir para ${section}`}
        />
      ))}
    </div>
  );
};

export default HomePage;
