import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EducationSection } from './components/EducationSection';
import { ProductsSection } from './components/ProductsSection';
import { AutomationSection } from './components/AutomationSection';
import { SolutionsSection } from './components/SolutionsSection';
import { WorkshopsSection } from './components/WorkshopsSection';
import { LegalAISection } from './components/LegalAISection';
import { RoboticsSection } from './components/RoboticsSection';
import { ResourcesSection } from './components/ResourcesSection';
import { UpgradeSection } from './components/UpgradeSection';
import { Footer } from './components/Footer';
import { DashboardModal } from './components/DashboardModal';
import { DemoModal, ActiveModalType } from './components/DemoModal';
import { PageSection, UserState, Product, Course, Workshop, Resource } from './types';
import { COURSES_DATA } from './data/mockData';

const LOCAL_STORAGE_KEY = 'nexora_ai_user_state_v1';

export default function App() {
  const [currentSection, setCurrentSection] = useState<PageSection>('home');
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ActiveModalType>(null);

  // Initialize persistent local demo state
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load user state from localStorage', e);
    }
    return {
      name: 'Alex Vance',
      email: 'alex.vance@nexora.ai',
      isUpgraded: false,
      plan: 'Free Community',
      savedResourceIds: ['res-1', 'res-4'],
      enrolledCourseIds: ['edu-1'],
      registeredWorkshopIds: ['ws-1'],
      recentToolsUsed: ['FlowEngine']
    };
  });

  // Save state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {
      console.warn('Failed to persist user state', e);
    }
  }, [userState]);

  // Section Observer for active navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections: PageSection[] = [
        'home',
        'education',
        'products',
        'automation',
        'solutions',
        'workshops',
        'legal',
        'robotics',
        'resources',
        'upgrade'
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: PageSection) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Bookmark Toggle
  const handleToggleBookmark = (resourceId: string) => {
    setUserState((prev) => {
      const exists = prev.savedResourceIds.includes(resourceId);
      return {
        ...prev,
        savedResourceIds: exists 
          ? prev.savedResourceIds.filter((id) => id !== resourceId)
          : [...prev.savedResourceIds, resourceId]
      };
    });
  };

  // Course Enrollment
  const handleEnrollCourse = (courseId: string) => {
    setUserState((prev) => {
      if (prev.enrolledCourseIds.includes(courseId)) return prev;
      return {
        ...prev,
        enrolledCourseIds: [...prev.enrolledCourseIds, courseId]
      };
    });
  };

  // Workshop Registration
  const handleRegisterWorkshop = (workshopId: string) => {
    setUserState((prev) => {
      if (prev.registeredWorkshopIds.includes(workshopId)) return prev;
      return {
        ...prev,
        registeredWorkshopIds: [...prev.registeredWorkshopIds, workshopId]
      };
    });
  };

  // Upgrade Confirmation
  const handleConfirmUpgrade = () => {
    setUserState((prev) => ({
      ...prev,
      isUpgraded: true,
      plan: 'NEXORA Pro'
    }));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden relative font-sans">
      
      {/* Atmospheric Immersive Media Ambient Lighting System */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-blue-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[35vw] h-[35vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-900/10 blur-[100px]" />
        <div className="absolute bottom-[30%] left-[5%] w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] rounded-full bg-blue-600/10 blur-[110px]" />
      </div>

      {/* Atmospheric Background Tech Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />
      <div className="fixed inset-0 bg-dots-pattern opacity-20 pointer-events-none -z-10" />

      {/* Main Top Navigation */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onOpenDashboard={() => setDashboardOpen(true)}
        onOpenUpgrade={() => setActiveModal({ type: 'checkout' })}
        isUpgraded={userState.isUpgraded}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onNavigate={handleNavigate}
          onOpenUpgrade={() => setActiveModal({ type: 'checkout' })}
        />

        {/* 2. AI Education Section */}
        <EducationSection
          onSelectCourse={(course: Course) => setActiveModal({ type: 'course', course })}
          enrolledCourseIds={userState.enrolledCourseIds}
        />

        {/* 3. AI Products Directory */}
        <ProductsSection
          onOpenProductDemo={(product: Product) => setActiveModal({ type: 'product', product })}
        />

        {/* 4. Interactive AI Automation */}
        <AutomationSection />

        {/* 5. Custom AI Solutions */}
        <SolutionsSection
          onOpenConsultationModal={() => setActiveModal({ type: 'consultation' })}
        />

        {/* 6. AI Workshops Masterclasses */}
        <WorkshopsSection
          onRegisterWorkshop={(workshop: Workshop) => setActiveModal({ type: 'workshop', workshop })}
          registeredWorkshopIds={userState.registeredWorkshopIds}
        />

        {/* 7. Legal AI Framework */}
        <LegalAISection />

        {/* 8. Robotics + Physical AI */}
        <RoboticsSection
          onExploreRoboticsCourse={() => {
            const roboticsCourse = COURSES_DATA.find((c) => c.id === 'edu-5') || COURSES_DATA[0];
            setActiveModal({ type: 'course', course: roboticsCourse });
          }}
        />

        {/* 9. AI Technical Resources */}
        <ResourcesSection
          onSelectResource={(resource: Resource) => setActiveModal({ type: 'resource', resource })}
          savedResourceIds={userState.savedResourceIds}
          onToggleBookmark={handleToggleBookmark}
        />

        {/* 10. Upgrade Section */}
        <UpgradeSection
          onOpenCheckoutDemo={() => setActiveModal({ type: 'checkout' })}
          isUpgraded={userState.isUpgraded}
        />
      </main>

      {/* Footer with Legal Notices */}
      <Footer onNavigate={handleNavigate} />

      {/* User Dashboard Modal */}
      <DashboardModal
        isOpen={dashboardOpen}
        onClose={() => setDashboardOpen(false)}
        userState={userState}
        onUpdateUserState={setUserState}
        onSelectCourse={(course) => setActiveModal({ type: 'course', course })}
        onSelectResource={(resource) => setActiveModal({ type: 'resource', resource })}
        onOpenUpgrade={() => setActiveModal({ type: 'checkout' })}
      />

      {/* Universal Demo & Interaction Modal */}
      <DemoModal
        modal={activeModal}
        onClose={() => setActiveModal(null)}
        onEnrollCourse={handleEnrollCourse}
        onRegisterWorkshop={handleRegisterWorkshop}
        onConfirmUpgrade={handleConfirmUpgrade}
        isCourseEnrolled={
          activeModal?.type === 'course' 
            ? userState.enrolledCourseIds.includes(activeModal.course.id)
            : false
        }
        isWorkshopRegistered={
          activeModal?.type === 'workshop'
            ? userState.registeredWorkshopIds.includes(activeModal.workshop.id)
            : false
        }
        isUpgraded={userState.isUpgraded}
      />

    </div>
  );
}
