import React, { useState, useEffect } from 'react';
import './HomePage.css';
import IntroSection from './IntroSection';
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import ProvidersSection from '../pages_old/ProvidersSection';
import BlogSection from './BlogSection';
import AboutUsSection from './AboutUsSection';
import ModalComponent from './ModalComponent';
import NavigationMenu from '../components/NavigationMenu';
import WhatsAppButton from '../components/WhatsAppButton';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'serviços', label: 'Serviços' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'provedores', label: 'Provedores' },
    { id: 'blog', label: 'Blog' },
    { id: 'sobre', label: 'Sobre nós' }
  ];

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 4000);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openModal = (context) => {
    setModalContext(context);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContext(null);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-container bg-gradient-to-br from-[#141E30] to-[#243B55]">
      <NavigationMenu 
        sections={sections}
        onSectionChange={scrollToSection}
        isScrolled={isScrolled}
      />

      {isLoading && (
        <div className="loading-screen bg-gradient-to-br from-[#141E30] to-[#243B55]">
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

      <div className="page-content">
        <section id="home" className="bg-gradient-to-br from-[#141E30]/80 to-[#243B55]/80 backdrop-blur-lg">
          <IntroSection openModal={openModal} />
        </section>

        <section id="serviços" className="bg-gradient-to-br from-[#141E30]/90 to-[#243B55]/90">
          <ServicesSection openModal={openModal} />
        </section>

        <section id="produtos">
          <ProductsSection openModal={openModal} />
        </section>

        <section id="provedores">
          <ProvidersSection openModal={openModal} />
        </section>

        <section id="blog">
          <BlogSection />
        </section>

        <section id="sobre">
          <AboutUsSection />
        </section>
      </div>

      {isModalOpen && (
        <ModalComponent 
          closeModal={closeModal} 
          modalContext={modalContext}
          className="bg-gradient-to-br from-[#141E30] to-[#243B55]"
        />
      )}

      <WhatsAppButton isLoading={isLoading} />
    </div>
  );
};

export default HomePage;
