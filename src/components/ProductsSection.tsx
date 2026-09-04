import React, { useState } from 'react';
import { Boxes, Search, ExternalLink, Sparkles, Shield, Cpu, Zap, Activity } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS_DATA } from '../data/mockData';

interface ProductsSectionProps {
  onOpenProductDemo: (product: Product) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onOpenProductDemo }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI productivity',
    'AI automation',
    'AI education',
    'Legal AI',
    'AI assistants'
  ];

  const filteredProducts = PRODUCTS_DATA.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.purpose.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="products" className="py-20 relative overflow-hidden bg-[#020617]/50 border-y border-white/10">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">
            <Boxes className="w-3.5 h-3.5" />
            <span>ORIGINAL AI TOOLCHAIN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
            NEXORA AI Products Directory
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Explore dedicated intelligent products engineered for high throughput, verified compliance, and operational leverage.
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium">
            Note: All items below are verified interactive prototypes and functional sandbox demos.
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
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

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or purpose..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/80 focus:bg-white/10 transition-all"
            />
          </div>

        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative rounded-2xl p-6 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between backdrop-blur-md"
            >
              {/* Header Bar */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-blue-400">
                    {product.category}
                  </span>

                  <span className="px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[10px] font-mono tracking-wider font-semibold">
                    {product.badge}
                  </span>
                </div>

                {/* Icon Graphic */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {product.category === 'AI automation' ? <Zap className="w-5 h-5" /> :
                     product.category === 'Legal AI' ? <Shield className="w-5 h-5" /> :
                     product.category === 'AI assistants' ? <Cpu className="w-5 h-5" /> :
                     <Sparkles className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-white group-hover:text-blue-300 transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-mono">{product.version}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Purpose Highlight */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-5">
                  <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase block mb-1">
                    PRIMARY PURPOSE
                  </span>
                  <p className="text-slate-300 text-xs leading-normal">
                    {product.purpose}
                  </p>
                </div>
              </div>

              {/* Footer: Metrics & Interactive Open Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                  <Activity className="w-3 h-3 text-blue-400" />
                  <span className="truncate max-w-[170px]">{product.metrics}</span>
                </div>

                <button
                  onClick={() => onOpenProductDemo(product)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-600 text-white font-semibold text-xs transition-all shadow-sm"
                >
                  <span>Open Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 p-6 rounded-2xl bg-white/5 border border-white/10">
            <Boxes className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-300 font-medium text-sm">No products found matching "{searchQuery}".</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="mt-3 text-xs text-blue-400 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
