import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { CrystalCore3D } from './3d/CrystalCore3D';

interface UpgradeSectionProps {
  onOpenCheckoutDemo: () => void;
  isUpgraded: boolean;
}

export const UpgradeSection: React.FC<UpgradeSectionProps> = ({
  onOpenCheckoutDemo,
  isUpgraded
}) => {
  const freeFeatures = [
    'Access to core AI Fundamentals courses',
    'Standard community product sandboxes (10 runs/day)',
    'Public technical articles and tutorials',
    'Standard community Discord access',
    'Standard model latency queue'
  ];

  const proFeatures = [
    'Unlimited access to all Advanced & Generative AI curricula',
    'Full interactive execution in NEXORA FlowEngine & LexiCheck',
    'Priority seat reservations in live expert masterclasses',
    'Premium AI research whitepapers & raw architectural notebooks',
    'Additional AI productivity features & multi-agent execution',
    'Priority access to selected experimental foundation models',
    'Verified certification credentials & project evaluations'
  ];

  return (
    <section id="upgrade" className="py-24 relative overflow-hidden bg-[#020617]/70">
      {/* Dynamic Background Radiance */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/3 w-[400px] h-[400px] bg-indigo-900/15 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>NEXORA AI SUBSCRIPTION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Elevate Your AI Capabilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Choose the plan tailored to your technical growth. Unlock premium research, interactive execution pipelines, and live masterclasses.
          </p>
        </div>

        {/* Pricing Cards Layout with 3D Crystal Core */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Free Tier Card */}
          <div className="lg:col-span-4 p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between h-full backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  COMMUNITY TIER
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-xs font-mono">
                  FREE
                </span>
              </div>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-4xl font-bold text-white">₹0</span>
                <span className="text-slate-400 text-sm font-mono">/ month</span>
              </div>

              <p className="text-slate-400 text-xs leading-relaxed mb-6">
                Foundational access for students, researchers, and developers exploring artificial intelligence fundamentals.
              </p>

              <div className="space-y-3 mb-8">
                {freeFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="w-full py-3 rounded-full bg-white/5 border border-white/10 text-slate-400 text-xs font-semibold text-center">
                Current Standard Plan
              </div>
            </div>
          </div>

          {/* Premium NEXORA AI UPGRADE Tier with 3D Crystal AI Core */}
          <div className="lg:col-span-8 relative rounded-3xl bg-gradient-to-br from-blue-900/40 via-indigo-900/20 to-black/40 border border-blue-500/50 p-8 sm:p-10 shadow-[0_0_50px_rgba(59,130,246,0.25)] backdrop-blur-md">
            
            {/* Top Ribbon */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold font-mono tracking-wider uppercase">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>NEXORA AI UPGRADE</span>
              </div>

              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>INSTANT ACTIVATION</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Column of Upgrade Card: Details & Price */}
              <div className="md:col-span-7">
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-display text-4xl sm:text-5xl font-extrabold text-white">
                    ₹299
                  </span>
                  <span className="text-blue-400 text-sm sm:text-base font-mono font-semibold">
                    / month
                  </span>
                </div>

                <p className="text-slate-200 text-sm leading-relaxed mb-6 font-medium">
                  Complete access to advanced learning curricula, production-grade automated tools, and priority interactive masterclasses.
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-8">
                  {proFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                      <div className="p-0.5 rounded-full bg-blue-500/20 text-blue-300 mt-0.5 shrink-0">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="space-y-3">
                  <button
                    onClick={onOpenCheckoutDemo}
                    className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
                  >
                    <Sparkles className="w-5 h-5 fill-current" />
                    <span>{isUpgraded ? 'PRO MEMBERSHIP ACTIVE' : 'UPGRADE NOW (₹299/mo)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                      Simulation Checkout Ready
                    </span>
                    <span>Cancel anytime • No credit card required in demo</span>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Crystal / Glass AI Core Visual */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-xs relative aspect-square">
                  <CrystalCore3D className="w-full h-full" />
                </div>
                <div className="text-center mt-2">
                  <span className="text-[11px] font-mono text-blue-300 tracking-wider block font-semibold">
                    CRYSTAL AI CORE
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Reflective 3D neural catalyst
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
