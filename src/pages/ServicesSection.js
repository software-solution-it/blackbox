import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiMonitor, FiServer, FiShield, FiUsers, 
  FiArrowRight, FiCheck 
} from 'react-icons/fi';
import './ServicesSection.css';

export const services = [
  {
    id: 1,
    icon: <FiMonitor />,
    title: "Interface Personalizada",
    shortDesc: "Design único e responsivo",
    description: "Interface totalmente customizável de acordo com sua marca, oferecendo a melhor experiência para seus usuários em qualquer dispositivo.",
    features: [
      "Design responsivo",
      "Temas personalizáveis",
      "UX/UI otimizada",
      "Integração perfeita"
    ],
    metrics: [
      { value: "100%", label: "Customizável" },
      { value: "99%", label: "Satisfação" }
    ],
    color: "from-blue-500 to-purple-500"
  },
  {
    id: 2,
    icon: <FiServer />,
    title: "Infraestrutura Robusta",
    shortDesc: "Alta disponibilidade garantida",
    description: "Infraestrutura escalável e redundante, garantindo máxima disponibilidade e performance para sua operação.",
    features: [
      "Servidores dedicados",
      "Load balancing",
      "Backup automático",
      "Monitoramento 24/7"
    ],
    metrics: [
      { value: "99.9%", label: "Uptime" },
      { value: "24/7", label: "Suporte" }
    ],
    color: "from-green-500 to-teal-500"
  },
  {
    id: 3,
    icon: <FiShield />,
    title: "Segurança Avançada",
    shortDesc: "Proteção total dos dados",
    description: "Sistema de segurança multicamada com as mais avançadas tecnologias de proteção e criptografia.",
    features: [
      "Criptografia SSL",
      "Firewall dedicado",
      "Anti-fraude",
      "Backup criptografado"
    ],
    metrics: [
      { value: "100%", label: "Dados protegidos" },
      { value: "0", label: "Vazamentos" }
    ],
    color: "from-red-500 to-pink-500"
  },
  {
    id: 4,
    icon: <FiUsers />,
    title: "Gestão de Usuários",
    shortDesc: "Controle total de acessos",
    description: "Sistema completo de gestão de usuários com múltiplos níveis de acesso e relatórios detalhados.",
    features: [
      "Gestão de afiliados",
      "Logs detalhados",  
      "Autenticação 2FA",
      "Gestão de permissões"
    ],
    metrics: [
      { value: "1M+", label: "Usuários" },
      { value: "100%", label: "Controle" }
    ],
    color: "from-yellow-500 to-orange-500"
  }
];

const ServiceCard = ({ service, isActive, onClick }) => (
  <div
    className={`service-card ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <div className={`service-icon bg-gradient-to-br ${service.color}`}>
      {service.icon}
    </div>
    <div className="service-info">
      <h3>{service.title}</h3>
      <p>{service.shortDesc}</p>
    </div>
  </div>
);

const ServicesSection = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState(services[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSaibaMaisClick = () => {
    navigate(`/servicos/${selectedService.id}`);
  };

  return (
    <section className="services-section" id="serviços">
      <div className="services-content">
        <div className="section-header">
          <span className="section-badge">Nossos Serviços</span>
          <h2 className="section-title">
            Soluções <span className="text-gradient">Completas</span> para seu Negócio
          </h2>
          <p className="section-description">
            Oferecemos uma gama completa de serviços para impulsionar sua plataforma de iGaming
          </p>
        </div>

        <div className={`services-grid ${isMobile ? 'mobile' : ''}`}>
          <div className="services-list">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={selectedService.id === service.id}
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setSelectedService(service);
                    setIsAnimating(false);
                  }, 300);
                }}
              />
            ))}
          </div>

          <div className="service-details-wrapper">
            <div className={`service-details ${isAnimating ? 'fade-out' : 'fade-in'}`}>
              <div className="detail-header">
                <h3>{selectedService.title}</h3>
              </div>

              <p className="detail-description">{selectedService.description}</p>

              <div className="detail-metrics">
                {selectedService.metrics.map((metric, index) => (
                  <div key={index} className="metric-card">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="detail-features">
                <h4 className="text-xl font-semibold mb-10 text-gradient">Recursos Inclusos</h4>
                <div className="features-grid">
                  {selectedService.features.map((feature, index) => (
                    <div 
                      key={index} 
                      className="feature-item group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="feature-icon">
                        <div className="icon-cube">
                          <FiCheck className="check-icon" />
                        </div>
                        <div className="icon-ring"></div>
                      </div>
                      <div className="feature-content">
                        <span className="feature-text">{feature}</span>
                        <div className="feature-line"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                className="detail-button"
                onClick={handleSaibaMaisClick}
              >
                Saiba mais
                <FiArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 