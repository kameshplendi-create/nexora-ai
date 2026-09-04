import React, { useState } from 'react';
import { BookOpen, Search, Bookmark, BookmarkCheck, Clock, ArrowRight, FileText } from 'lucide-react';
import { Resource } from '../types';
import { RESOURCES_DATA } from '../data/mockData';

interface ResourcesSectionProps {
  onSelectResource: (resource: Resource) => void;
  savedResourceIds: string[];
  onToggleBookmark: (resourceId: string) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  onSelectResource,
  savedResourceIds,
  onToggleBookmark
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');

  const types = ['All', 'Guide', 'Tutorial', 'Whitepaper', 'Technical Article', 'Experiment'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = RESOURCES_DATA.filter((res) => {
    const matchesType = selectedType === 'All' || res.type === selectedType;
    const matchesLevel = selectedLevel === 'All' || res.level === selectedLevel;
    const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          res.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesLevel && matchesSearch;
  });

  return (
    <section id="resources" className="py-20 relative overflow-hidden bg-[#020617]/50">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-10 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              <span>KNOWLEDGE REPOSITORY</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              AI Technical Resources & Papers
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Peer-reviewed technical deep dives, mathematical guides, and architectural experiments authored by NEXORA engineers.
            </p>
          </div>

          <div className="text-right hidden sm:block">
            <span className="text-xs font-mono text-blue-400 block">{RESOURCES_DATA.length} Research Articles Published</span>
            <span className="text-[11px] text-slate-500">Updated weekly with new laboratory insights</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search tutorials, algorithms, guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/80 focus:bg-white/10"
              />
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full lg:w-auto scrollbar-none pb-1 lg:pb-0">
              <span className="text-xs text-slate-400 font-mono mr-1">Type:</span>
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedType === t
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex items-center gap-1.5 self-start lg:self-auto">
              <span className="text-xs text-slate-400 font-mono mr-1">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-slate-900 text-white">{lvl}</option>
                ))}
              </select>
            </div>

          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const isBookmarked = savedResourceIds.includes(res.id);

            return (
              <div
                key={res.id}
                className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between backdrop-blur-md"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-blue-400">
                      {res.type}
                    </span>

                    <button
                      onClick={() => onToggleBookmark(res.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        isBookmarked 
                          ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40' 
                          : 'text-slate-500 hover:text-slate-200 hover:bg-white/10'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Save to Dashboard'}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Resource Title */}
                  <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors mb-2.5 leading-snug">
                    {res.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {res.description}
                  </p>

                  {/* Key Takeaway Highlight */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-5 text-[11px] text-slate-300">
                    <span className="font-mono text-blue-400 block mb-1">KEY TOPIC FOCUS:</span>
                    <span>• {res.takeaways[0]}</span>
                  </div>
                </div>

                {/* Footer Read Time & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-blue-400" />
                    <span>{res.readTime}</span>
                  </div>

                  <button
                    onClick={() => onSelectResource(res)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 hover:text-blue-300 group-hover:translate-x-0.5 transition-all"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-16 p-6 rounded-2xl bg-white/5 border border-white/10">
            <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium text-sm">No resources found matching current criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedType('All'); setSelectedLevel('All'); }}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
