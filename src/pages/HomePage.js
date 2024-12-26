import React, { useState, useEffect } from 'react';
import './HomePage.css';
import logo from '../assets/images/logo.png';

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
    setTimeout(() => setIsLoading(false), 4000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = (scrollPosition / fullHeight) * 100;
      setScrollProgress(progress);

      // Determinar seção ativa baseado no scroll
      const sectionIndex = Math.floor((progress / 100) * sections.length);
      setActiveSection(Math.min(sectionIndex, sections.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections.length]);

  const openModal = (context) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContext(null);
  };

  const scrollToNextSection = (currentSectionId) => {
    const sections = ['intro', 'services', 'products', 'providers', 'additional', 'about'];
    const currentIndex = sections.indexOf(currentSectionId);
    const nextIndex = (currentIndex + 1) % sections.length;
    const nextSection = document.getElementById(sections[nextIndex]);
    
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#121212]">
      {/* Loading Screen */}
      {isLoading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-[#1E1E1E]">
          <div className="loading-container">
            <div className="geometric-box">
              <div className="inner-box"></div>
            </div>
            <div className="loading-text-container">
              <div className="loading-text">
                <span>B</span>
                <span>l</span>
                <span>a</span>
                <span>c</span>
                <span>k</span>
                <span>B</span>
                <span>o</span>
                <span>x</span>
                <span>&nbsp;</span>
                <span>I</span>
                <span>G</span>
                <span>a</span>
                <span>m</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40">
        <ul className="space-y-4">
          {sections.map((section, index) => (
            <li key={section.id}>
              <button
                onClick={() => {
                  const element = document.getElementById(section.id);
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
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
            {/* Componente da seção */}
            <div className="h-full">
              <section.component openModal={openModal} />
            </div>

            {/* Indicador de scroll quando necessário */}
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

      {/* Modal */}
      {isModalOpen && (
        <ModalComponent closeModal={closeModal} modalContext={modalContext} />
      )}
    </div>
  );
};

export default HomePage;
