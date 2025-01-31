import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiCheck, FiServer, FiShield, FiDatabase, FiGlobe } from 'react-icons/fi';
import ModalComponent from '../pages/ModalComponent';
import { services } from '../pages/ServicesSection';
import './ServiceDetails.css';

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [service, setService] = useState(null);

  useEffect(() => {
    // Simular busca do serviço pelo ID
    const currentService = services.find(s => s.id === parseInt(id));
    if (!currentService) {
      navigate('/');
      return;
    }
    setService(currentService);
  }, [id, navigate]);

  if (!service) return null;

  const technicalSpecs = {
    infrastructure: [
      { icon: <FiServer className="w-6 h-6" />, title: "Cloud Servers", desc: "Alta disponibilidade e escalabilidade" },
      { icon: <FiShield className="w-6 h-6" />, title: "Segurança", desc: "Proteção avançada e monitoramento 24/7" },
      { icon: <FiDatabase className="w-6 h-6" />, title: "Database", desc: "Replicação e backup automático" },
      { icon: <FiGlobe className="w-6 h-6" />, title: "CDN Global", desc: "Distribuição otimizada de conteúdo" }
    ],
    highlights: [
      { value: "99.9%", label: "Uptime garantido" },
      { value: "<100ms", label: "Latência média" },
      { value: "24/7", label: "Suporte técnico" },
      { value: "100%", label: "Satisfação" }
    ]
  };

  return (
    <div className="service-details-page">
      <header className="details-header">
        <div className="header-content">
          <button className="back-button" onClick={() => navigate('/')}>
            <FiArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      <main className="details-content">
        <section className="service-intro">
          <div>
            <h1>{service.title}</h1>
            <p className="service-description">{service.description}</p>
          </div>
          
          <div className="highlight-metrics">
            {technicalSpecs.highlights.map((highlight, index) => (
              <div key={index} className="highlight-card">
                <span className="highlight-value">{highlight.value}</span>
                <span className="highlight-label">{highlight.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="main-features">
          <h2 className="section-title">Recursos Principais</h2>
          <div className="features-grid">
            {service.features?.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-check">
                  <FiCheck className="w-5 h-5" />
                </div>
                <h3 className="text-white font-medium">{feature}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="tech-infrastructure">
          <h2 className="section-title">Infraestrutura</h2>
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
        </section>

        <section className="service-cta">
          <div className="cta-content">
            <h2>Pronto para transformar seu negócio?</h2>
            <p>Comece agora e aproveite todos os benefícios</p>
            <div className="cta-buttons">
              <button 
                className="primary-button"
                onClick={() => setIsModalOpen(true)}
              >
                Falar com consultor
                <FiArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {isModalOpen && (
        <ModalComponent closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ServiceDetails;