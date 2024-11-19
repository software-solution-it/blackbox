import React from 'react';
import Slider from "react-slick";
import logo1 from '../assets/images/logo1.png';
import logo2 from '../assets/images/logo2.png';
import logo3 from '../assets/images/logo3.png';
import logo4 from '../assets/images/logo4.png';
import logo5 from '../assets/images/logo5.png';
import image1 from '../assets/images/image1.png';
import image2 from '../assets/images/image2.png';
import image3 from '../assets/images/image3.png';
import './ProviderSection.css';

class ProvidersSection extends React.Component {
  render() {
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      speed: 3000,
      slidesToShow: 4, // 4 logos por vez no desktop
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: "linear",
      responsive: [
        {
          breakpoint: 1024, // Para tablets
          settings: {
            slidesToShow: 3, // 3 logos por vez no tablet
          },
        },
        {
          breakpoint: 768, // Para smartphones maiores
          settings: {
            slidesToShow: 2, // 2 logos por vez
          },
        },
        {
          breakpoint: 480, // Para smartphones menores
          settings: {
            slidesToShow: 1, // 1 logo por vez
          },
        },
      ],
    };

    const { openModal } = this.props;

    return (
      <section className="providers-section bg-[#1E1E1E] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          {/* Título Responsivo */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl text-orange-500 font-bold my-20">
            Alguns de nossos provedores
          </h2>

          {/* Carrossel de Logos */}
          <div className="mb-10">
            <Slider {...settings}>
              <img src={logo1} alt="PG" className="provider-logo" />
              <img src={logo2} alt="Pragmatic Play" className="provider-logo" />
              <img src={logo3} alt="Pinnacle" className="provider-logo" />
              <img src={logo4} alt="Evoplay" className="provider-logo" />
              <img src={logo5} alt="Ion Casino" className="provider-logo" />
            </Slider>
          </div>

          {/* Botão Responsivo */}
          <button
            onClick={() => openModal('Entre em Contato')}
            className="bg-white text-orange-500 border-2 border-orange-500 px-12 py-2 rounded-lg mt-10 mb-20 font-semibold hover:bg-orange-500"
          >
            Contratar com o melhor preço
          </button>

          {/* Grid de Imagens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="image-container relative">
              <img src={image1} alt="Imagem 1" className="w-full h-auto object-cover" />
              <div className="image-overlay absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center p-4">
                Um cassino é um estabelecimento onde se realizam jogos de azar, como roleta, blackjack e caça-níqueis.
              </div>
            </div>
            <div className="image-container relative">
              <img src={image2} alt="Imagem 2" className="w-full h-auto object-cover" />
              <div className="image-overlay absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center p-4">
                As apostas esportivas envolvem prever os resultados de eventos esportivos e apostar dinheiro com base nas previsões.
              </div>
            </div>
            <div className="image-container relative">
              <img src={image3} alt="Imagem 3" className="w-full h-auto object-cover" />
              <div className="image-overlay absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center p-4">
                As apostas ao vivo permitem que os apostadores façam suas apostas durante o andamento de um evento esportivo.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProvidersSection;
