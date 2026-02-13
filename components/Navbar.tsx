
import React, { useState, useEffect } from 'react';
import { Camera, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Services', id: 'services' },
    { name: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Background change logic
      setIsScrolled(window.scrollY > 50);

      // Active section tracking logic
      const sections = ['hero', 'portfolio', 'services', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/90 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Camera className="w-8 h-8 text-white" />
          <span className="text-2xl font-serif tracking-widest uppercase">T-WORLD</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => scrollToSection(e, link.id)}
              className={`text-xs font-medium tracking-[0.3em] uppercase transition-all relative py-2 group ${
                activeSection === link.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-0 w-full h-[1px] bg-white transition-transform duration-300 origin-left ${
                activeSection === link.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
              }`} />
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black z-40 p-8 flex flex-col space-y-8 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-2xl font-serif tracking-widest uppercase ${
                activeSection === link.id ? 'text-white italic' : 'text-gray-500'
              }`}
              onClick={(e) => scrollToSection(e, link.id)}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
