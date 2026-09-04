import React from 'react';

interface NeuralNodeObjectProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const NeuralNodeObject: React.FC<NeuralNodeObjectProps> = ({ 
  className = '',
  size = 'md'
}) => {
  const dimensions = size === 'sm' ? 'w-24 h-24' : size === 'lg' ? 'w-48 h-48' : 'w-36 h-36';

  return (
    <div className={`relative flex items-center justify-center select-none perspective-1000 ${dimensions} ${className}`}>
      {/* Outer subtle rotating ring */}
      <div className="absolute inset-0 rounded-full border border-dashed border-cyan-500/30 animate-[spin_20s_linear_infinite]" />
      <div className="absolute inset-2 rounded-full border border-indigo-500/20 animate-[spin_15s_linear_infinite_reverse]" />

      {/* Floating 3D Nodes Network */}
      <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
        {/* Center Node */}
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(56,189,248,0.6)] flex items-center justify-center z-10">
          <div className="w-2 h-2 rounded-full bg-white animate-ping" />
        </div>

        {/* Orbiting Satellite Nodes */}
        <div className="absolute -top-1 left-4 w-3.5 h-3.5 rounded-full bg-indigo-400/80 shadow-[0_0_12px_rgba(129,140,248,0.8)]" />
        <div className="absolute top-6 -right-1 w-4 h-4 rounded-full bg-sky-400/80 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
        <div className="absolute -bottom-1 right-5 w-3 h-3 rounded-full bg-cyan-300/80 shadow-[0_0_10px_rgba(103,232,249,0.8)]" />
        <div className="absolute bottom-5 -left-1 w-3.5 h-3.5 rounded-full bg-blue-500/80 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />

        {/* Connecting Synaptic Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-400/30 stroke-1" viewBox="0 0 100 100">
          <line x1="50" y1="50" x2="20" y2="15" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="85" y2="35" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="70" y2="85" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="15" y2="70" strokeDasharray="3 3" />
          <line x1="20" y1="15" x2="85" y2="35" strokeOpacity="0.2" />
        </svg>
      </div>
    </div>
  );
};
