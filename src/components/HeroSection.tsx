import React from 'react';
import { Sparkles, ArrowRight, GraduationCap, Boxes, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { HeroNeuralSphere } from './3d/HeroNeuralSphere';
import { PageSection } from '../types';

interface HeroSectionProps {
  onNavigate: (section: PageSection) => void;
  onOpenUpgrade: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenUpgrade }) => {
  return (
    <section id="home" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand, Mission, Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Tagline Pill with Atmospheric Radar Ping */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              <span>The Next Realm of AI</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400 mb-6">
              Evolve the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400">
                Human Logic.
              </span>
            </h1>

            {/* Descriptive Introduction */}
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed mb-8">
              Experience Nexora AI, an original unified ecosystem for education, automation, custom solutions, and high-fidelity physical robotics. Scale your vision with the world's most adaptive intelligence platform.
            </p>

            {/* 4 Hero Action Buttons */}
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              {/* 1. Explore AI (Primary White Button) */}
              <button
                onClick={() => onNavigate('solutions')}
                className="group relative flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-slate-950 hover:bg-slate-200 rounded-xl font-bold text-sm transition-all shadow-lg shadow-white/10 hover:scale-[1.02]"
              >
                <span>Explore Nexora</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* 2. Explore Products */}
              <button
                onClick={() => onNavigate('products')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 border border-white/10 hover:border-white/30 rounded-xl font-semibold text-white text-sm transition-all hover:bg-white/10"
              >
                <Boxes className="w-4 h-4 text-blue-400" />
                <span>Products</span>
              </button>

              {/* 3. Learn AI */}
              <button
                onClick={() => onNavigate('education')}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-white/5 border border-white/10 hover:border-white/30 rounded-xl font-semibold text-white text-sm transition-all hover:bg-white/10"
              >
                <GraduationCap className="w-4 h-4 text-indigo-400" />
                <span>Education</span>
              </button>

              {/* 4. Upgrade */}
              <button
                onClick={onOpenUpgrade}
                className="flex items-center justify-center gap-2 px-5 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm transition-all shadow-lg shadow-blue-600/30 hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Upgrade ₹299</span>
              </button>
            </div>

            {/* Trust & Platform Integrity Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full text-slate-400 text-xs font-mono">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Deterministic Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Edge & Cloud Sync</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Privacy-First Architecture</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D AI Neural Sphere with Floating HUD Metric Badge */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-lg aspect-square relative">
              <HeroNeuralSphere className="w-full h-full" />

              {/* Floating Atmospheric HUD Telemetry Badge from Design Spec */}
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 bg-white/10 backdrop-blur-lg border border-white/15 p-3.5 rounded-2xl shadow-2xl pointer-events-none z-20">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                  Processing Speed
                </div>
                <div className="text-xl font-mono text-blue-400 font-bold">
                  842.4 <span className="text-xs text-slate-300">TFLOPS</span>
                </div>
              </div>

              {/* Secondary Floating Latency Badge */}
              <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 bg-white/10 backdrop-blur-lg border border-white/15 p-3 sm:p-3.5 rounded-2xl shadow-2xl pointer-events-none z-20">
                <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mb-1">
                  Neural Latency
                </div>
                <div className="text-lg font-mono text-emerald-400 font-bold">
                  420ms <span className="text-xs text-slate-300 font-normal">P99</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Atmospheric Metric Cards Grid from Design Spec */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 text-blue-400 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-1 text-sm sm:text-base">AI Education</h3>
            <p className="text-xs sm:text-sm text-slate-400">Master machine learning, deep NLP, and vision models.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:scale-110 transition-transform">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-1 text-sm sm:text-base">Automation</h3>
            <p className="text-xs sm:text-sm text-slate-400">Seamless trigger-action nodes for autonomous business workflows.</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group">
            <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4 text-indigo-400 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-1 text-sm sm:text-base">Robotics</h3>
            <p className="text-xs sm:text-sm text-slate-400">Next-gen mechanical movement powered by neural nodes.</p>
          </div>

          <div 
            onClick={onOpenUpgrade}
            className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-800 border border-white/10 rounded-2xl p-6 shadow-2xl group cursor-pointer"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center text-white">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="bg-black/30 text-[10px] px-2 py-1 rounded text-white font-bold tracking-wider">
                  PREMIUM
                </div>
              </div>
              <h3 className="font-bold mb-1 text-white text-sm sm:text-base">Nexora Upgrade</h3>
              <p className="text-xs text-blue-100 mb-3">Unlock advanced 175B parameter custom models.</p>
              <div className="flex items-baseline gap-1 text-white">
                <span className="text-2xl font-bold font-display">₹299</span>
                <span className="text-xs opacity-80">/month</span>
              </div>
            </div>
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform" />
          </div>
        </div>

      </div>
    </section>
  );
};
