import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLock,
  faPencilAlt,
  faHeadset,
  faUserTie,
  faDollarSign,
} from '@fortawesome/free-solid-svg-icons';

const services = [
  {
    title: 'Segurança',
    description: 'Garantimos sua plataforma com extrema segurança para você e seu cliente.',
    icon: faLock,
    advantages: [
      'Protocolos de segurança avançados para proteção de dados',
      'Autenticação de dois fatores para maior segurança de acesso',
      'Monitoramento contínuo contra fraudes e acessos não autorizados',
      'Criptografia de ponta a ponta para transações seguras',
    ],
  },
  {
    title: 'Customização',
    description: 'Não abra mão do seu diferencial. Deixe a plataforma com a sua cara.',
    icon: faPencilAlt,
    advantages: [
      'Opções de design totalmente personalizáveis',
      'Temas exclusivos com paletas de cores e logotipo',
      'Customização de layout responsivo para dispositivos móveis',
      'Experiência de usuário otimizada com base na identidade da marca',
    ],
  },
  {
    title: 'Suporte 24/7',
    description: 'Estamos à disposição para garantir que sua plataforma esteja em alta performance.',
    icon: faHeadset,
    advantages: [
      'Equipe de suporte dedicada disponível 24/7',
      'Atendimento por chat, e-mail e telefone',
      'Resolução rápida de problemas técnicos e operacionais',
      'Monitoramento e suporte proativo para evitar interrupções',
    ],
  },
  {
    title: 'Consultoria Especializada',
    description: 'Consultoria em conformidade regulatória e legislação além de análise de mercado.',
    icon: faUserTie,
    advantages: [
      'Consultoria para adequação às regulamentações locais',
      'Análise de mercado e insights estratégicos',
      'Planejamento de marketing e atração de usuários',
      'Assessoria em parcerias e afiliações no setor',
    ],
  },
  {
    title: 'Gateway de Pagamento',
    description: 'Seguros e certificados, com integração para diversas moedas e criptomoedas.',
    icon: faDollarSign,
    advantages: [
      'Suporte a múltiplas moedas, incluindo criptomoedas',
      'Processamento de pagamentos com alta segurança',
      'Integração com diversos provedores de pagamento',
      'Pagamentos rápidos e automatizados para clientes',
    ],
  },
];

class ServicesSection extends Component {
  state = {
    activeService: services[1], // Customização como padrão
    selectedService: 'Customização', // Definir o serviço selecionado no select
  };

  handleServiceChange = (e) => {
    const selectedService = e.target.value;
    const activeService = services.find(service => service.title === selectedService);
    this.setState({ selectedService, activeService });
  };

  render() {
    const { activeService, selectedService } = this.state;
    return (
      <div>
        <section className="services min-h-screen flex flex-col justify-center bg-[#1E1E1E] text-white relative px-4 sm:px-10 py-20">
          <div className="container mx-auto flex flex-col">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-10 sm:mb-20">
              Conheça <span className="text-orange-500">nossos serviços</span>
            </h2>

            <div className="flex flex-col lg:flex-row gap-8 px-4">
              {/* Select para dispositivos móveis */}
              <div className="block lg:hidden mb-6">
                <select
                  value={selectedService}
                  onChange={this.handleServiceChange}
                  className="w-full p-4 text-lg rounded-lg bg-orange-600 text-white"
                >
                  {services.map((service, index) => (
                    <option key={index} value={service.title}>
                      {service.title}
                    </option>
                  ))}
                </select> 
              </div>

              {/* Grid de Serviços para desktop */}
              <div className="hidden lg:flex flex-wrap justify-start gap-6 lg:w-2/3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => this.setState({ activeService: service })}
                    className={`p-6 rounded-lg shadow-lg cursor-pointer flex flex-col items-center text-center transition-transform duration-300 transform hover:scale-105 ${
                      activeService.title === service.title
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-800 hover:bg-orange-400 hover:text-white'
                    }`}
                    style={{
                      width: '100%', // Utiliza a largura total disponível dentro do grid
                      maxWidth: '200px', // Garante o tamanho máximo do card
                      justifyContent: 'center',
                      alignItems: 'center',
                      maxHeight: '200px', // Garante que o card não ultrapasse essa altura
                      flex: '1 1 200px', // Flexível para responsividade
                    }}
                  >
                    <FontAwesomeIcon
                      icon={service.icon}
                      size="2x"
                      className={`mb-4 ${
                        activeService.title === service.title
                          ? 'text-white'
                          : 'text-orange-500'
                      }`}
                    />
                    <h3 className="text-lg sm:text-xl font-semibold">{service.title}</h3>
                  </div>
                ))}
              </div>

              {/* Descrição detalhada */}
              <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start text-left rounded-lg">
                <h3 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-4">
                  {activeService.title}
                </h3>
                <p className="text-sm sm:text-lg text-gray-300 mb-4">
                  {activeService.description}
                </p>
                <h4 className="text-xl sm:text-2xl font-semibold text-orange-500 mb-3">
                  Vantagens
                </h4>
                <ul className="text-gray-300 list-disc list-inside text-sm sm:text-base">
                  {activeService.advantages.map((advantage, i) => (
                    <li key={i}>{advantage}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ServicesSection;
