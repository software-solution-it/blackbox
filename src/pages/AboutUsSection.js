import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import logo_footer from '../assets/images/logo_footer.png';

class AboutUsSection extends Component {
  render() {
    return (
      <section className="bg-[#1E1E1E] w-full h-screen flex items-center text-left">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-100 mb-10 font-poppins">
            <span className="text-orange-500">Sobre</span> nós
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-4xl mb-8 leading-relaxed font-poppins">
            Somos um whitelabel especializado em soluções para o mercado de iGaming. Nosso objetivo é fornecer uma plataforma completa e personalizável para nossos parceiros, permitindo que eles lancem rapidamente seu próprio site de jogos com uma experiência de usuário de alta qualidade. Nossa plataforma inclui tudo o que você precisa para gerenciar jogos, usuários, pagamentos e muito mais, com suporte técnico dedicado e uma equipe de especialistas pronta para ajudar a maximizar o seu sucesso. Com nossa solução, você pode focar no crescimento do seu negócio, enquanto nós cuidamos da tecnologia e da operação.
          </p>

          {/* Alinha logo à esquerda, conteúdo no meio e logo_footer à direita */}
          <div className="flex justify-between items-center mt-20">
            <img
              src={logo}
              alt="Sobre nós - iGaming"
              className="rounded-lg shadow-lg"
            />
            
            {/* Conteúdo centralizado */}
            <div className="text-center text-gray-100"> 
              <p className="text-lg font-poppins"><span className='text-orange-500'>BLACK</span>BOX</p>
              <p className="text-sm font-poppins">2024 - Todos os direitos reservados</p>
            </div>
            
            <img
              src={logo_footer}
              alt="Logo Footer"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    );
  }
}

export default AboutUsSection;
