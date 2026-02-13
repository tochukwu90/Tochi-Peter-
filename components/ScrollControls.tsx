
import React, { useState, useEffect } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

const ScrollControls: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sections = ['hero', 'portfolio', 'ai-planner', 'services', 'contact'];

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const getTargetSection = (direction: 'up' | 'down') => {
    const currentScroll = window.scrollY + 200; // Offset for better detection
    const sectionElements = sections.map(id => document.getElementById(id));
    
    const positions = sectionElements
      .filter((el): el is HTMLElement => el !== null)
      .map(el => ({ id: el.id, top: el.offsetTop }));

    if (direction === 'down') {
      const next = positions.find(p => p.top > currentScroll);
      return next ? next.id : null;
    } else {
      const prev = [...positions].reverse().find(p => p.top < currentScroll - 300);
      return prev ? prev.id : 'hero';
    }
  };

  const scrollTo = (direction: 'up' | 'down') => {
    const targetId = getTargetSection(direction);
    if (targetId) {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (direction === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (direction === 'down') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed right-6 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-2 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
      <div className="flex flex-col bg-black/40 backdrop-blur-md border border-white/10 rounded-full p-1.5 shadow-2xl">
        <button
          onClick={() => scrollTo('up')}
          className="p-3 hover:bg-white/10 rounded-full transition-colors group"
          aria-label="Scroll Up"
        >
          <ChevronUp className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        </button>
        <div className="h-[1px] w-4 bg-white/10 mx-auto" />
        <button
          onClick={() => scrollTo('down')}
          className="p-3 hover:bg-white/10 rounded-full transition-colors group"
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
        </button>
      </div>
      
      {/* Visual indicator of progress */}
      <div className="absolute -right-2 top-0 h-full w-[2px] bg-white/5 rounded-full overflow-hidden">
        <div 
          className="bg-white/40 w-full transition-all duration-300 ease-out"
          style={{ 
            height: `${(typeof window !== 'undefined' ? (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100 : 0)}%` 
          }}
        />
      </div>
    </div>
  );
};

export default ScrollControls;
