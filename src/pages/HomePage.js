import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import 'tailwindcss/tailwind.css';
import './HomePage.css';

import IntroSection from './IntroSection';
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import AdditionalServicesSection from './AdditionalServicesSection';
import AboutUsSection from './AboutUsSection';
import ProvidersSection from './ProvidersSection';  // Importando a nova seção
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
      activeSection: 0, // New state to track active section
    };
    this.fullpageApiRef = React.createRef();
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
    const { isModalOpen, activeSection } = this.state;

    return (
      <>
        <PaginationTooltip fullpageApiRef={this.fullpageApiRef} activeSection={activeSection} />

        <ReactFullpage
          scrollingSpeed={1000}
          autoScrolling={true}
          fitToSection={true}
          scrollHorizontally={true}
          normalScrollElements=".slick-slider, .another-slider-class"
          debug={false}
          onLeave={(origin, destination) => {
            this.setState({ activeSection: destination.index }); // Update active section
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
                  <ProvidersSection openModal={this.openModal} />  {/* Passando openModal como prop */}
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
      </>
    );
  }
}

const PaginationTooltip = ({ fullpageApiRef, activeSection }) => {
  const sections = ['Intro', 'Serviços', 'Produtos', 'Alguns de nossos provedores', 'Serviços Adicionais', 'Sobre Nós'];

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
          className={`tooltip-item w-4 h-12 rounded-full ${activeSection === index ? 'bg-orange-500' : 'bg-gray-700'}`}
          onClick={() => handleNavigation(index)}
          title={section}
          aria-label={`Ir para ${section}`}
        />
      ))}
    </div>
  );
};

export default HomePage;
