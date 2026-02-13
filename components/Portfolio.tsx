
import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../constants';
import { PortfolioItem } from '../types';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const categories = ['All', 'Portrait', 'Wedding', 'Landscape', 'Editorial'];

  const filteredItems = filter === 'All' 
    ? PORTFOLIO_ITEMS 
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  const openLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  }, []);

  const navigateLightbox = (direction: 'next' | 'prev') => {
    if (!selectedItem) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedItem.id);
    let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    
    if (nextIndex >= filteredItems.length) nextIndex = 0;
    if (nextIndex < 0) nextIndex = filteredItems.length - 1;
    
    setSelectedItem(filteredItems[nextIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItem, filteredItems, closeLightbox]);

  return (
    <section id="portfolio" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <span className="text-gray-500 uppercase tracking-[0.4em] text-xs mb-4 block">Our Work</span>
            <h2 className="text-4xl md:text-5xl font-serif">A Selected Gallery</h2>
          </div>
          
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm uppercase tracking-widest pb-1 border-b-2 transition-all ${filter === cat ? 'border-white text-white' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => openLightbox(item)}
              className="group relative overflow-hidden aspect-[4/5] bg-neutral-900 cursor-pointer"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center p-8">
                <Maximize2 className="w-8 h-8 text-white/50 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500" />
                <span className="text-white/60 text-[10px] uppercase tracking-[0.3em] mb-2">Explore Project</span>
                <h3 className="text-xl font-serif text-white text-center">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
          <button 
            onClick={closeLightbox}
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
          >
            <X className="w-8 h-8" />
          </button>

          <button 
            onClick={() => navigateLightbox('prev')}
            className="absolute left-4 md:left-8 text-white/30 hover:text-white transition-colors z-[110]"
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button 
            onClick={() => navigateLightbox('next')}
            className="absolute right-4 md:right-8 text-white/30 hover:text-white transition-colors z-[110]"
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          <div className="max-w-5xl w-full px-12 flex flex-col items-center">
            <div className="relative w-full aspect-[4/5] md:aspect-video max-h-[75vh] mb-8 overflow-hidden rounded-sm shadow-2xl">
              <img 
                src={selectedItem.imageUrl} 
                alt={selectedItem.title}
                className="w-full h-full object-contain animate-in zoom-in-95 duration-500"
              />
            </div>
            <div className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-150">
              <span className="text-white/40 text-[10px] uppercase tracking-[0.5em] mb-2 block">{selectedItem.category}</span>
              <h2 className="text-3xl md:text-4xl font-serif text-white">{selectedItem.title}</h2>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
