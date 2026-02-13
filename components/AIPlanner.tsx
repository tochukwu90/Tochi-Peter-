
import React, { useState } from 'react';
import { Sparkles, Loader2, Lightbulb, MapPin, Shirt, PenTool } from 'lucide-react';
import { getSessionAdvice } from '../services/geminiService';
import { SessionAdvice } from '../types';

const AIPlanner: React.FC = () => {
  const [description, setDescription] = useState('');
  const [advice, setAdvice] = useState<SessionAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlan = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError('');
    try {
      const result = await getSessionAdvice(description);
      setAdvice(result);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-planner" className="py-24 bg-neutral-950 border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <Sparkles className="w-12 h-12 text-white/40 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif mb-4">AI Session Stylist</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Describe your dream photo session—theme, vibe, or mood—and let our AI assistant suggest locations, lighting, and wardrobe to bring it to life.
          </p>
        </div>

        <div className="bg-neutral-900/50 p-8 border border-white/10 backdrop-blur-sm">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., A cinematic moody portrait session in an abandoned library during twilight, with a 1920s jazz age aesthetic..."
            className="w-full h-32 bg-transparent border-b border-white/20 focus:border-white outline-none py-2 resize-none text-white placeholder:text-gray-600 mb-6 transition-colors"
          />
          
          <div className="flex justify-end">
            <button
              onClick={handlePlan}
              disabled={loading || !description}
              className="flex items-center space-x-2 px-8 py-3 bg-white text-black font-semibold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              <span>{loading ? 'Consulting Gemini...' : 'Generate Plan'}</span>
            </button>
          </div>

          {error && <p className="mt-4 text-red-400 text-sm text-center">{error}</p>}
        </div>

        {advice && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="bg-neutral-900 p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4 text-gray-400">
                <PenTool className="w-5 h-5" />
                <h4 className="uppercase tracking-widest text-xs font-semibold">Thematic Concept</h4>
              </div>
              <h3 className="text-2xl font-serif mb-3">{advice.theme}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{advice.creativeNotes}</p>
            </div>

            <div className="bg-neutral-900 p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4 text-gray-400">
                <Lightbulb className="w-5 h-5" />
                <h4 className="uppercase tracking-widest text-xs font-semibold">Lighting Scenarios</h4>
              </div>
              <ul className="space-y-2">
                {advice.lightingSuggestions.map((l, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start">
                    <span className="text-white/20 mr-3">•</span> {l}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900 p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4 text-gray-400">
                <MapPin className="w-5 h-5" />
                <h4 className="uppercase tracking-widest text-xs font-semibold">Location Scout</h4>
              </div>
              <ul className="space-y-2">
                {advice.locationIdeas.map((loc, i) => (
                  <li key={i} className="text-sm text-gray-300 flex items-start">
                    <span className="text-white/20 mr-3">•</span> {loc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-900 p-6 border border-white/5">
              <div className="flex items-center space-x-3 mb-4 text-gray-400">
                <Shirt className="w-5 h-5" />
                <h4 className="uppercase tracking-widest text-xs font-semibold">Wardrobe Direction</h4>
              </div>
              <p className="text-sm text-gray-300 italic">{advice.wardrobeAdvice}</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AIPlanner;
