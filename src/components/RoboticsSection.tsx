import React from 'react';
import { Bot, Cpu, Eye, Activity, ShieldCheck, ArrowRight } from 'lucide-react';
import { RobotViewer3D } from './3d/RobotViewer3D';

interface RoboticsSectionProps {
  onExploreRoboticsCourse: () => void;
}

export const RoboticsSection: React.FC<RoboticsSectionProps> = ({ onExploreRoboticsCourse }) => {
  const concepts = [
    {
      icon: <Eye className="w-5 h-5 text-blue-400" />,
      title: 'Vision-Language-Action (VLA)',
      description: 'Unified multi-modal policies mapping live camera pixels and natural language goals directly into 6-DOF joint torques.'
    },
    {
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      title: 'Real-Time Edge Kinematics',
      description: 'Deterministic 120Hz trajectory planning executing on embedded hardware accelerators with microsecond safety interlocks.'
    },
    {
      icon: <Activity className="w-5 h-5 text-sky-400" />,
      title: 'Continuous Sensor Fusion',
      description: 'Synchronizing multi-spectral LiDAR, IMU accelerometers, and optical depth streams into a persistent occupancy voxel grid.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      title: 'Physical Safety & Compliance',
      description: 'Strict ISO 10218 robotic safety boundaries guaranteeing automatic collision halting within 4 milliseconds.'
    }
  ];

  return (
    <section id="robotics" className="py-20 relative overflow-hidden bg-[#020617]/50">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>EMBODIED INTELLIGENCE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            Robotics + Physical AI Systems
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Bridging foundational neural models with physical actuators, spatial perception, and autonomous real-time robotics manipulation.
          </p>
        </div>

        {/* 3D Robot Viewer & Core Concepts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
          
          {/* Left Column: Interactive 3D Robot */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-semibold text-blue-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                NEXORA ROBOTIC SENSOR RIG (INTERACTIVE 3D)
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                DRAG OR HOVER TO ROTATE
              </span>
            </div>

            <RobotViewer3D />
          </div>

          {/* Right Column: AI + Robotics Concepts */}
          <div className="lg:col-span-6 space-y-4">
            <div className="mb-2">
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Intelligent Automation for Physical Environments
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Modern autonomous systems require spatial awareness that goes beyond 2D representations. NEXORA AI builds the software stacks that enable physical robots to navigate unstructured real-world spaces safely.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {concepts.map((c, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all backdrop-blur-md">
                  <div className="p-2 w-fit rounded-lg bg-white/5 border border-white/10 mb-2.5">
                    {c.icon}
                  </div>
                  <h4 className="font-display font-bold text-sm text-white mb-1">
                    {c.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={onExploreRoboticsCourse}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25 transition-all hover:scale-[1.02]"
              >
                <span>Explore Applied Robotics Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <span className="text-xs text-slate-400 font-mono">
                Includes hands-on Gazebo & Isaac Sim exercises
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
