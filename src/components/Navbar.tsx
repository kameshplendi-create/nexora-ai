import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Sparkles, 
  User, 
  ArrowRight, 
  Layers,
  GraduationCap,
  Boxes,
  Cpu,
  Bot,
  Scale,
  Calendar,
  BookOpen,
  Zap
} from 'lucide-react';
import { PageSection } from '../types';

interface NavbarProps {
  currentSection: PageSection;
  onNavigate: (section: PageSection) => void;
  onOpenDashboard: () => void;
  onOpenUpgrade: () => void;
  isUpgraded: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  onOpenDashboard,
  onOpenUpgrade,
  isUpgraded
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: PageSection; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Boxes className="w-4 h-4" /> },
    { id: 'automation', label: 'Automation', icon: <Zap className="w-4 h-4" /> },
    { id: 'solutions', label: 'Solutions', icon: <Layers className="w-4 h-4" /> },
    { id: 'workshops', label: 'Workshops', icon: <Calendar className="w-4 h-4" /> },
    { id: 'legal', label: 'Legal AI', icon: <Scale className="w-4 h-4" /> },
    { id: 'robotics', label: 'Robotics', icon: <Bot className="w-4 h-4" /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen className="w-4 h-4" /> },
  ];

  const handleLinkClick = (id: PageSection) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
        <nav className="glass-panel rounded-2xl px-4 py-2.5 sm:px-6 flex items-center justify-between border border-white/10 backdrop-blur-md shadow-2xl bg-[#020617]/70">
          
          {/* Brand Logo & Tagline */}
          <button 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="NEXORA AI Home"
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-lg tracking-tight text-white">NEXORA</span>
                <span className="font-display font-bold text-lg text-blue-400">AI</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-tight block -mt-0.5">The Next Realm of AI</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors py-1 relative ${
                    isActive 
                      ? 'text-white font-semibold' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Controls */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Dashboard button */}
            <button
              onClick={onOpenDashboard}
              className="px-4 py-2 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
              title="Open User Dashboard"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Dashboard</span>
            </button>

            {/* Upgrade CTA Button */}
            <button
              onClick={onOpenUpgrade}
              className="px-5 py-2 text-xs sm:text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-full font-semibold transition-all shadow-lg shadow-blue-600/20 flex items-center gap-1.5 hover:scale-[1.02]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isUpgraded ? 'Pro Active' : 'Upgrade ₹299'}</span>
              <ArrowRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenDashboard}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Dashboard"
            >
              <User className="w-4 h-4 text-blue-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-4 top-20 z-50 glass-panel-glow rounded-2xl p-4 border border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto bg-[#020617]/95">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                    isActive 
                      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' 
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
                  }`}
                >
                  <span className="text-blue-400">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboard();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-medium"
            >
              <User className="w-4 h-4 text-blue-400" />
              <span>Open User Dashboard</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenUpgrade();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isUpgraded ? 'NEXORA PRO ACTIVE' : 'UPGRADE TO PRO (₹299/mo)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
