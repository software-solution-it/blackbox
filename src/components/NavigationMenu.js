import React, { useState, useEffect, useRef } from 'react';
import './NavigationMenu.css';

const NavigationMenu = ({ sections, activeSection, onSectionChange, isScrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPageStatic, setIsPageStatic] = useState(true);
  const staticTimer = useRef(null);

  useEffect(() => {
    const handleMovement = () => {
      setIsPageStatic(false);
      clearTimeout(staticTimer.current);
      
      staticTimer.current = setTimeout(() => {
        setIsPageStatic(true);
      }, 1000); // 1 segundo
    };

    // Adicionar listeners para qualquer tipo de movimento
    window.addEventListener('scroll', handleMovement);
    window.addEventListener('mousemove', handleMovement);
    window.addEventListener('touchmove', handleMovement);
    window.addEventListener('keydown', handleMovement);

    return () => {
      window.removeEventListener('scroll', handleMovement);
      window.removeEventListener('mousemove', handleMovement);
      window.removeEventListener('touchmove', handleMovement);
      window.removeEventListener('keydown', handleMovement);
      clearTimeout(staticTimer.current);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleItemClick = (id, index) => {
    onSectionChange(id, index);
    setIsMenuOpen(false);
  };

  const menuClassName = `navigation-menu ${isScrolled ? 'scrolled' : ''} 
    ${isPageStatic ? 'page-static' : ''} ${isMenuOpen ? 'menu-open' : ''}`;

  return (
    <nav className={menuClassName}>
      <button 
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <div className={`hamburger-icon ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className={`nav-items-container ${isMenuOpen ? 'open' : ''}`}>
        {sections.map((section, index) => (
          <div key={section.id} className="nav-item-wrapper">
            <button
              onClick={() => handleItemClick(section.id, index)}
              className={`nav-item ${activeSection === index ? 'active' : ''}`}
            >
              <span className="nav-item-text">
                {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
              </span>
              <div className="nav-item-line"></div>
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default NavigationMenu; 