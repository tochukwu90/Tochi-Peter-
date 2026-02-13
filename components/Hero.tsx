import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToPortfolio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById('portfolio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.imgur.com/J22NuY4.jpg" 
          alt="T-WORLD Studios Hero" 
          className="w-full h-full object-cover opacity-60 scale-105 animate-[pulse_8s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-6xl md:text-8xl font-serif mb-6 leading-tight tracking-tight">
          Capturing the <br /> <span className="italic text-gray-400">Soul of the Moment</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Bespoke photography for the visionaries, the dreamers, and the timeless romantics.
          We don't just take pictures; we craft legacies.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="#portfolio" 
            onClick={scrollToPortfolio}
            className="px-10 py-4 bg-white text-black font-semibold uppercase tracking-widest text-sm hover:bg-gray-200 transition-all flex items-center group cursor-pointer"
          >
            Explore Portfolio
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-50 cursor-pointer"
        onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50"></div>
      </div>
    </section>
  );
};

export default Hero;