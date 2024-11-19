// data/data.js
import product_1 from '../assets/images/product_1.png';
import product_2 from '../assets/images/product_2.png';
import product_3 from '../assets/images/product_3.png';
import product_4 from '../assets/images/product_4.png';
import product_5 from '../assets/images/product_5.png';
import product_6 from '../assets/images/product_6.png';
import product_7 from '../assets/images/product_7.png';

import { faLock, faPencilAlt, faHeadset, faUserTie, faDollarSign } from '@fortawesome/free-solid-svg-icons';

export const additionalServices = [
    { 
      title: 'Marketing Digital para iGaming',
      description:
        'Em um mercado competitivo como o iGaming, estratégias eficazes de marketing digital são essenciais para alcançar e reter jogadores. Oferecemos soluções personalizadas que incluem SEO especializado, campanhas de publicidade segmentadas e gestão de redes sociais focadas no público gamer. Nossa abordagem integrada garante que sua plataforma seja visível para o público certo, aumentando a taxa de conversão e fidelização dos usuários. Além disso, utilizamos análises avançadas para ajustar continuamente as estratégias e maximizar o retorno sobre o investimento.',
      image: product_1,
    },
    {
      title: 'Marketing de Influenciadores para eGaming',
      description:
        'O Marketing de Influenciadores tornou-se uma ferramenta poderosa no setor de eGaming. Conectamos sua marca com influenciadores relevantes que possuem um grande alcance e engajamento entre os jogadores. Isso permite que você alcance um público mais amplo de forma autêntica e eficaz. Gerenciamos todo o processo, desde a seleção dos influenciadores ideais até a criação de conteúdo e análise de resultados. Com nossa ajuda, sua marca ganhará maior visibilidade e credibilidade no mercado.',
      image: product_2,
    },
    {
      title: 'Segurança e Conformidade',
      description:
        'A segurança é uma prioridade máxima no setor de iGaming. Nossos serviços garantem que sua plataforma esteja em conformidade com todas as regulamentações e normas de segurança. Realizamos auditorias completas, implementamos protocolos de segurança avançados e fornecemos consultoria especializada em questões legais e regulatórias. Isso protege não apenas a sua empresa, mas também a experiência do usuário, garantindo confiança e lealdade por parte dos jogadores. Mantenha sua operação segura e dentro das leis com a nossa expertise.',
      image: product_5,
    },
    {
      title: 'Desenvolvimento de Aplicativos Móveis',
      description:
        'Com o aumento do uso de dispositivos móveis, é crucial que sua plataforma de iGaming seja acessível em smartphones e tablets. Nossa equipe desenvolve aplicativos móveis personalizados que oferecem uma experiência de usuário excepcional. Garantimos que o design seja responsivo, intuitivo e compatível com diferentes sistemas operacionais. Além disso, otimizamos o desempenho para garantir tempos de carregamento rápidos e integração perfeita com suas plataformas existentes. Expanda seu alcance e aumente o engajamento dos usuários com nossos aplicativos móveis de alta qualidade.',
      image: product_6,
    },
    {
      title: 'Analytics e Relatórios de Performance',
      description:
        'A tomada de decisão baseada em dados é fundamental para o sucesso no iGaming. Oferecemos soluções avançadas de analytics que fornecem insights detalhados sobre o comportamento dos usuários, tendências de mercado e desempenho geral da plataforma. Nossos relatórios personalizáveis permitem que você identifique áreas de melhoria, otimize estratégias de marketing e aumente a rentabilidade. Com acesso a dados em tempo real e análises preditivas, você estará sempre um passo à frente da concorrência.',
      image: product_7,
    },
    {
      title: 'Afiliados e Redes de Afiliados',
      description:
        'As redes de afiliados são uma forma eficaz de expandir sua base de usuários e aumentar a receita. Desenvolvemos e gerenciamos programas de afiliados que conectam sua plataforma a parceiros estratégicos. Cuidamos de tudo, desde a configuração técnica até o monitoramento de desempenho e pagamentos. Nossos sistemas transparentes e confiáveis garantem que seus afiliados estejam motivados e que você obtenha o máximo retorno sobre o investimento. Aproveite o poder do marketing de afiliados para impulsionar seu crescimento.',
      image: product_3,
    },
    {
      title: 'Ferramentas de Retenção de Jogadores',
      description:
        'Manter os jogadores engajados é tão importante quanto atraí-los. Nossas ferramentas de retenção incluem sistemas de recompensas, notificações personalizadas, suporte ao cliente eficiente e muito mais. Analisamos o comportamento dos usuários para criar estratégias que aumentem a lealdade e o tempo gasto na plataforma. Ao implementar técnicas de gamificação e conteúdo relevante, ajudamos a construir uma comunidade sólida em torno da sua marca. Isso não apenas aumenta a satisfação do cliente, mas também melhora a reputação da sua plataforma no mercado.',
      image: product_4,
    },
  ];
export const services = [
  {
    title: 'Segurança',
    description:
      'Garantimos sua plataforma com extrema segurança para você e seu cliente.',
    benefits: [
      'Proteção de dados sensíveis',
      'Monitoramento em tempo real',
      'Recuperação rápida em caso de falhas',
      'Autenticação de dois fatores',
    ],
    icon: faLock,
  },
  {
    title: 'Customização',
    description:
      'Não abra mão do seu diferencial. Deixe a plataforma com a sua cara.',
    benefits: [
      'Temas e cores customizáveis',
      'Layout responsivo',
      'Funcionalidades adaptáveis',
      'Integração com APIs de terceiros',
    ],
    icon: faPencilAlt,
  },
  // ... (adicione os demais serviços aqui)
];

export const products = [
  {
    title: 'Plataforma tipo 1',
    image: product_1,
    link: '/product-details/1',
    benefits: [
      'E-Sports',
      'Cassino',
      'Pragmatic Play',
      'Pg Soft',
      'Manutenções corretivas e preventivas',
      'Hospedagem',
    ],
  },
  {
    title: 'Plataforma tipo 2',
    image: product_1,
    link: '/product-details/2',
    benefits: [
      'Cassino ao Vivo',
      'Apostas Esportivas',
      'Quickspin',
      'Betsoft',
      'Suporte 24/7',
      'Integração com API',
    ],
  },
  // ... (adicione mais produtos se necessário)
];
