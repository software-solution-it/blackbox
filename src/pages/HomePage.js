import React, { useState, useEffect } from 'react';
import './HomePage.css';
import IntroSection from './IntroSection';
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import AdditionalServicesSection from './AdditionalServicesSection';
import AboutUsSection from './AboutUsSection';
import ProvidersSection from './ProvidersSection';
import ModalComponent from './ModalComponent';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sections = [
    {
      id: 'intro',
      component: IntroSection,
      bgColor: '#1E1E1E',
      gradientTo: '#FF6B00'
    },
    {
      id: 'services',
      component: ServicesSection,
      bgColor: '#FF6B00',
      gradientTo: '#374151'
    },
    {
      id: 'products',
      component: ProductsSection,
      bgColor: '#374151',
      gradientTo: '#FFFFFF'
    },
    {
      id: 'providers',
      component: ProvidersSection,
      bgColor: '#FFFFFF',
      gradientTo: '#1E1E1E'
    },
    {
      id: 'additional',
      component: AdditionalServicesSection,
      bgColor: '#1E1E1E',
      gradientTo: '#FF6B00'
    }
  ];

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'hidden';
    }

    setTimeout(() => setIsLoading(false), 4000);

    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  const openModal = (context) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContext(null);
  };

  const scrollToSection = (sectionId, index) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
    }
  };

  const scrollToNextSection = (currentSectionId) => {
    const sectionIds = sections.map(section => section.id);
    const currentIndex = sectionIds.indexOf(currentSectionId);
    const nextIndex = (currentIndex + 1) % sections.length;
    
    scrollToSection(sectionIds[nextIndex], nextIndex);
  };

  return (
    <div className="relative bg-[#121212]">
      {isLoading && (
        <div className="loading-screen">
          <div className="loading-content">
            <div className="loading-box-container">
              <div className="loading-box">
                <div className="box-face front"></div>
                <div className="box-face back"></div>
                <div className="box-face right"></div>
                <div className="box-face left"></div>
                <div className="box-face top"></div>
                <div className="box-face bottom"></div>
              </div>
            </div>
            <div className="loading-text-wrapper">
              <div className="loading-text">
                <span>B</span><span>l</span><span>a</span><span>c</span><span>k</span>
                <span>B</span><span>o</span><span>x</span><span>&nbsp;</span>
                <span>I</span><span>G</span><span>a</span><span>m</span><span>i</span>
                <span>n</span><span>g</span>
              </div>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => scrollToSection(section.id, index)}
                className={`nav-dot ${activeSection === index ? 'active' : ''}`}
                aria-label={`Seção ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      </nav>

      <main className="relative">
        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="relative min-h-screen"
          >
            <div className="h-full">
              <section.component openModal={openModal} />
            </div>

            {index < sections.length - 1 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                           flex flex-col items-center gap-2 text-neutral-400 z-10">
                <button
                  onClick={() => scrollToNextSection(section.id)}
                  className="flex flex-col items-center group"
                >
                  <span className="text-xs text-neutral-500 group-hover:text-primary transition-colors">
                    Próxima seção
                  </span>
                  <svg 
                    className="w-5 h-5 text-neutral-500 group-hover:text-primary scroll-indicator" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                  </svg>
                </button>
              </div>
            )}
          </section>
        ))}
      </main>

      {isModalOpen && (
        <ModalComponent closeModal={closeModal} modalContext={modalContext} />
      )}
    </div>
  );
};

export default HomePage;
