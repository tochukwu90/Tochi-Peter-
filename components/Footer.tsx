
import React from 'react';
import { Camera } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center space-x-2">
            <Camera className="w-6 h-6 text-white" />
            <span className="text-xl font-serif tracking-widest uppercase">T-WORLD</span>
          </div>

          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} T-WORLD Studios. All Rights Reserved.
          </div>

          <div className="flex space-x-6 text-[10px] uppercase tracking-widest font-semibold">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
