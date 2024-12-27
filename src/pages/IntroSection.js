import React, { useEffect, useRef } from 'react';
import logo from '../assets/images/logo.png';
import './IntroSection.css';

const IntroSection = ({ openModal }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: Math.random() * 2 - 1,
      speedY: Math.random() * 2 - 1,
      opacity: Math.random() * 0.5 + 0.2
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0A0A0A');
      gradient.addColorStop(1, '#1A1A1A');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 107, 0, 0.5)';
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 107, 0, ${particle.opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="intro-section">
      <canvas ref={canvasRef} className="animated-background" />
      
      <div className="hero-content">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid xl:grid-cols-2 gap-8 xl:gap-16 items-center">
            {/* Coluna da Esquerda */}
            <div className="space-y-6 md:space-y-8">
              <div className="logo-container">
                <img
                  src={logo}
                  alt="BlackBox"
                  className="w-28 sm:w-32 md:w-40 xl:w-48 hover:opacity-90 transition-all logo-glow"
                />
              </div>

              <div className="space-y-4 md:space-y-6">
                <h1 className="hero-title text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold leading-tight">
                Seu site de apostas online e cassino 
                  <br className="hidden xl:block" />
                  a partir de R$300,00
                  <br className="hidden xl:block" />
                </h1>

                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className="gaming-chip">Pronto em 3 dias</span>
                  <span className="gaming-chip">Suporte 24/7</span>
                  <span className="gaming-chip">100% personalizado</span>
                </div>

                <p className="text-base md:text-lg text-neutral-300 max-w-2xl leading-relaxed">
                  Plataforma completa com esportes e slots e cassino ao vivo
                  <br />
                  <span className="whitespace-normal xl:whitespace-nowrap">Tenha até 50% mais conversão em seu site</span>
                  <br />
                  <span className="whitespace-normal xl:whitespace-nowrap">com um sistema de altíssima qualidade e conversão.</span>
                  
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => openModal('Intro')}
                    className="cta-primary px-5 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl text-white text-sm md:text-base w-full sm:w-auto"
                  >
                    Falar com especialista →
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna da Direita - Stats Cards em grid 2x2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6">
              <div className="stats-card">
                <div className="highlight-number text-xl sm:text-2xl md:text-3xl xl:text-4xl">+500</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Clientes Ativos</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Empresas confiam em nossa tecnologia
                </p>
              </div>

              <div className="stats-card">
                <div className="highlight-number text-xl sm:text-2xl md:text-3xl xl:text-4xl">99.9%</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Uptime Garantido</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Disponibilidade máxima para seu negócio
                </p>
              </div>

              <div className="stats-card">
                <div className="highlight-number text-xl sm:text-2xl md:text-3xl xl:text-4xl">24/7</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Suporte Premium</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Equipe especializada sempre disponível
                </p>
              </div>

              <div className="stats-card">
                <div className="highlight-number text-xl sm:text-2xl md:text-3xl xl:text-4xl">3 dias</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Setup Rápido</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Do conceito ao lançamento em 3 dias
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de próxima seção */}
      <div className="next-section-space">
      </div>
    </section>
  );
};

export default IntroSection;
