import React from 'react';

const NavigationMenu = ({ isScrolled }) => {
  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'serviços', label: 'Serviços' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'provedores', label: 'Provedores' },
    { id: 'roadmap', label: 'Roadmap' },
    { id: 'blog', label: 'Blog' },
    { id: 'sobre', label: 'Sobre nós' }
  ];

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#121212]/90 backdrop-blur-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="text-white font-bold text-xl">BlackBox</div>
          
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationMenu; 