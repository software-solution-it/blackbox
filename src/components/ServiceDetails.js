import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck, FiServer, FiShield, FiDatabase, FiGlobe, FiCpu } from 'react-icons/fi';
import ModalComponent from '../pages/ModalComponent';
import './ServiceDetails.css';

const ServiceDetails = ({ service, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const technicalSpecs = {
    infrastructure: [
      { icon: <FiServer />, title: "Cloud Servers", desc: "Alta disponibilidade e escalabilidade" },
      { icon: <FiShield />, title: "Segurança", desc: "Proteção avançada e monitoramento 24/7" },
      { icon: <FiDatabase />, title: "Database", desc: "Replicação e backup automático" },
      { icon: <FiGlobe />, title: "CDN Global", desc: "Distribuição otimizada de conteúdo" }
    ],
    highlights: [
      { value: "99.9%", label: "Uptime garantido" },
      { value: "<100ms", label: "Latência média" },
      { value: "24/7", label: "Suporte técnico" },
      { value: "100%", label: "Satisfação" }
    ]
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="service-details-modal">
      <div className="service-details-overlay" onClick={onClose} />
      <div className="service-details-container">
        <header className="details-header">
          <div className="header-content">
            <button className="back-button" onClick={onClose}>
              <FiArrowLeft />
              <span>Voltar</span>
            </button>
          </div>
        </header>

        <div className="details-content">
          <div className="service-intro">
            <div className="service-intro-content">
              <h1>{service.title}</h1>
              <p className="service-description">{service.description}</p>
              <button 
                className="primary-button"
                onClick={handleOpenModal}
              >
                Começar agora
                <FiArrowRight />
              </button>
            </div>
            <div className="highlight-metrics">
              {technicalSpecs.highlights.map((highlight, index) => (
                <div key={index} className="highlight-card">
                  <span className="highlight-value">{highlight.value}</span>
                  <span className="highlight-label">{highlight.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="main-features">
            <h2 className='mb-5'>Recursos Principais</h2>
            <div className="features-grid">
              {service.features?.map((feature, index) => (
                <div key={index} className="feature-card">
                  <div className="feature-check">
                    <FiCheck />
                  </div>
                  <h3>{feature}</h3>
                </div>
              ))}
            </div>
          </div>

          <div className="tech-infrastructure">
            <h2 className='mb-5'>Infraestrutura</h2>
            <div className="infrastructure-grid">
              {technicalSpecs.infrastructure.map((item, index) => (
                <div key={index} className="infrastructure-card">
                  <div className="infra-icon">{item.icon}</div>
                  <div className="infra-content">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="service-cta">
            <div className="cta-content">
              <h2>Pronto para transformar seu negócio?</h2>
              <p>Comece agora e aproveite</p>
              <div className="cta-buttons">
                <button 
                  className="secondary-button"
                  onClick={handleOpenModal}
                >
                  Falar com consultor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Funil de Vendas */}
      {isModalOpen && (
        <ModalComponent closeModal={handleCloseModal} />
      )}
    </div>
  );
};

export default ServiceDetails;