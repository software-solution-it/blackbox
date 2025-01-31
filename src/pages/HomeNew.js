import { useState, useEffect } from 'react';
import NavigationMenu from '../components/NavigationMenu';
import WhatsAppButton from '../components/WhatsAppButton';
import IntroSection from './IntroSection';
import ServicesSection from './ServicesSection';
import ProductsSection from './ProductsSection';
import ProvidersSection from './ProvidersSection';
import BlogSection from './BlogSection';
import AboutUsSection from './AboutUsSection';
import ModalComponent from './ModalComponent';

const HomeNew = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalContext, setModalContext] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'serviços', label: 'Serviços' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'provedores', label: 'Provedores' },
    { id: 'blog', label: 'Blog' },
    { id: 'sobre', label: 'Sobre nós' }
  ];

  // Mover a restauração do scroll para antes da renderização
  const scrollPosition = sessionStorage.getItem('scrollPosition');
  if (scrollPosition) {
    window.scrollTo(0, parseInt(scrollPosition));
    sessionStorage.removeItem('scrollPosition');
  }

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenModal = (context) => {
    setModalContext(context);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContext(null);
  };

  return (
    <>
      <NavigationMenu 
        sections={sections}
        onSectionChange={scrollToSection}
        isScrolled={isScrolled}
      />

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
                {['B','l','a','c','k','B','o','x',' ','I','G','a','m','i','n','g'].map((letter, index) => (
                  <span key={index} style={{'--i': index + 1}}>{letter}</span>
                ))}
              </div>
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        <IntroSection openModal={handleOpenModal} />
        <ServicesSection openModal={handleOpenModal} />
        <ProductsSection openModal={handleOpenModal} />
        <ProvidersSection openModal={handleOpenModal} />
        <BlogSection />
        
        <section id="sobre">
          <AboutUsSection />
        </section>
      </main>

      {showModal && (
        <ModalComponent 
          closeModal={handleCloseModal}
          context={modalContext}
        />
      )}

      <WhatsAppButton isLoading={isLoading} />
    </>
  );
};

export default HomeNew;
