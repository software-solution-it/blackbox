import React, { useState } from 'react';
import './AdditionalServicesSection.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const AdditionalServicesSection = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const services = [
    {
      icon: "💼",
      title: "Gestão de Risco",
      description: "Sistema inteligente de monitoramento para operações seguras.",
      detailedInfo: {
        overview: "Sistema avançado de gestão de risco com IA para iGaming.",
        features: [
          "Monitoramento em tempo real",
          "Sistema anti-fraude inteligente",
          "Controle de limites automático",
          "Detecção de atividades suspeitas",
          "Relatórios analíticos",
        ],
        benefits: "Proteção completa contra fraudes e operações sustentáveis."
      }
    },
    {
      icon: "🔒",
      title: "Segurança",
      description: "Proteção de dados e transações com as mais recentes tecnologias de criptografia e segurança.",
      detailedInfo: {
        overview: "Sistema de segurança multicamada que protege dados sensíveis e transações financeiras com padrões bancários.",
        features: [
          "Criptografia end-to-end de última geração",
          "Autenticação multi-fator (2FA/MFA)",
          "Proteção contra DDoS e ataques cibernéticos",
          "Conformidade com GDPR e regulamentações locais",
          "Backups automáticos em múltiplas localizações",
          "Monitoramento 24/7 de segurança"
        ],
        benefits: "Garanta a confiança dos seus usuários com um sistema robusto de segurança que protege dados sensíveis e transações financeiras."
      }
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Ferramentas avançadas de análise de dados para otimização de negócios e tomada de decisões.",
      detailedInfo: {
        overview: "Plataforma completa de analytics com dashboards personalizáveis e relatórios em tempo real.",
        features: [
          "Análise em tempo real de métricas-chave",
          "Rastreamento de comportamento do usuário",
          "Relatórios personalizáveis de performance",
          "Análise de ROI por campanha",
          "Previsões baseadas em IA",
          "Integração com ferramentas de BI"
        ],
        benefits: "Tome decisões baseadas em dados com insights profundos sobre o comportamento dos usuários e performance do negócio."
      }
    },
    {
      icon: "🎮",
      title: "Integração de Jogos",
      description: "Acesso a uma vasta biblioteca de jogos dos melhores provedores do mercado.",
      detailedInfo: {
        overview: "API unificada para integração com múltiplos provedores de jogos, oferecendo uma experiência seamless.",
        features: [
          "Mais de 5000 jogos disponíveis",
          "Integração com principais provedores",
          "API única para todos os jogos",
          "Suporte a múltiplas moedas e idiomas",
          "Sistema de jackpot integrado",
          "Atualizações automáticas de conteúdo"
        ],
        benefits: "Ofereça uma experiência de jogo premium com acesso aos melhores títulos e provedores do mercado."
      }
    },
    {
      icon: "💳",
      title: "Processamento de Pagamentos",
      description: "Sistema completo de pagamentos com suporte a múltiplos métodos e moedas.",
      detailedInfo: {
        overview: "Solução de pagamentos flexível e segura, com suporte a diversos métodos e processadores internacionais.",
        features: [
          "Múltiplos métodos de pagamento",
          "Processamento de criptomoedas",
          "Sistema anti-fraude integrado",
          "Reconciliação automática",
          "Gestão de risco transacional",
          "Suporte a pagamentos recorrentes"
        ],
        benefits: "Maximize suas conversões com um sistema de pagamentos robusto e flexível que atende às necessidades locais e globais."
      }
    },
    {
      icon: "🎯",
      title: "Marketing Tools",
      description: "Ferramentas completas de marketing para aquisição e retenção de jogadores.",
      detailedInfo: {
        overview: "Suite completa de ferramentas de marketing para aumentar engajamento e rentabilidade.",
        features: [
          "Sistema de bônus personalizável",
          "Programa de fidelidade integrado",
          "Campanhas automatizadas",
          "Segmentação avançada de usuários",
          "A/B testing nativo",
          "Ferramentas de gamification"
        ],
        benefits: "Aumente a retenção e o valor médio por usuário com ferramentas de marketing poderosas e automatizadas."
      }
    },
    {
      icon: "🌐",
      title: "Suporte Multi-idioma",
      description: "Plataforma totalmente localizável para atender mercados globais.",
      detailedInfo: {
        overview: "Suporte completo a múltiplos idiomas e adaptação cultural para diferentes mercados.",
        features: [
          "Suporte a mais de 20 idiomas",
          "Adaptação de conteúdo local",
          "Interface customizável por região",
          "Suporte a RTL (Right-to-Left)",
          "Timezone automático",
          "Localização de conteúdo dinâmico"
        ],
        benefits: "Expanda seu alcance global com uma plataforma verdadeiramente internacional e culturalmente adaptada."
      }
    },
    {
      icon: "📱",
      title: "Mobile First",
      description: "Experiência otimizada para dispositivos móveis com app nativo opcional.",
      detailedInfo: {
        overview: "Plataforma desenvolvida com foco em mobile, garantindo performance e usabilidade em qualquer dispositivo.",
        features: [
          "Design responsivo avançado",
          "Apps nativos iOS e Android",
          "Push notifications",
          "Modo offline",
          "Otimização de performance mobile",
          "Integração com recursos nativos"
        ],
        benefits: "Ofereça uma experiência mobile premium que mantém os usuários engajados em qualquer dispositivo."
      }
    },
    {
      icon: "🛡️",
      title: "Compliance",
      description: "Conformidade com regulamentações globais e locais de iGaming.",
      detailedInfo: {
        overview: "Sistema completo de compliance para atender requisitos regulatórios em diferentes jurisdições.",
        features: [
          "KYC/AML integrado",
          "Registro de auditoria completo",
          "Controles de jogo responsável",
          "Relatórios regulatórios automatizados",
          "Gestão de licenças",
          "Atualizações regulatórias automáticas"
        ],
        benefits: "Opere com tranquilidade sabendo que sua plataforma atende a todos os requisitos regulatórios necessários."
      }
    }
  ];

  const handleCardClick = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.3
      }
    }
  };

  const expandedCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <section className="additional-services bg-gradient-to-b from-[#1E1E1E] to-[#2A2A2A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold mb-4">
            <span className="text-orange-500">Soluções</span> Completas
          </h2>
          <p className="text-gray-400 max-w-2x3 mx-auto text-lg">
            Ferramentas essenciais para o sucesso do seu negócio
          </p>
        </motion.div>

        <div className="services-container py-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="service-card"
                onClick={() => handleCardClick(index)}
              >
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="card-arrow">
                  <FaArrowRight />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {expandedCard !== null && (
            <>
              <motion.div
                className="overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setExpandedCard(null)}
              />
              <motion.div
                key="expanded-card"
                variants={expandedCardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="expanded-card"
              >
                <button
                  className="close-button"
                  onClick={() => setExpandedCard(null)}
                >
                  <FaArrowLeft /> Voltar
                </button>
                <div className="expanded-content">
                  <h3 className="expanded-title">{services[expandedCard].title}</h3>
                  <div className="detailed-info">
                    <h4>Visão Geral</h4>
                    <p>{services[expandedCard].detailedInfo.overview}</p>
                    
                    <h4>Recursos</h4>
                    <ul>
                      {services[expandedCard].detailedInfo.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    
                    <h4>Benefícios</h4>
                    <p>{services[expandedCard].detailedInfo.benefits}</p>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default AdditionalServicesSection;
