import React, { useState } from 'react';
import { GraduationCap, BookOpen, Clock, Layers, ArrowRight, CheckCircle2, Sparkles, Filter } from 'lucide-react';
import { Course } from '../types';
import { COURSES_DATA } from '../data/mockData';
import { NeuralNodeObject } from './3d/NeuralNodeObject';

interface EducationSectionProps {
  onSelectCourse: (course: Course) => void;
  enrolledCourseIds: string[];
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  onSelectCourse,
  enrolledCourseIds
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'AI Fundamentals', 'Generative AI', 'AI Automation', 'Practical AI Usage', 'Robotics + AI', 'Legal AI'];

  const filteredCourses = selectedCategory === 'All'
    ? COURSES_DATA
    : COURSES_DATA.filter((c) => c.category === selectedCategory);

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      {/* Visual Ambient Glow */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with 3D Neural Object */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>NEXORA ACADEMY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              AI Education & Mastery
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Rigorous, hands-on curricula covering foundational linear algebra and attention mechanics to production-grade autonomous agent swarms.
            </p>
          </div>

          {/* 3D Neural Node Visual */}
          <div className="hidden lg:flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <NeuralNodeObject size="sm" />
            <div className="text-left pr-3">
              <span className="text-xs font-mono font-semibold text-blue-400 block">ADAPTIVE CURRICULUM</span>
              <span className="text-[11px] text-slate-400">Interactive labs & syllabus</span>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 3D Floating Learning Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const isEnrolled = enrolledCourseIds.includes(course.id);
            return (
              <div
                key={course.id}
                className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-md"
              >
                {/* Subtle card glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div>
                  {/* Card Top Metadata: Difficulty & Module count */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                      course.difficulty === 'Beginner' 
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : course.difficulty === 'Intermediate'
                        ? 'bg-blue-500/10 border border-blue-500/20 text-blue-400'
                        : 'bg-purple-500/10 border border-purple-500/20 text-purple-400'
                    }`}>
                      {course.difficulty}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-400" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-slate-400" />
                        {course.modulesCount} Modules
                      </span>
                    </div>
                  </div>

                  {/* Course Title */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white group-hover:text-blue-300 transition-colors mb-2.5 leading-snug">
                    {course.title}
                  </h3>

                  {/* Course Description */}
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-slate-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start / Enrolled Button */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-medium">
                    {isEnrolled ? (
                      <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Enrolled
                      </span>
                    ) : (
                      <span>Free Community Access</span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectCourse(course)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 text-white text-xs font-semibold transition-all group/btn"
                  >
                    <span>{isEnrolled ? 'Resume Course' : 'Start Course'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
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
