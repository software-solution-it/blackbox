import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import './ProviderSection.css';
import logo1 from '../assets/images/logo1.png';
import logo2 from '../assets/images/logo2.png';
import logo3 from '../assets/images/logo3.png';
import logo4 from '../assets/images/logo4.png';
import logo5 from '../assets/images/logo5.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import { FiMousePointer } from 'react-icons/fi';

const providerStats = [
  { number: "1000+", label: "Jogos disponíveis", description: "Variedade de jogos de diferentes categorias" },
  { number: "99.9%", label: "Uptime garantido", description: "Alta disponibilidade e performance" },
  { number: "24/7", label: "Suporte técnico", description: "Atendimento especializado" },
  { number: "15+", label: "Provedores integrados", description: "Principais fornecedores do mercado" }
];

const features = [
  {
    title: "Integração Simplificada",
    description: "API unificada para todos os provedores, facilitando a implementação e manutenção.",
    icon: "🔄"
  },
  {
    title: "Relatórios em Tempo Real",
    description: "Acompanhe o desempenho de cada provedor e jogo em tempo real.",
    icon: "📊"
  },
  {
    title: "Certificações Internacionais",
    description: "Provedores certificados e regulamentados internacionalmente.",
    icon: "🏆"
  },
  {
    title: "Múltiplas Moedas",
    description: "Suporte a diferentes moedas e métodos de pagamento.",
    icon: "💰"
  }
];

const categoryDetails = {
  casino: {
    title: "Cassino ao Vivo",
    description: "Experimente a emoção de um cassino real com dealers profissionais em tempo real.",
    stats: [
      { number: "200+", label: "Mesas ao vivo" },
      { number: "24/7", label: "Disponibilidade" },
      { number: "15+", label: "Variações de jogos" },
      { number: "99.9%", label: "Uptime" }
    ],
    features: [
      { icon: "🎰", text: "Roleta ao vivo" },
      { icon: "🃏", text: "Blackjack em tempo real" },
      { icon: "🎲", text: "Bacará profissional" },
      { icon: "💫", text: "Game shows interativos" },
      { icon: "🎯", text: "Poker ao vivo" },
      { icon: "🌟", text: "Dealers profissionais" }
    ]
  },
  sports: {
    title: "Apostas Esportivas",
    description: "Aposte nos principais eventos esportivos do mundo com as melhores odds.",
    stats: [
      { number: "40+", label: "Esportes" },
      { number: "1000+", label: "Eventos/dia" },
      { number: "250+", label: "Mercados" },
      { number: "98%", label: "Payout médio" }
    ],
    features: [
      { icon: "⚽", text: "Futebol ao vivo" },
      { icon: "🏀", text: "Basquete em tempo real" },
      { icon: "🎾", text: "Tênis ao vivo" },
      { icon: "🏎️", text: "E-Sports" },
      { icon: "📊", text: "Estatísticas em tempo real" },
      { icon: "💰", text: "Cash out automático" }
    ]
  },
  slots: {
    title: "Slots Online",
    description: "Milhares de slots dos melhores provedores do mundo.",
    stats: [
      { number: "5000+", label: "Jogos" },
      { number: "97%", label: "RTP médio" },
      { number: "100+", label: "Jackpots" },
      { number: "20+", label: "Provedores" }
    ],
    features: [
      { icon: "🎰", text: "Slots clássicos" },
      { icon: "💎", text: "Jackpots progressivos" },
      { icon: "🎮", text: "Slots com bônus" },
      { icon: "🌟", text: "Megaways" },
      { icon: "🎲", text: "Compra de bônus" },
      { icon: "🏆", text: "Torneios diários" }
    ]
  }
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};

const CategoryCard = ({ title, count, details, type }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isMobile = useIsMobile();

  const handleCardClick = () => {
    if (isMobile) {
      setIsFlipped(true);
    }
  };

  const handleBackButtonClick = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  return (
    <div 
      className={`category-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleCardClick}
    >
      <div className="category-card-inner">
        {/* Frente do Card */}
        <div className="category-card-front">
          <div className="category-content">
            <h3 className="category-title">{title}</h3>
            <p className="category-subtitle">{count} jogos disponíveis</p>
            <div className="hover-indicator">
              <FiMousePointer size={24} />
            </div>
          </div>
        </div>

        {/* Verso do Card */}
        <div className="category-card-back">
          {isMobile && (
            <button 
              className="flip-back-button"
              onClick={handleBackButtonClick}
              aria-label="Fechar"
            >
              ✕
            </button>
          )}

          <div className="category-back-content">
            <h4 className="category-back-title">{details.title}</h4>
            <p className="category-back-subtitle">{details.description}</p>

            <div className="category-stats">
              {details.stats.map((stat, index) => (
                <div key={index} className="category-stat-item">
                  <div className="category-stat-number">{stat.number}</div>
                  <div className="category-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="category-features">
              {details.features.map((feature, index) => (
                <div key={index} className="category-feature">
                  <span className="category-feature-icon">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProvidersSection = ({ openModal }) => {
  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="providers-wrapper">
      <div className="providers-content">
        <div className="container mx-auto py-8 md:py-12">
          {/* Cabeçalho */}
          <div className="section-header">
            <h2 className="section-title">
              Nossos <span className="text-gradient">Provedores</span>
            </h2>
            <p className="section-description">
              Trabalhamos com os principais provedores do mercado para oferecer
              a melhor experiência aos seus usuários.
            </p>
          </div>

          {/* Carrossel de Logos */}
          <div className="provider-carousel">
            <Slider {...sliderSettings}>
              {[logo1, logo2, logo3, logo4, logo5].map((logo, index) => (
                <div key={index}>
                  <div className="provider-card">
                    <img src={logo} alt={`Provider ${index + 1}`} />
                  </div>
                </div>
              ))}
            </Slider>
          </div>

          {/* Estatísticas */}
          <div className="stats-grid">
            {providerStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="font-semibold text-white mb-1">{stat.label}</div>
                <div className="text-xs md:text-sm text-neutral-400">{stat.description}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon-wrapper">
                  <div className="feature-icon">
                    <span className="icon-emoji">{feature.icon}</span>
                  </div>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-neutral-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Categorias */}
          <div className="categories-grid">
            <CategoryCard
              title="Cassino ao Vivo"
              count="200+"
              details={categoryDetails.casino}
              type="casino"
            />
            <CategoryCard
              title="Apostas Esportivas"
              count="1000+"
              details={categoryDetails.sports}
              type="sports"
            />
            <CategoryCard
              title="Slots"
              count="5000+"
              details={categoryDetails.slots}
              type="slots"
            />
          </div>

          {/* CTA */}
          <div className="cta-container">
            <button
              onClick={() => openModal('Providers')}
              className="cta-button"
            >
              Explorar todos os provedores
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProvidersSection;
