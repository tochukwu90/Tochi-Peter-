
import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import AIPlanner from './components/AIPlanner';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollControls from './components/ScrollControls';

const App: React.FC = () => {
  // Navigation Key Functions (Global Keyboard Shortcuts)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input/textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      const key = e.key.toLowerCase();
      let targetId = '';

      if (key === '1' || key === 'h') targetId = 'hero';
      if (key === '2' || key === 'p') targetId = 'portfolio';
      if (key === '3' || key === 's') targetId = 'services';
      if (key === '4' || key === 'c') targetId = 'contact';

      if (targetId) {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-black overflow-x-hidden relative">
      <Navbar />
      <ScrollControls />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <Portfolio />
        <AIPlanner />
        <Pricing />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
