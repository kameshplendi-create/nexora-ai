import React, { useState } from 'react';
import { Layers, CheckCircle2, ArrowRight, ShieldCheck, Cpu, Database, Network, Sparkles, Building2 } from 'lucide-react';

interface SolutionsSectionProps {
  onOpenConsultationModal: () => void;
}

export const SolutionsSection: React.FC<SolutionsSectionProps> = ({ onOpenConsultationModal }) => {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  const architectureLayers = [
    {
      id: 0,
      name: 'Client & Edge Layer',
      tag: 'Tier 1 • Interface & Sensors',
      desc: 'Mobile apps, IoT cameras, robotics endpoints, and web clients communicating over low-latency WebSockets.',
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      specs: ['WebRTC / gRPC streaming', 'On-device INT8 quantization', 'Local biometric & PII scrubbing']
    },
    {
      id: 1,
      name: 'NEXORA Cognitive Engine',
      tag: 'Tier 2 • Multi-Agent Pipeline',
      desc: 'Dynamic prompt graphs, constrained grammar decoding, and self-healing agent swarms with human-in-the-loop audit.',
      icon: <Network className="w-5 h-5 text-indigo-400" />,
      specs: ['Grammar-guided schema outputs', 'Context-aware tool routing', 'Automated latency arbitration']
    },
    {
      id: 2,
      name: 'Vector Latency & Memory',
      tag: 'Tier 3 • Knowledge Grounding',
      desc: 'High-dimensional indexing with hybrid BM25 + dense semantic search and cross-encoder re-ranking.',
      icon: <Database className="w-5 h-5 text-sky-400" />,
      specs: ['Sub-15ms HNSW retrieval', 'Episodic memory caches', 'Encrypted customer tenancy isolation']
    },
    {
      id: 3,
      name: 'Enterprise Security & Audit',
      tag: 'Tier 4 • Regulatory Compliance',
      desc: 'Hardware security modules, tamper-evident cryptographic logs, and strict role-based policy enforcement.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      specs: ['SOC2 Type II compliance controls', 'Immutable cryptographic hash chains', 'Air-gapped deployment readiness']
    }
  ];

  const solutionCapabilities = [
    {
      title: 'AI Consulting & Readiness Audits',
      description: 'Comprehensive technical roadmap identifying ROI-positive automation vectors, data pipelines, and compliance prerequisites.'
    },
    {
      title: 'End-to-End AI Implementation',
      description: 'Deploy specialized neural models directly into your existing cloud infrastructure with zero downtime.'
    },
    {
      title: 'Intelligent Workflow Design',
      description: 'Transform complex asynchronous business workflows into self-healing, agentic execution graphs.'
    },
    {
      title: 'Custom Proprietary AI Development',
      description: 'Domain-adapted models fine-tuned on your proprietary technical corpus under total IP confidentiality.'
    },
    {
      title: 'Business Systems AI Integration',
      description: 'Direct connectors for legacy ERPs, CRMs, document repositories, and operational hardware endpoints.'
    }
  ];

  return (
    <section id="solutions" className="py-20 relative overflow-hidden bg-[#020617]/70">
      {/* Background Accent */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>ENTERPRISE ARCHITECTURES</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Custom AI Solutions & Infrastructure
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
              From strategic architectural blueprints to production deployment, we engineer bespoke AI systems tailored precisely to your operational constraints.
            </p>
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenConsultationModal}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all shrink-0 hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Build Your AI Solution</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3D AI Architecture Visual & Interactive Stack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          {/* Left: 3D Stack Visualization */}
          <div className="lg:col-span-6">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>NEXORA 3D ARCHITECTURAL STACK (Click Layer to Inspect)</span>
            </div>

            <div className="space-y-3 perspective-1000">
              {architectureLayers.map((layer, idx) => {
                const isSelected = activeLayer === idx;
                return (
                  <div
                    key={layer.id}
                    onClick={() => setActiveLayer(idx)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 transform-style-3d border backdrop-blur-md ${
                      isSelected
                        ? 'bg-white/10 border-blue-500 -translate-y-1 shadow-[0_10px_30px_rgba(59,130,246,0.25)]'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                          {layer.icon}
                        </div>
                        <div>
                          <h4 className="font-display font-bold text-white text-base">
                            {layer.name}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-400 block">
                            {layer.tag}
                          </span>
                        </div>
                      </div>
                      <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                        isSelected ? 'bg-blue-500/20 text-blue-300 font-semibold' : 'text-slate-400'
                      }`}>
                        {isSelected ? 'ACTIVE VIEW' : 'SELECT'}
                      </span>
                    </div>

                    {isSelected && (
                      <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-300">
                        <p className="mb-2 leading-relaxed">{layer.desc}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                          {layer.specs.map((spec, sIdx) => (
                            <div key={sIdx} className="p-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono text-blue-300">
                              ✓ {spec}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Consulting Capabilities Grid */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="font-display text-2xl font-bold text-white mb-2">
              Capabilities Engineered for Enterprise Scale
            </h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              We eliminate technical debt by decoupling client layers from autonomous AI orchestrators, guaranteeing sub-second response times and deterministic business logic.
            </p>

            <div className="space-y-3">
              {solutionCapabilities.map((cap, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all flex items-start gap-3 backdrop-blur-md">
                  <div className="p-1 rounded-full bg-blue-500/20 text-blue-400 mt-0.5 shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white font-display">
                      {cap.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={onOpenConsultationModal}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold transition-all"
              >
                <span>Request Custom Architecture Proposal</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
