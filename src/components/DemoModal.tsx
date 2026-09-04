import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, Course, Workshop, Resource } from '../types';

export type ActiveModalType = 
  | { type: 'product'; product: Product }
  | { type: 'course'; course: Course }
  | { type: 'workshop'; workshop: Workshop }
  | { type: 'resource'; resource: Resource }
  | { type: 'consultation' }
  | { type: 'checkout' }
  | null;

interface DemoModalProps {
  modal: ActiveModalType;
  onClose: () => void;
  onEnrollCourse?: (courseId: string) => void;
  onRegisterWorkshop?: (workshopId: string) => void;
  onConfirmUpgrade?: () => void;
  isCourseEnrolled?: boolean;
  isWorkshopRegistered?: boolean;
  isUpgraded?: boolean;
}

export const DemoModal: React.FC<DemoModalProps> = ({
  modal,
  onClose,
  onEnrollCourse,
  onRegisterWorkshop,
  onConfirmUpgrade,
  isCourseEnrolled = false,
  isWorkshopRegistered = false,
  isUpgraded = false
}) => {
  // Product demo interactive state
  const [productInput, setProductInput] = useState('');
  const [productOutput, setProductOutput] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Consultation Builder interactive state
  const [consultScope, setConsultScope] = useState<'mvp' | 'enterprise' | 'swarm'>('enterprise');
  const [consultDomain, setConsultDomain] = useState('Fintech & Compliance');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // Checkout demo interactive state
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'success'>('review');

  if (!modal) return null;

  // Handle Product Demo Action
  const handleRunProductDemo = (demoType: string) => {
    setIsProcessing(true);
    setProductOutput(null);

    setTimeout(() => {
      setIsProcessing(false);
      switch (demoType) {
        case 'workflow-bot':
          setProductOutput(`[SUCCESS] Webhook event simulated:
• Trigger payload normalized: "New Enterprise Inbound Order #9021"
• Verified Schema Check: PASSED (99.8% precision)
• Action routed to Asynchronous Worker Pool B
• HTTP 200 Response received in 340ms`);
          break;
        case 'legal-parser':
          setProductOutput(`[LEXICHECK AUDIT REPORT]
• Ingested Clause: "Indemnification & Third-Party Claims"
• Risk Score: MODERATE (Mutual indemnity missing carve-out for IP infringement)
• Recommended Revision: "Insert explicit defense cost threshold and 30-day notice requirement"
• Statutory Precedent Grounding: Cal. Civ. Code § 2778 validated.`);
          break;
        case 'code-optimizer':
          setProductOutput(`[CODESYNC BOTTLENECK ANALYSIS]
• Target Algorithm: Recursive Graph Depth-First Search
• Bottleneck Detected: Unmemoized call stack leading to O(2^N) exponential blowup
• Recommended Refactor: Dynamic programming adjacency array with bitmask state
• Expected Latency Improvement: ~84% reduction (1,240ms -> 18ms)`);
          break;
        case 'text-summary':
          setProductOutput(`[SYNAPSE EXECUTIVE BRIEF]
• Key Core Assertion: Multi-agent consensus protocols reduce single-agent failure cascades by 42%.
• Operational Impact: Average latency amortized across concurrent asynchronous workers.
• Implementation Priority: High (Recommended for Q4 infrastructure upgrade).`);
          break;
        default:
          setProductOutput(`[NEXORA ASSISTANT RESPONSE]
"I have analyzed your parameters. All neural weights and API endpoints are synchronized. How would you like to proceed with this workflow?"`);
      }
    }, 1000);
  };

  const handleCheckoutConfirm = () => {
    // Fire celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setCheckoutStep('success');
    if (onConfirmUpgrade) {
      onConfirmUpgrade();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl rounded-3xl bg-[#020617] border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] backdrop-blur-xl">
        
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. PRODUCT DEMO MODAL */}
        {modal.type === 'product' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  INTERACTIVE DEMO / PROTOTYPE
                </span>
                <span className="text-xs font-mono text-blue-400">{modal.product.category}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {modal.product.name}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {modal.product.description}
              </p>
            </div>

            {/* Purpose */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300">
              <span className="font-mono text-blue-400 font-semibold block mb-1">DESIGNED PURPOSE:</span>
              {modal.product.purpose}
            </div>

            {/* Interactive Sandbox Testbed */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>SIMULATION TEST CONSOLE</span>
                <span className="text-blue-400">SANDBOX MODE</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={
                    modal.product.demoType === 'legal-parser' ? 'Enter contract clause or clause type...' :
                    modal.product.demoType === 'code-optimizer' ? 'Enter function snippet or latency benchmark...' :
                    'Enter payload query or event data...'
                  }
                  value={productInput}
                  onChange={(e) => setProductInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => handleRunProductDemo(modal.product.demoType)}
                  disabled={isProcessing}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-600/25 transition-all"
                >
                  {isProcessing ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isProcessing ? 'Executing...' : 'Run Test'}</span>
                </button>
              </div>

              {/* Output Preview */}
              {productOutput ? (
                <div className="p-4 rounded-2xl bg-black/60 border border-blue-500/30 font-mono text-xs text-blue-300 whitespace-pre-wrap leading-relaxed">
                  {productOutput}
                </div>
              ) : (
                <div className="text-center py-6 text-slate-500 text-xs font-mono">
                  Press "Run Test" to trigger simulated intelligent processing.
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Verified Prototype: No live production database mutations executed during demo.</span>
            </div>
          </div>
        )}

        {/* 2. COURSE SYLLABUS MODAL */}
        {modal.type === 'course' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
                {modal.course.difficulty} • {modal.course.duration}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-2">
                {modal.course.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {modal.course.description}
              </p>
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm text-white mb-3">
                Complete Curriculum & Lab Syllabus ({modal.course.syllabus.length} Modules)
              </h4>
              <div className="space-y-2">
                {modal.course.syllabus.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 text-xs text-slate-200">
                    <span className="font-mono text-blue-400 font-bold shrink-0">0{idx + 1}.</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                {isCourseEnrolled ? (
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Enrolled in Local Profile
                  </span>
                ) : (
                  <span>Access via Free Community or Pro Plan</span>
                )}
              </div>

              <button
                onClick={() => {
                  if (onEnrollCourse) {
                    onEnrollCourse(modal.course.id);
                  }
                  confetti({ particleCount: 50, spread: 60 });
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/25"
              >
                {isCourseEnrolled ? 'Resume Course Lab' : 'Enroll in Course'}
              </button>
            </div>
          </div>
        )}

        {/* 3. WORKSHOP REGISTRATION MODAL */}
        {modal.type === 'workshop' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono">
                {modal.workshop.date} • {modal.workshop.duration}
              </span>
              <h3 className="font-display text-2xl font-bold text-white mt-2">
                {modal.workshop.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                {modal.workshop.description}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Lead Scientist:</span>
                <span className="text-white font-semibold">{modal.workshop.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Seat Allocation:</span>
                <span className="text-blue-400 font-mono">{modal.workshop.seatsLeft} remaining</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prerequisites:</span>
                <span className="text-slate-200">Basic Python / Tensor operations</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Admission: Included in Upgrade</span>
              <button
                onClick={() => {
                  if (onRegisterWorkshop) {
                    onRegisterWorkshop(modal.workshop.id);
                  }
                  confetti({ particleCount: 50, spread: 60 });
                  onClose();
                }}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/25"
              >
                {isWorkshopRegistered ? 'Download Confirmed Pass' : 'Confirm Workshop Registration'}
              </button>
            </div>
          </div>
        )}

        {/* 4. RESOURCE READER MODAL */}
        {modal.type === 'resource' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-blue-400">
                  {modal.resource.type} • {modal.resource.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{modal.resource.readTime}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {modal.resource.title}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Published {modal.resource.date} by NEXORA Research Collective
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm leading-relaxed text-slate-200 font-serif">
              "{modal.resource.contentSnippet}"
            </div>

            <div>
              <h4 className="font-display font-semibold text-xs text-slate-400 uppercase tracking-wider mb-2">
                KEY TECHNICAL TAKEAWAYS
              </h4>
              <div className="space-y-2">
                {modal.resource.takeaways.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
              >
                Close Paper
              </button>
            </div>
          </div>
        )}

        {/* 5. CONSULTATION BUILDER MODAL */}
        {modal.type === 'consultation' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 mb-1">
                <Layers className="w-4 h-4" />
                <span>BESPOKE ENTERPRISE ARCHITECT</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Build Your Custom AI Solution
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Configure your project requirements to calculate estimated architecture requirements and timelines.
              </p>
            </div>

            {consultSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-display font-bold text-lg text-white">Proposal Request Generated!</h4>
                <p className="text-slate-300 text-xs max-w-md mx-auto">
                  Your customized architectural blueprint for <strong>{consultDomain}</strong> ({consultScope.toUpperCase()}) has been compiled. Our engineering team will review the telemetry specs.
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-6 py-2 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">TARGET ARCHITECTURAL TIER</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setConsultScope('mvp')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        consultScope === 'mvp' ? 'bg-blue-600/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-xs block">Pilot MVP</span>
                      <span className="text-[10px] text-slate-400">2-4 Weeks</span>
                    </button>
                    <button
                      onClick={() => setConsultScope('enterprise')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        consultScope === 'enterprise' ? 'bg-blue-600/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-xs block">Enterprise RAG</span>
                      <span className="text-[10px] text-slate-400">6-10 Weeks</span>
                    </button>
                    <button
                      onClick={() => setConsultScope('swarm')}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        consultScope === 'swarm' ? 'bg-blue-600/20 border-blue-400 text-white' : 'bg-white/5 border-white/10 text-slate-400'
                      }`}
                    >
                      <span className="font-bold text-xs block">Agent Swarm</span>
                      <span className="text-[10px] text-slate-400">12+ Weeks</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-2">OPERATIONAL DOMAIN</label>
                  <select
                    value={consultDomain}
                    onChange={(e) => setConsultDomain(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="Fintech & Compliance" className="bg-slate-900">Fintech, KYC & Compliance</option>
                    <option value="Contract Intelligence" className="bg-slate-900">Legal Contract Intelligence</option>
                    <option value="Robotics & Perception" className="bg-slate-900">Physical Robotics & Sensor Fusion</option>
                    <option value="Autonomous Customer Care" className="bg-slate-900">Autonomous Enterprise Customer Support</option>
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Deterministic Guardrails:</span>
                    <span className="text-emerald-400 font-mono">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">IP Confidentiality:</span>
                    <span className="text-blue-400 font-mono">100% Client Owned</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setConsultSubmitted(true);
                    confetti({ particleCount: 60, spread: 70 });
                  }}
                  className="w-full py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all shadow-md shadow-blue-600/25"
                >
                  Submit Architecture Inquiry
                </button>
              </div>
            )}
          </div>
        )}

        {/* 6. CHECKOUT DEMO MODAL */}
        {modal.type === 'checkout' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            {checkoutStep === 'review' ? (
              <>
                <div className="text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-mono mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DEMO CHECKOUT SIMULATOR</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Upgrade to NEXORA AI Pro
                  </h3>
                  <div className="mt-2 text-3xl font-bold text-blue-400 font-display">
                    ₹299 <span className="text-sm text-slate-400 font-mono font-normal">/ month</span>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 leading-relaxed">
                  <strong>Notice:</strong> This is a demonstration checkout sandbox. No real charges or payment credentials will be requested. Clicking "Confirm Demo Activation" will immediately toggle your local profile to the PRO tier for testing.
                </div>

                {/* Plan Highlights */}
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Unlimited access to all Advanced & Robotics curricula</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>Live masterclass workshops and seat priority</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    <span>FlowEngine & LexiCheck unrestricted simulation sandbox</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2">
                  <button
                    onClick={handleCheckoutConfirm}
                    className="w-full py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
                  >
                    Confirm Demo Activation (₹299/mo)
                  </button>

                  <button
                    onClick={onClose}
                    className="w-full py-2 text-xs text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-6 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Welcome to NEXORA Pro!
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-sm mx-auto">
                  Your demonstration subscription has been activated. You now enjoy unthrottled access to all NEXORA AI masterclasses and tool sandboxes.
                </p>
                <div className="pt-2">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs"
                  >
                    Enter Platform
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
