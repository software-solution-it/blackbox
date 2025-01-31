import React from 'react';
import { FiServer, FiShield, FiCode, FiUsers } from 'react-icons/fi';
import './AboutUsSection.css';

const AboutUsSection = ({ openModal }) => {
  const techFeatures = [
    {
      icon: <FiCode />,
      title: "Desenvolvimento Especializado",
      description: "Soluções personalizadas com as mais recentes tecnologias para o mercado iGaming"
    },
    {
      icon: <FiServer />,
      title: "Infraestrutura Robusta",
      description: "Arquitetura escalável e de alta disponibilidade para operações 24/7"
    },
    {
      icon: <FiShield />,
      title: "Segurança Avançada",
      description: "Proteção de dados e transações com os mais altos padrões de segurança"
    },
    {
      icon: <FiUsers />,
      title: "Suporte Especializado",
      description: "Equipe técnica dedicada para suporte e manutenção contínua"
    }
  ];

  return (
    <footer className="about-section">
      <div className="about-content">
        <div className="about-header">
          <h2>
            Tecnologia de Ponta para o
            <span className="text-gradient"> Mercado iGaming</span>
          </h2>
          <p className="about-description">
            Somos uma empresa de tecnologia especializada em desenvolver soluções 
            inovadoras e seguras para o mercado de iGaming. Nossa missão é entregar 
            excelência técnica e performance excepcional em cada projeto.
          </p>
        </div>

        <div className="tech-features">
          {techFeatures.map((feature, index) => (
            <div key={index} className="tech-card">
              <div className="tech-icon-wrapper">
                <div className="tech-icon">{feature.icon}</div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="company-info">
          <div className="info-grid">
            <div className="info-column">
              <h4>Tecnologia</h4>
              <ul>
                <li>Arquitetura Cloud</li>
                <li>Microsserviços</li>
                <li>APIs Escaláveis</li>
                <li>DevOps & CI/CD</li>
              </ul>
            </div>
            <div className="info-column">
              <h4>Soluções</h4>
              <ul>
                <li>Plataformas iGaming</li>
                <li>Sistemas de Pagamento</li>
                <li>Análise de Dados</li>
                <li>Gestão de Risco</li>
              </ul>
            </div>
            <div className="info-column">
              <h4>Segurança</h4>
              <ul>
                <li>Criptografia Avançada</li>
                <li>Proteção contra Fraudes</li>
                <li>Compliance</li>
                <li>Backups Redundantes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="contact-info">
            <h4>Entre em Contato</h4>
            <p>Descubra como nossa tecnologia pode impulsionar seu negócio</p>
            <button 
              className="contact-button"
              onClick={() => openModal('contact')}
            >
              Fale com um Especialista
            </button>
          </div>
          <div className="copyright">
            <p>© 2024 BlackBox Technology. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AboutUsSection;
