import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/images/logo.png'; // Importar a logo
import './NavigationMenu.css';

const NavigationMenu = ({ isScrolled }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'serviços', label: 'Serviços' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'provedores', label: 'Provedores' },
    { id: 'blog', label: 'Blog' },
    { id: 'sobre', label: 'Sobre nós' }
  ];

  const handleClick = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#0A0F1A]/40 backdrop-blur-sm ${
      isScrolled ? 'bg-[#0A0F1A]/60 shadow-lg' : ''
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="logo-wrapper cursor-pointer"
            onClick={() => handleClick('home')}
          >
            <img src={logo} alt="BlackBox iGaming" className="logo-image" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="nav-item"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="mobile-nav-item"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu; 