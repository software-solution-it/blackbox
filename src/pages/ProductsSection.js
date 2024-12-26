import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ProductsSection.css';
import { FiCheck, FiArrowRight, FiGlobe, FiMaximize2, FiPlay } from 'react-icons/fi';
import whitelabelImage from '../assets/images/plataforma_1.png';
import exchangeImage from '../assets/images/plataforma_1.png';

const products = [
  {
    id: 1,
    title: "Plataforma White Label",
    description: "Solução completa de cassino online com interface personalizável e sistema de gestão avançado",
    image: whitelabelImage,
    status: "Mais Vendido",
    features: [
      "Interface totalmente personalizável",
      "Múltiplos provedores de jogos",
      "Sistema de afiliados integrado",
      "Gestão completa de usuários",
      "Relatórios em tempo real",
      "Suporte 24/7"
    ],
    metrics: [
      { value: "10 dias", label: "Implementação" },
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Suporte" },
      { value: "100%", label: "Personalizável" }
    ],
    technologies: [
      "React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"
    ],
    demoUrl: "https://demo-whitelabel.exemplo.com",
    previewImage: whitelabelImage
  },
  {
    id: 2,
    title: "Plataforma de Exchange",
    description: "Exchange de apostas esportivas P2P com odds dinâmicas e mercados em tempo real",
    image: exchangeImage,
    status: "Novo",
    features: [
      "Trading esportivo P2P",
      "Odds dinâmicas em tempo real",
      "Sistema de matching automático",
      "Liquidez compartilhada",
      "API para traders",
      "Dashboard profissional"
    ],
    metrics: [
      { value: "15 dias", label: "Implementação" },
      { value: "99.9%", label: "Uptime" },
      { value: "0.1s", label: "Latência" },
      { value: "1M+", label: "Transações/dia" }
    ],
    technologies: [
      "Next.js", "Go", "MongoDB", "RabbitMQ", "Kubernetes", "GCP"
    ],
    demoUrl: "https://demo-exchange.exemplo.com",
    previewImage: exchangeImage
  }
];

const ProductCard = ({ product, openModal }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
          onClick={() => setIsPreviewOpen(true)}
          title="Ver site completo"
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

      {/* Full Preview Overlay */}
      {isPreviewOpen && (
        <div className="preview-overlay" onClick={() => setIsPreviewOpen(false)}>
          <div className="preview-content" onClick={e => e.stopPropagation()}>
            <button 
              className="preview-close"
              onClick={() => setIsPreviewOpen(false)}
            >
              ✕
            </button>
            <div className="preview-scroll">
              <img 
                src={product.previewImage} 
                alt={`${product.title} preview`}
                className="preview-image"
              />
            </div>
          </div>
        </div>
      )}
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
