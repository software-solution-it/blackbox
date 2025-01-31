import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'bg-[#0A0F1A]/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="text-gradient font-bold text-2xl cursor-pointer"
            onClick={() => handleClick('home')}
          >
            BlackBox
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0A0F1A]/90 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-white hover:bg-[#ffffff08] rounded-lg transition-all duration-300"
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