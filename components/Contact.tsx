
import React, { useState } from 'react';
import { Mail, Phone, Instagram, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { generateAutoReply } from '../services/geminiService';

const Contact: React.FC = () => {
  const phoneNumber = "09074448611";
  const emailAddress = "hello@t-worldstudios.com";
  const instagramHandle = "t_world_studios";

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    interest: 'Portrait Session',
    message: ''
  });

  // UI States
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [autoReplyPreview, setAutoReplyPreview] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    setStatus('loading');
    
    try {
      // Simulate API call delay while fetching a personalized response from Gemini
      const fullName = `${formData.firstName} ${formData.lastName}`.trim();
      const reply = await generateAutoReply(fullName, formData.interest, formData.message);
      
      // Artificial delay for professional feel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setAutoReplyPreview(reply);
      setStatus('success');
      
      // Optional: Log submission data
      console.log("Form Submitted:", formData);
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      interest: 'Portrait Session',
      message: ''
    });
    setStatus('idle');
    setAutoReplyPreview('');
  };

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

          <div className="relative overflow-hidden min-h-[500px]">
            {status === 'success' ? (
              <div className="bg-neutral-900 border border-white/10 p-10 h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-500">
                <CheckCircle2 className="w-16 h-16 text-white mb-6" />
                <h3 className="text-3xl font-serif mb-4">Message Sent</h3>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm">
                  Thank you for reaching out. We have received your inquiry. Here is a preview of the confirmation we just sent to your inbox:
                </p>
                <div className="bg-black/40 p-6 rounded border border-white/5 text-left mb-10 italic text-sm text-gray-300 font-light leading-loose">
                  "{autoReplyPreview}"
                </div>
                <button 
                  onClick={resetForm}
                  className="flex items-center space-x-2 text-[10px] uppercase tracking-[0.3em] text-white hover:text-gray-400 transition-colors"
                >
                  <span>Send Another Inquiry</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <form className="space-y-8 bg-black/40 p-10 border border-white/5 backdrop-blur-sm transition-opacity duration-300" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Email Address *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none transition-colors" 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Interest</label>
                  <select 
                    name="interest"
                    value={formData.interest}
                    onChange={handleInputChange}
                    className="w-full bg-black border-b border-white/10 py-2 focus:border-white outline-none appearance-none cursor-pointer"
                  >
                    <option value="Portrait Session">Portrait Session</option>
                    <option value="Wedding Coverage">Wedding Coverage</option>
                    <option value="Editorial Project">Editorial Project</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-gray-500">Message *</label>
                  <textarea 
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-transparent border-b border-white/10 py-2 focus:border-white outline-none h-32 resize-none transition-colors" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
                {status === 'error' && (
                  <p className="text-red-400 text-[10px] uppercase text-center tracking-widest mt-4">Failed to send. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
