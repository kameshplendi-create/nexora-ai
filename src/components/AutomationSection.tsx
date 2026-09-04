import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  ArrowRight, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Brain, 
  Send, 
  FileText, 
  Scale, 
  Camera, 
  Cpu, 
  Activity,
  Sparkles
} from 'lucide-react';
import { WORKFLOW_PRESETS } from '../data/mockData';

export const AutomationSection: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState(WORKFLOW_PRESETS[0].id);
  const [activeStepIndex, setActiveStepIndex] = useState(1); // 0=trigger, 1=ai, 2=action, 3=result
  const [isSimulating, setIsSimulating] = useState(false);
  const [executionLog, setExecutionLog] = useState<string[]>([
    'System ready. Select a preset or trigger simulation.',
    'Preset loaded: Enterprise Customer Intake (REST API)',
    'Cognitive core standing by on port 443'
  ]);

  const currentPreset = WORKFLOW_PRESETS.find((p) => p.id === selectedPresetId) || WORKFLOW_PRESETS[0];

  const handleStartSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);
    setExecutionLog([
      `[00:00.12] INGESTION: Trigger activated (${currentPreset.nodes[0].label})`,
      `[00:00.28] Payload validated against schema definitions.`
    ]);

    setTimeout(() => {
      setActiveStepIndex(1);
      setExecutionLog((prev) => [
        ...prev,
        `[00:00.64] COGNITIVE CORE: ${currentPreset.nodes[1].label} processing attention layers`,
        `[00:00.82] Context matched with 99.4% confidence score.`
      ]);
    }, 1200);

    setTimeout(() => {
      setActiveStepIndex(2);
      setExecutionLog((prev) => [
        ...prev,
        `[00:01.35] DISPATCH: ${currentPreset.nodes[2].label} executing asynchronous tool call`,
        `[00:01.50] Downstream API returned HTTP 200 OK.`
      ]);
    }, 2400);

    setTimeout(() => {
      setActiveStepIndex(3);
      setExecutionLog((prev) => [
        ...prev,
        `[00:01.88] VERIFIED RESULT: ${currentPreset.nodes[3].label} finalized. Workflow complete.`,
        `[00:02.00] Audit log sealed and telemetry recorded.`
      ]);
      setIsSimulating(false);
    }, 3600);
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'trigger': return <Zap className="w-5 h-5 text-amber-400" />;
      case 'ai': return <Brain className="w-5 h-5 text-blue-400" />;
      case 'action': return <Send className="w-5 h-5 text-indigo-400" />;
      case 'result': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      default: return <Activity className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <section id="automation" className="py-20 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>AUTONOMOUS ORCHESTRATION</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Interactive AI Automation Engine
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Construct deterministic, multi-hop intelligent workflows that connect raw data triggers to verified real-world actions.
          </p>
        </div>

        {/* Preset Selector & Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-10">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
            <span className="text-xs text-slate-400 font-mono mr-1">Workflows:</span>
            {WORKFLOW_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  setActiveStepIndex(1);
                  setExecutionLog([
                    `Workflow loaded: ${preset.name}`,
                    `Trigger: ${preset.nodes[0].label}`,
                    'Ready for real-time simulation.'
                  ]);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Action Simulation Button */}
          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold transition-all shadow-lg ${
              isSimulating 
                ? 'bg-white/10 text-slate-400 cursor-not-allowed border border-white/10' 
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:scale-[1.02]'
            }`}
          >
            {isSimulating ? (
              <>
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                <span>Simulating Stream...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Simulate Flow</span>
              </>
            )}
          </button>
        </div>

        {/* 3D Interactive Pipeline: Trigger → AI Processing → Action → Result */}
        <div className="relative mb-12">
          
          {/* Connecting Line along nodes */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 -translate-y-1/2 bg-white/10 z-0">
            {/* Animated Data Beam */}
            <div 
              className="h-full bg-gradient-to-r from-amber-400 via-blue-500 to-emerald-400 transition-all duration-700 shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              style={{
                width: activeStepIndex === 0 ? '25%' :
                       activeStepIndex === 1 ? '50%' :
                       activeStepIndex === 2 ? '75%' : '100%'
              }}
            />
          </div>

          {/* 4 Workflow Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {currentPreset.nodes.map((node, index) => {
              const isCurrent = activeStepIndex === index;
              const isPassed = activeStepIndex > index;

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveStepIndex(index)}
                  className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer backdrop-blur-md ${
                    isCurrent 
                      ? 'bg-white/10 border-2 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.25)] -translate-y-2' 
                      : isPassed
                      ? 'bg-white/5 border border-white/15'
                      : 'bg-white/5 border border-white/10 opacity-80 hover:opacity-100 hover:border-white/20'
                  }`}
                >
                  {/* Step Sequence Badge */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase">
                      STEP 0{index + 1} • {node.type}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      isCurrent ? 'bg-blue-400 animate-ping' :
                      isPassed ? 'bg-emerald-400' : 'bg-slate-700'
                    }`} />
                  </div>

                  {/* Icon Container */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform ${
                    isCurrent ? 'scale-110 bg-blue-500/20 border border-blue-400/50 shadow-[0_0_15px_rgba(59,130,246,0.4)]' :
                    'bg-white/5 border border-white/10'
                  }`}>
                    {getStepIcon(node.type)}
                  </div>

                  {/* Node Title & Sublabel */}
                  <h3 className="font-display font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                    {node.label}
                  </h3>
                  <span className="text-xs font-mono text-blue-400 block mb-3">
                    {node.sublabel}
                  </span>

                  {/* Detail */}
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {node.detail}
                  </p>

                  {/* Active Indicator Arrow */}
                  {isCurrent && (
                    <div className="mt-4 pt-3 border-t border-blue-500/30 flex items-center gap-1.5 text-[11px] text-blue-300 font-mono">
                      <Sparkles className="w-3 h-3 animate-spin" />
                      <span>CURRENT ACTIVE NODE</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Live Terminal Telemetry Console */}
        <div className="p-5 rounded-2xl bg-black/40 border border-white/10 shadow-2xl font-mono text-xs backdrop-blur-md">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-slate-400">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-[11px] text-slate-300 ml-2 font-semibold">NEXORA PIPELINE STREAM MONITOR</span>
            </div>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ENGINE ACTIVE
            </span>
          </div>

          <div className="space-y-1.5 text-slate-300 max-h-36 overflow-y-auto">
            {executionLog.map((log, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-blue-500 select-none">&gt;</span>
                <span className={log.includes('VERIFIED') ? 'text-emerald-300 font-semibold' : log.includes('COGNITIVE') ? 'text-blue-300' : ''}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
