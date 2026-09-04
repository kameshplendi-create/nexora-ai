import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PageSection } from '../types';

interface FooterProps {
  onNavigate: (section: PageSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#020617] border-t border-white/10 pt-16 pb-12 overflow-hidden text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-wider">
                NEXORA <span className="text-blue-400">AI</span>
              </span>
            </div>

            <p className="text-xs font-mono text-blue-400 font-medium">
              TAGLINE: The Next Realm of AI
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An original AI technology platform dedicated to transparent education, practical tooling, autonomous workflows, custom enterprise architectures, and physical robotics systems.
            </p>

            {/* Live Infrastructure Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>NEXORA Neural Engine: All Clusters Operational</span>
            </div>
          </div>

          {/* Quick Links: Education & Products */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Platform & Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('education')} className="hover:text-blue-300 transition-colors">
                  AI Education & Courses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-blue-300 transition-colors">
                  AI Products Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('automation')} className="hover:text-blue-300 transition-colors">
                  Automation FlowEngine
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshops')} className="hover:text-blue-300 transition-colors">
                  Live Masterclass Workshops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('upgrade')} className="hover:text-blue-300 transition-colors text-blue-400 font-semibold">
                  NEXORA Pro (₹299/mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Domain Specializations */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Specializations
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('legal')} className="hover:text-blue-300 transition-colors">
                  Legal AI Framework
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('robotics')} className="hover:text-blue-300 transition-colors">
                  Robotics + Physical AI
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('solutions')} className="hover:text-blue-300 transition-colors">
                  Custom AI Architecture
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-blue-300 transition-colors">
                  Research Papers & Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Regulatory & Disclaimers */}
          <div>
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
              Compliance
            </h4>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] leading-relaxed text-slate-400">
              <span className="font-semibold text-amber-400 block mb-1">Legal Notice:</span>
              AI-generated information is for educational and informational purposes and is not a substitute for professional legal advice.
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} NEXORA AI. All rights reserved. Original AI platform architecture.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
