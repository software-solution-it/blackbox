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
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 0,
      cssEase: "linear",
    };

    const { openModal } = this.props;

    return (
      <section className="providers-section bg-[#1E1E1E] min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl text-orange-500 font-bold my-20">Alguns de nossos provedores</h2>
          <div className="mb-10">
            <Slider {...settings}>
              <img src={logo1} alt="PG" className="provider-logo" />
              <img src={logo2} alt="Pragmatic Play" className="provider-logo" />
              <img src={logo3} alt="Pinnacle" className="provider-logo" />
              <img src={logo4} alt="Evoplay" className="provider-logo" />
              <img src={logo5} alt="Ion Casino" className="provider-logo" />
            </Slider>
          </div>
          <button
            onClick={() => openModal('Entre em Contato')}
            className="bg-white text-orange-500 border-2 border-orange-500 px-12 py-2 rounded-lg mt-10 mb-20 font-semibold hover:bg-orange-500"
          >
            Contratar com o melhor preço
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="image-container">
              <img src={image1} alt="Imagem 1" />
              <div className="image-overlay">Um cassino é um estabelecimento onde se realizam jogos de azar, como roleta, blackjack e caça-níqueis, oferecendo entretenimento e a possibilidade de ganhos monetários</div>
            </div>
            <div className="image-container">
              <img src={image2} alt="Imagem 2" />
              <div className="image-overlay">As apostas esportivas envolvem prever os resultados de eventos esportivos e apostar dinheiro com base nessas previsões, abrangendo modalidades como futebol, basquete e corridas de cavalos</div>
            </div>
            <div className="image-container">
              <img src={image3} alt="Imagem 3" />
              <div className="image-overlay">As apostas ao vivo permitem que os apostadores façam suas apostas durante o andamento de um evento esportivo, ajustando suas previsões em tempo real conforme o jogo se desenrola." 
BETPASS

Essas descrições oferecem uma visão clara e concisa de cada tema, enriquecendo a interação do usuário com o conteúdo apresentado</div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ProvidersSection;
