import React, { useState } from 'react';
import { Scale, ShieldAlert, FileText, CheckCircle2, AlertTriangle, Search, BookOpen } from 'lucide-react';

export const LegalAISection: React.FC = () => {
  const [selectedClauseIndex, setSelectedClauseIndex] = useState(0);

  const sampleClauses = [
    {
      title: 'Limitation of Liability & Gross Negligence Exception',
      category: 'Commercial Contracts',
      rawText: '"Neither party shall be liable for indirect, incidental, or consequential damages. In no event shall Total Aggregate Liability exceed the fees paid in the prior three (3) months, excluding damages arising from gross negligence or willful misconduct."',
      riskLevel: 'Low Risk • Standard Commercial Term',
      analysis: 'Clause adheres to standard bilateral risk apportionment. The exclusion for gross negligence preserves statutory tort liability protections across common-law jurisdictions.',
      suggestions: [
        'Confirm whether the 3-month lookback matches your company insurance limits',
        'Verify mutual indemnification obligations remain unaffected by this cap'
      ]
    },
    {
      title: 'Non-Solicitation & Restrictive Geographic Scope',
      category: 'Employment & Service Agreements',
      rawText: '"During the term and for a period of twenty-four (24) months post-termination, Contractor shall not directly or indirectly solicit, induce, or employ any personnel of Client located anywhere globally."',
      riskLevel: 'High Risk • Potential Enforceability Breach',
      analysis: 'The 24-month duration coupled with a worldwide geographical restriction frequently violates antitrust and restraint-of-trade statutes under recent FTC guidelines and state judicial precedents.',
      suggestions: [
        'Consider narrowing the temporal scope from 24 months down to 12 months',
        'Limit geographic applicability strictly to territories where contractor actively operated'
      ]
    },
    {
      title: 'Intellectual Property Assignment & Pre-Existing Works',
      category: 'Technology Licensing',
      rawText: '"Consultant irrevocably assigns all right, title, and interest in all deliverables and conceptual discoveries made during the engagement, without reservation of prior proprietary background assets."',
      riskLevel: 'Moderate Risk • Overbroad Asset Forfeiture',
      analysis: 'Failing to carve out "Background IP" and pre-existing library frameworks could inadvertently transfer title to pre-existing codebases and third-party open-source components.',
      suggestions: [
        'Insert an explicit "Carve-out for Background Technology" schedule in Exhibit A',
        'Grant a non-exclusive license for pre-existing tools rather than outright assignment'
      ]
    }
  ];

  const currentClause = sampleClauses[selectedClauseIndex];

  return (
    <section id="legal" className="py-20 relative overflow-hidden bg-[#020617]/60 border-y border-white/10">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* MANDATORY LEGAL DISCLAIMER BANNER */}
        <div className="mb-10 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3.5 shadow-lg backdrop-blur-md">
          <ShieldAlert className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
          <div className="text-xs text-amber-200 leading-relaxed font-medium">
            <span className="font-bold uppercase tracking-wider block mb-0.5 text-amber-300 font-mono">
              IMPORTANT REGULATORY COMPLIANCE NOTICE:
            </span>
            AI-generated information is for educational/informational purposes and is not a substitute for professional legal advice. Always consult a licensed attorney for binding counsel.
          </div>
        </div>

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Scale className="w-3.5 h-3.5" />
            <span>STATUTORY & DOCUMENT INTELLIGENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            NEXORA Legal AI Framework
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Accelerate document understanding, contract clause decomposition, statutory Q&A, and regulatory education with strict citation grounding.
          </p>
        </div>

        {/* 4 Pillars of NEXORA Legal AI */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-white text-base mb-1.5">Document Understanding</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Extract buried indemnification terms, termination triggers, and payment milestones across 500+ page archives in seconds.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3">
              <Scale className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-white text-base mb-1.5">Legal Information Assist</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Cross-reference clauses against standard industry templates and statutory regulatory frameworks.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center mb-3">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-white text-base mb-1.5">AI Question Answering</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Natural language queries grounded exclusively in your uploaded agreements with zero speculative hallucinations.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="font-display font-bold text-white text-base mb-1.5">Legal Education & Ethics</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Interactive legal tech modules teaching ethical prompt engineering, privilege protection, and automated due diligence.
            </p>
          </div>
        </div>

        {/* Interactive Contract Clause Analysis Sandbox */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider block">
                INTERACTIVE CLAUSE AUDITOR (DEMO SANDBOX)
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1">
                Real-Time Risk Classification & Plain-Language Breakdown
              </h3>
            </div>

            {/* Clause Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
              {sampleClauses.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedClauseIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedClauseIndex === idx
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  Clause 0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Clause Content & AI Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Raw Clause */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium text-slate-400">INGESTED CONTRACT SNIPPET</span>
                <span className="text-[11px] font-mono text-slate-500">{currentClause.category}</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs sm:text-sm font-mono leading-relaxed italic">
                {currentClause.rawText}
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <span>Parsed via NEXORA LexiCheck OCR & syntactic token parser</span>
              </div>
            </div>

            {/* Right: AI Risk Analysis & Recommendations */}
            <div className="lg:col-span-6 space-y-4">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  AI RISK DIAGNOSTIC
                </span>
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                  currentClause.riskLevel.includes('High') 
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                    : currentClause.riskLevel.includes('Moderate')
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{currentClause.riskLevel}</span>
                </div>
              </div>

              {/* Analysis */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentClause.analysis}
              </div>

              {/* Suggestions */}
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  SUGGESTED NEGOTIATION SAFEGUARDS
                </span>
                <div className="space-y-2">
                  {currentClause.suggestions.map((sug, sIdx) => (
                    <div key={sIdx} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 flex items-start gap-2">
                      <span className="text-blue-400 font-bold">•</span>
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
