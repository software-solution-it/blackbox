import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductsSection.css';
import NextBetPdf from '../../src/assets/images/nextbet.pdf'
import OnePixPdf from '../../src/assets/images/onepix.pdf'
import NextBetImage from '../../src/assets/images/nextbet.png'
import OnePixImage from '../../src/assets/images/onepixbet.png'
import { FiCheck, FiArrowRight, FiGlobe, FiMaximize2, FiPlay } from 'react-icons/fi';

const products = [
  {
    id: 1,
    title: "Plataforma White Label",
    description: "Solução completa de cassino online com interface personalizável e sistema de gestão avançado",
    image: NextBetImage,
    status: "Mais Vendido",
    features: [
      "Interface totalmente personalizável",
      "Múltiplos provedores de jogos",
      "Painel Administrativo",
      "Sistema de afiliados integrado",
      "Gestão completa de usuários",
      "Relatórios em tempo real",
      "Suporte 24/7"
    ],
    metrics: [
      { value: "1 dia", label: "Implementação" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Suporte" },
      { value: "100%", label: "Personalizável" }
    ],
    technologies: [
      "React", "Node.js", "MySql", "Php"
    ],
    demoUrl: "https://nextbet.games",
    previewPdf: NextBetPdf,
    previewImage: NextBetImage
  },
  {
    id: 2,
    title: "Plataforma Cassino + Esportes",
    description: "Plataforma de apostas esportivas e cassino P2P com odds dinâmicas e em tempo real",
    image: OnePixImage,
    status: "Novo",
    features: [
      "Trading esportivo P2P",
      "Odds dinâmicas em tempo real",
      "Liquidez compartilhada",
      "Abas Promocionais",
      "Gateways de pagamentos Integrados",
      "Painel Administrativo",
      "API completa",
    ],
    metrics: [
      { value: "2 dias", label: "Implementação" },
      { value: "99.9%", label: "Uptime" },
      { value: "0.4s", label: "Latência" },
      { value: "1M+", label: "Transações/dia" }
    ],
    technologies: [
      "Php", "PostgreSql"
    ],
    demoUrl: "https://onepix.io",
    previewPdf: OnePixPdf,
    previewImage: OnePixPdf
  }
];

const ProductCard = ({ product, openModal }) => {
  const handlePreviewClick = (e) => {
    e.preventDefault();
    window.open(product.previewPdf, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-card group animate-fadeInUp">
      <div className="product-header">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
        />
        <div className="product-overlay" />
        {product.status && (
          <span className="product-badge">{product.status}</span>
        )}
        
        {/* Preview Button */}
        <button 
          className="preview-button"
          onClick={handlePreviewClick}
          title="Ver plataforma completa"
        >
          <FiMaximize2 />
        </button>
      </div>

      <div className="product-content">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-metrics">
          {product.metrics.map((metric, index) => (
            <div key={index} className="metric-item">
              <div className="metric-value">{metric.value}</div>
              <div className="metric-label">{metric.label}</div>
            </div>
          ))}
        </div>

        <div className="product-features">
          {product.features.map((feature, index) => (
            <div key={index} className="feature-item">
              <FiCheck className="feature-icon" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="product-tech">
          {product.technologies.map((tech, index) => (
            <span key={index} className="tech-tag">{tech}</span>
          ))}
        </div>

        <div className="product-actions">
          <a 
            href={product.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="action-button demo-action group"
          >
            <FiPlay className="transition-transform duration-300 group-hover:rotate-360" />
            <span>Ver Demo</span>
          </a>
          <button 
            className="action-button primary-action group"
            onClick={() => openModal(product.title)}
          >
            <span>Solicitar Proposta</span>
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductsSection = ({ openModal }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    customPaging: (i) => (
      <div className="custom-dot"></div>
    )
  };

  return (
    <section className="products-section">
      <div className="products-content">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Nossas Soluções
          </h2>
          <p className="text-sm md:text-base text-neutral-400 max-w-2xl mx-auto mb-8">
            Escolha a solução ideal para seu negócio com nossa linha completa de produtos
            para iGaming. Tecnologia de ponta com suporte especializado.
          </p>
        </div>

        {isMobile ? (
          <div className="mobile-slider">
            <Slider {...sliderSettings}>
              {products.map(product => (
                <div key={product.id} className="slider-item">
                  <ProductCard product={product} openModal={openModal} />
                </div>
              ))}
            </Slider>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                openModal={openModal}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
