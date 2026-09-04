import React, { useState } from 'react';
import { 
  X, 
  User, 
  Bookmark, 
  GraduationCap, 
  Calendar, 
  Sparkles, 
  ShieldCheck, 
  Trash2,
  ExternalLink
} from 'lucide-react';
import { UserState, Course, Workshop, Resource } from '../types';
import { COURSES_DATA, WORKSHOPS_DATA, RESOURCES_DATA } from '../data/mockData';

interface DashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onUpdateUserState: (updater: (prev: UserState) => UserState) => void;
  onSelectCourse: (course: Course) => void;
  onSelectResource: (resource: Resource) => void;
  onOpenUpgrade: () => void;
}

export const DashboardModal: React.FC<DashboardModalProps> = ({
  isOpen,
  onClose,
  userState,
  onUpdateUserState,
  onSelectCourse,
  onSelectResource,
  onOpenUpgrade
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'workshops' | 'saved' | 'settings'>('overview');

  if (!isOpen) return null;

  const enrolledCourses = COURSES_DATA.filter((c) => userState.enrolledCourseIds.includes(c.id));
  const registeredWorkshops = WORKSHOPS_DATA.filter((w) => userState.registeredWorkshopIds.includes(w.id));
  const savedResources = RESOURCES_DATA.filter((r) => userState.savedResourceIds.includes(r.id));

  const removeBookmark = (id: string) => {
    onUpdateUserState((prev) => ({
      ...prev,
      savedResourceIds: prev.savedResourceIds.filter((rId) => rId !== id)
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#020617] border border-white/10 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh] backdrop-blur-xl">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">
                  {userState.name}
                </h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                  userState.isUpgraded 
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' 
                    : 'bg-white/10 text-slate-400'
                }`}>
                  {userState.plan}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">{userState.email}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-white/10 bg-white/5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-blue-400 text-blue-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'courses'
                ? 'border-blue-400 text-blue-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>My Courses</span>
            <span className="px-2 py-0.2 rounded-full bg-white/10 text-[10px]">{enrolledCourses.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('workshops')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'workshops'
                ? 'border-blue-400 text-blue-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Workshops</span>
            <span className="px-2 py-0.2 rounded-full bg-white/10 text-[10px]">{registeredWorkshops.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-blue-400 text-blue-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Saved Papers</span>
            <span className="px-2 py-0.2 rounded-full bg-white/10 text-[10px]">{savedResources.length}</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 text-xs font-medium border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'settings'
                ? 'border-blue-400 text-blue-300 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Settings
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs sm:text-sm">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              
              {/* Upgrade Banner if not upgraded */}
              {!userState.isUpgraded ? (
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
                  <div>
                    <div className="flex items-center gap-2 text-blue-300 font-semibold font-display text-base">
                      <Sparkles className="w-4 h-4" />
                      <span>Upgrade to NEXORA Pro (₹299/mo)</span>
                    </div>
                    <p className="text-slate-300 text-xs mt-1">
                      Unlock full access to advanced curricula, live priority masterclasses, and unthrottled pipeline executions.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onClose();
                      onOpenUpgrade();
                    }}
                    className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 shrink-0"
                  >
                    Upgrade Now
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between backdrop-blur-md">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs">
                    <ShieldCheck className="w-4 h-4" />
                    <span>NEXORA Pro Membership is Active (₹299/month tier)</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400">Billing: Active</span>
                </div>
              )}

              {/* Stats Overview Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 text-[11px] font-mono block">ENROLLED COURSES</span>
                  <span className="text-2xl font-bold font-display text-white mt-1 block">
                    {enrolledCourses.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 text-[11px] font-mono block">WORKSHOP PASSES</span>
                  <span className="text-2xl font-bold font-display text-blue-300 mt-1 block">
                    {registeredWorkshops.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 text-[11px] font-mono block">SAVED PAPERS</span>
                  <span className="text-2xl font-bold font-display text-purple-300 mt-1 block">
                    {savedResources.length}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <span className="text-slate-400 text-[11px] font-mono block">ACTIVE LABS</span>
                  <span className="text-2xl font-bold font-display text-emerald-300 mt-1 block">
                    6 Verified
                  </span>
                </div>
              </div>

              {/* Quick Resume Courses */}
              <div>
                <h4 className="font-display font-semibold text-sm text-white mb-3 flex items-center justify-between">
                  <span>In-Progress Curricula</span>
                  <button onClick={() => setActiveTab('courses')} className="text-xs text-blue-400 hover:underline">
                    View All
                  </button>
                </h4>

                {enrolledCourses.length > 0 ? (
                  <div className="space-y-2">
                    {enrolledCourses.slice(0, 2).map((course) => (
                      <div key={course.id} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="font-semibold text-white block">{course.title}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{course.category} • {course.duration}</span>
                        </div>
                        <button
                          onClick={() => {
                            onClose();
                            onSelectCourse(course);
                          }}
                          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-blue-600 hover:text-white text-blue-300 text-xs font-semibold transition-colors"
                        >
                          Resume
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
                    <p className="text-slate-400 text-xs">You haven't enrolled in any courses yet.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: MY COURSES */}
          {activeTab === 'courses' && (
            <div className="space-y-4">
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map((c) => (
                  <div key={c.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-blue-400">{c.category} • {c.difficulty}</span>
                      <h4 className="font-display font-bold text-white text-base mt-0.5">{c.title}</h4>
                      <p className="text-slate-400 text-xs mt-1">{c.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        onSelectCourse(c);
                      }}
                      className="px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shrink-0 shadow-md shadow-blue-600/25"
                    >
                      Open Syllabus & Labs
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400">No enrolled courses.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WORKSHOPS */}
          {activeTab === 'workshops' && (
            <div className="space-y-4">
              {registeredWorkshops.length > 0 ? (
                registeredWorkshops.map((w) => (
                  <div key={w.id} className="p-4 rounded-2xl bg-white/5 border border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-blue-400 font-semibold">{w.date}</span>
                        <span className="text-[10px] bg-blue-950 text-blue-300 px-2 py-0.5 rounded-full border border-blue-800">CONFIRMED PASS</span>
                      </div>
                      <h4 className="font-display font-bold text-white text-base mt-1">{w.title}</h4>
                      <span className="text-slate-400 text-xs">Instructor: {w.instructor} ({w.instructorRole})</span>
                    </div>
                    <div className="text-xs font-mono text-blue-400 bg-white/5 px-3 py-2 rounded-xl border border-white/10 text-center">
                      Live Stream Room: NX-MASTER-88
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400">No active workshop registrations.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SAVED PAPERS */}
          {activeTab === 'saved' && (
            <div className="space-y-3">
              {savedResources.length > 0 ? (
                savedResources.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[11px] font-mono text-blue-400">{r.type} • {r.readTime}</span>
                      <h4 className="font-display font-bold text-white text-sm">{r.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectResource(r);
                        }}
                        className="p-2 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white text-blue-300 text-xs"
                        title="Read paper"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeBookmark(r.id)}
                        className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-slate-400 hover:text-red-300 text-xs"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Bookmark className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-400">No bookmarked research papers.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <h4 className="font-display font-bold text-white text-sm">Account Preferences</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-white block">Display Name</span>
                    <span className="text-[11px] text-slate-400">Used for certifications and live masterclasses</span>
                  </div>
                  <input
                    type="text"
                    value={userState.name}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateUserState((prev) => ({ ...prev, name: val }));
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <div>
                    <span className="text-xs font-semibold text-white block">Email Address</span>
                    <span className="text-[11px] text-slate-400">Notifications for workshop room links</span>
                  </div>
                  <input
                    type="email"
                    value={userState.email}
                    onChange={(e) => {
                      const val = e.target.value;
                      onUpdateUserState((prev) => ({ ...prev, email: val }));
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Subscription State</span>
                  <span className="text-[11px] text-slate-400">Toggle or inspect local demo subscription</span>
                </div>
                <button
                  onClick={() => {
                    onUpdateUserState((prev) => ({
                      ...prev,
                      isUpgraded: !prev.isUpgraded,
                      plan: !prev.isUpgraded ? 'NEXORA Pro' : 'Free Community'
                    }));
                  }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    userState.isUpgraded
                      ? 'bg-red-500/20 text-red-300 border border-red-500/40'
                      : 'bg-blue-600 hover:bg-blue-500 text-white font-bold'
                  }`}
                >
                  {userState.isUpgraded ? 'Downgrade to Free' : 'Activate Pro Demo'}
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
