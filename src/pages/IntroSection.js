import React, { Component } from 'react';
import backgroundImage from '../assets/images/background2.png';
import logo from '../assets/images/logo.png';

class IntroSection extends Component {
  render() {
    const { openModal } = this.props;
    return (
      <div className="">
        <section className="intro relative">
          <div
            className="container-fluid flex items-center justify-start p-6 sm:p-12"
            style={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100vh',
              color: 'white',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            <div className="text-left px-6 sm:px-20">
              {/* Logotipo alinhado à esquerda */}
              <div className="flex justify-start mb-2 sm:mb-0" style={{ position: 'relative', top: '-60px' }}>
                <img src={logo} alt="Logo" className="w-32 sm:w-64 h-auto" />
              </div>

              <h2 className="text-4xl sm:text-7xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '600', letterSpacing: '1px', color: 'white' }}>
  Sua plataforma <br /> em até <span className="text-orange-500">10 dias!</span>
</h2>


<p className="text-xl leading-relaxed mt-4 text-white" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '400' }}>
  O <span style={{ fontWeight: 'bold' }}>melhor preço</span> e a melhor tecnologia do Brasil! <br />
  Aqui na Black Box você tem o que precisa para dar <br /> início a sua plataforma própria de iGaming. <br />
  É rápido, fácil e acessível.
</p>

              <button
                onClick={() => openModal('Intro')}
                className="btn bg-orange-500 text-white py-3 px-6 text-lg sm:text-xl mt-20 rounded-lg hover:bg-orange-400 transition-all"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: '500' }}
              >
                Quero meu orçamento em até 5 minutos
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default IntroSection;
