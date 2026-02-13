
import React from 'react';
import { Check } from 'lucide-react';
import { PRICING_TIERS } from '../constants';

const Pricing: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-gray-500 uppercase tracking-[0.4em] text-xs mb-4 block">The Investment</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-16">Tailored Packages</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {PRICING_TIERS.map((tier) => (
            <div 
              key={tier.name}
              className={`p-8 border ${tier.recommended ? 'border-white bg-neutral-900/50' : 'border-white/10 bg-neutral-950'} flex flex-col h-full`}
            >
              {tier.recommended && (
                <span className="text-[10px] uppercase tracking-widest bg-white text-black px-3 py-1 self-start mb-6">Most Popular</span>
              )}
              <h3 className="text-2xl font-serif mb-2">{tier.name}</h3>
              <div className="text-3xl font-light mb-8">{tier.price}</div>
              
              <div className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-3 text-sm text-gray-400">
                    <Check className="w-4 h-4 text-white" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 uppercase tracking-widest text-xs font-semibold transition-all ${tier.recommended ? 'bg-white text-black hover:bg-gray-200' : 'border border-white/20 hover:border-white'}`}>
                Inquire Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
