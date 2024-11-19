import React, { Component } from 'react';
import Slider from 'react-slick';
import plataforma_1 from '../assets/images/plataforma_1.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ProductsSection.css';

const products = [
  {
    title: 'Plataforma tipo 1',
    image: plataforma_1,
    link: '/product-details/1',
    benefits: [
      'E-Sports',
      'Cassino',
      'Pragmatic Play',
      'Pg Soft',
      'Manutenções corretivas e preventivas',
      'Hospedagem',
    ],
    contents: [
      'Plataforma completa',
      'Suporte dedicado',
      'Atualizações automáticas',
      'Integração com provedores',
    ],
  },
  {
    title: 'Plataforma tipo 2',
    image: plataforma_1,
    link: '/product-details/2',
    benefits: [
      'Cassino ao Vivo',
      'Apostas Esportivas',
      'Quickspin',
      'Betsoft',
      'Suporte 24/7',
      'Integração com API',
    ],
    contents: [
      'Personalização avançada',
      'Analytics em tempo real',
      'Ferramentas de marketing',
      'Segurança aprimorada',
    ],
  },
];

class ProductsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSlide: 0,
    };
    this.sliderRef = React.createRef();
  }

  handleBeforeChange = (current, next) => {
    this.setState({ activeSlide: next });
  };

  render() {
    const { openModal } = this.props;
    const { activeSlide } = this.state;

    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '15%',
      nextArrow: <div className="slick-arrow slick-next">&#x2192;</div>,
      prevArrow: <div className="slick-arrow slick-prev">&#x2190;</div>,
      beforeChange: this.handleBeforeChange,
    };

    return (
      <div>
        <section className="products h-screen flex flex-col justify-center bg-[#1E1E1E]">
          <div className="container mx-auto text-center bg-[#1E1E1E]">
            <h2 className="text-7xl sm:text-6xl font-bold text-orange-500 mb-3 title-margin">
              Nossos Produtos
            </h2>

            <Slider {...sliderSettings} ref={this.sliderRef} className="mx-auto w-full max-w-7xl">
              {products.map((product, index) => (
                <div key={index} className="px-4">
                  <div
                    className={`product-card ${index === activeSlide ? 'active-slide' : ''}`}
                    style={{
                      backgroundImage: `url(${product.image})`,
                    }}
                  >
                    <div className="overlay px-5">Passe o mouse para visualizar</div>
                    <div className="product-info">
                      <h3>{product.title}</h3>
                      <div className="content-columns">
                        <div className="content-section">
                          <h4 className="mb-3">Benefícios</h4>
                          <ul>
                            {product.benefits.map((benefit, i) => (
                              <li key={i}>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="content-section">
                          <h4>Conteúdo</h4>
                          <ul>
                            {product.contents.map((content, i) => (
                              <li key={i}>{content}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <button
              onClick={() => openModal('Entre em Contato')}
              className="btn bg-orange-500 text-white py-3 px-24 text-xl sm:text-2xl mt-12 rounded-lg hover:bg-orange-400 transition-all hidden md:block mx-auto"
            >
              Entre em Contato
            </button>
          </div>
        </section>
      </div>
    );
  }
}

export default ProductsSection;
