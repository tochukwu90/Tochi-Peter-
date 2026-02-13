
import React from 'react';
import { Mail, Phone, Instagram } from 'lucide-react';

const Contact: React.FC = () => {
  const phoneNumber = "09074448611";
  const emailAddress = "hello@t-worldstudios.com";
  const instagramHandle = "t_world_studios";

  return (
    <section id="contact" className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl font-serif mb-8">Let's Create Magic Together</h2>
            <p className="text-gray-400 text-lg mb-12 max-w-md">
              Ready to capture your story? Fill out the form or reach out directly to discuss your vision.
            </p>

            <div className="space-y-6">
              <a 
                href={`mailto:${emailAddress}`}
                className="flex items-center space-x-4 group cursor-pointer transition-all"
              >
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Email Us</div>
                  <div className="text-lg group-hover:text-white transition-colors">{emailAddress}</div>
                </div>
              </a>

              <a 
                href={`tel:${phoneNumber}`}
                className="flex items-center space-x-4 group cursor-pointer transition-all"
              >
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Call Us</div>
                  <div className="text-lg group-hover:text-white transition-colors">{phoneNumber}</div>
                </div>
              </a>

              <a 
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 group cursor-pointer transition-all"
              >
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center group-hover:border-white group-hover:bg-white/5 transition-all">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500">Follow Us</div>
                  <div className="text-lg group-hover:text-white transition-colors">@{instagramHandle}</div>
                </div>
              </a>
            </div>
          </div>

          <form className="space-y-8 bg-black/40 p-10 border border-white/5 backdrop-blur-sm" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500">First Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500">Last Name</label>
                <input type="text" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors" />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500">Interest</label>
              <select className="w-full bg-black border-b border-white/10 py-2 focus:border-white outline-none appearance-none">
                <option>Portrait Session</option>
                <option>Wedding Coverage</option>
                <option>Editorial Project</option>
                <option>Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-gray-500">Message</label>
              <textarea className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none h-32 resize-none transition-colors" />
            </div>

            <button type="submit" className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
