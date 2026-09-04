import React from 'react';
import { Calendar, Clock, Award, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Workshop } from '../types';
import { WORKSHOPS_DATA } from '../data/mockData';

interface WorkshopsSectionProps {
  onRegisterWorkshop: (workshop: Workshop) => void;
  registeredWorkshopIds: string[];
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({
  onRegisterWorkshop,
  registeredWorkshopIds
}) => {
  return (
    <section id="workshops" className="py-20 relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>LIVE TECHNICAL SESSIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              AI Masterclasses & Workshops
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Intensive, small-cohort live workshops guided by senior AI research scientists and robotics engineers.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <Award className="w-5 h-5 text-blue-400" />
            <div className="text-left">
              <span className="text-xs font-mono font-semibold text-blue-400 block">CERTIFIED CREDENTIALS</span>
              <span className="text-[11px] text-slate-400">Verifiable badge issued upon completion</span>
            </div>
          </div>
        </div>

        {/* Workshops Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKSHOPS_DATA.map((workshop) => {
            const isRegistered = registeredWorkshopIds.includes(workshop.id);

            return (
              <div
                key={workshop.id}
                className="group relative rounded-2xl p-6 sm:p-7 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  {/* Top Metadata: Level, Duration, Date */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-mono font-semibold">
                      {workshop.skillLevel}
                    </span>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        {workshop.duration}
                      </span>
                      <span className="flex items-center gap-1 text-slate-300">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                        {workshop.date}
                      </span>
                    </div>
                  </div>

                  {/* Workshop Title */}
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-blue-300 transition-colors mb-3 leading-snug">
                    {workshop.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-5">
                    {workshop.description}
                  </p>

                  {/* Topics Covered */}
                  <div className="mb-6">
                    <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      KEY LAB MODULES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {workshop.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300 font-mono"
                        >
                          • {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Instructor Bio */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        {workshop.instructor}
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        {workshop.instructorRole}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                      <Users className="w-3.5 h-3.5" />
                      <span>{isRegistered ? workshop.seatsLeft - 1 : workshop.seatsLeft} seats remaining</span>
                    </div>
                  </div>
                </div>

                {/* Footer Join Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-xs font-mono text-slate-400">
                    {isRegistered ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Registration Confirmed
                      </span>
                    ) : (
                      <span>Included in NEXORA Upgrade or Free Tier</span>
                    )}
                  </div>

                  <button
                    onClick={() => onRegisterWorkshop(workshop)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                      isRegistered
                        ? 'bg-white/10 hover:bg-white/15 text-slate-200 border border-white/10'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:scale-[1.02]'
                    }`}
                  >
                    <span>{isRegistered ? 'View Workshop Pass' : 'Register for Workshop'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
