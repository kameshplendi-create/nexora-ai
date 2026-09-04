export type PageSection = 
  | 'home'
  | 'education'
  | 'products'
  | 'automation'
  | 'solutions'
  | 'workshops'
  | 'legal'
  | 'robotics'
  | 'resources'
  | 'upgrade';

export interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modulesCount: number;
  category: string;
  iconName: string;
  tags: string[];
  syllabus: string[];
}

export interface Product {
  id: string;
  name: string;
  category: 'AI productivity' | 'AI automation' | 'AI education' | 'Legal AI' | 'Business AI' | 'AI assistants';
  description: string;
  purpose: string;
  badge: 'Demo' | 'Interactive Prototype';
  version: string;
  metrics: string;
  demoType: 'text-summary' | 'workflow-bot' | 'legal-parser' | 'code-optimizer' | 'assistant-chat';
}

export interface Workshop {
  id: string;
  title: string;
  description: string;
  skillLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  duration: string;
  date: string;
  instructor: string;
  instructorRole: string;
  seatsLeft: number;
  topics: string[];
}

export interface Resource {
  id: string;
  title: string;
  type: 'Tutorial' | 'Guide' | 'Experiment' | 'Whitepaper' | 'Technical Article';
  category: 'Fundamentals' | 'Generative AI' | 'Robotics' | 'Legal Tech' | 'System Architecture' | 'Automation';
  description: string;
  readTime: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  date: string;
  contentSnippet: string;
  takeaways: string[];
}

export interface WorkflowNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'trigger' | 'ai' | 'action' | 'result';
  icon: string;
  status: 'idle' | 'processing' | 'completed';
  detail: string;
}

export interface UserState {
  name: string;
  email: string;
  isUpgraded: boolean;
  plan: 'Free Community' | 'NEXORA Pro';
  savedResourceIds: string[];
  enrolledCourseIds: string[];
  registeredWorkshopIds: string[];
  recentToolsUsed: string[];
}
