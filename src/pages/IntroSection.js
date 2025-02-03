import React, { useEffect, useRef } from 'react';
import './IntroSection.css';

const IntroSection = ({ openModal }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const handleResize = () => {
      const section = document.querySelector('.intro-section');
      const width = section.clientWidth;
      const height = section.clientHeight;
      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      
      ctx.scale(dpr, dpr);

      initParticles();
    };

    let particles = [];

    const initParticles = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);
      
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() * 20
      }));
    };

    const animate = () => {
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      ctx.clearRect(0, 0, width, height);
      
      ctx.fillStyle = 'transparent';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        ctx.shadowBlur = 15;
        ctx.shadowColor = `hsla(30, 100%, 50%, ${particle.opacity})`;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${30 + particle.hue}, 100%, 50%, ${particle.opacity})`;
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const handleStartNow = () => {
    openModal('start');
  };

  return (
    <section className="intro-section">
      <canvas ref={canvasRef} className="animated-background" />
      
      <div className="hero-content">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid xl:grid-cols-2 gap-8 xl:gap-16 items-center">
            {/* Coluna da Esquerda */}
            <div className="space-y-8 md:space-y-10 text-left">
              <div className="text-left space-y-6 md:space-y-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-6xl font-bold leading-tight text-white">
  Sua plataforma
  <br className="hidden xl:block" />
  profissional de apostas e cassino
  <br className="hidden xl:block" />
  <span className="text-[#FF6B00]">pronta para operar</span>
</h1>

                <div className="flex flex-wrap gap-3 md:gap-4 py-4">
                  <span className="gaming-chip">Jogos Exclusivos</span>
                  <span className="gaming-chip">Apostas Online</span>
                  <span className="gaming-chip">Cassino ao Vivo</span>
                </div>

                <p className="text-base text-left md:text-lg text-neutral-300 max-w-2xl leading-relaxed space-y-2">
                  Plataforma completa com esportes e slots e cassino ao vivo
                  <br />
                  <span className="whitespace-normal xl:whitespace-nowrap">Tenha até 50% mais conversão em seu site</span>
                  <br />
                  <span className="whitespace-normal xl:whitespace-nowrap">com um sistema de altíssima qualidade e conversão.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button 
                    className="cta-primary px-5 sm:px-6 py-3 rounded-xl text-white text-base w-auto"
                    onClick={handleStartNow}
                  >
                    Começar Agora →
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna da Direita - Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xl:gap-6">
              <div className="stats-card">
                <div className="highlight-number">+1M</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Jogadores</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Ativos em nossa plataforma
                </p>
              </div>

              <div className="stats-card">
                <div className="highlight-number">+500</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Jogos</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Diferentes para você explorar
                </p>
              </div>

              <div className="stats-card">
                <div className="highlight-number">24/7</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Suporte</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Sempre disponível para você
                </p>
              </div>

              <div className="stats-card">
                <div className="highlight-number">100%</div>
                <h3 className="text-sm sm:text-base md:text-lg xl:text-xl font-medium mb-2 text-white">Seguro</h3>
                <p className="text-xs md:text-sm text-neutral-400">
                  Proteção total dos seus dados
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default IntroSection; 