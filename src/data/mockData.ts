import { Course, Product, Workshop, Resource, WorkflowNode } from '../types';

export const COURSES_DATA: Course[] = [
  {
    id: 'edu-1',
    title: 'Modern AI Fundamentals & Deep Architectures',
    description: 'Master core neural architectures, vector embeddings, loss landscapes, and intuitive mathematical foundations behind modern models.',
    difficulty: 'Beginner',
    duration: '4.5 Hours',
    modulesCount: 6,
    category: 'AI Fundamentals',
    iconName: 'Cpu',
    tags: ['Neural Nets', 'Embeddings', 'Transformers'],
    syllabus: [
      'Foundations: From Perceptrons to Multilayer Perceptrons',
      'Vector Spaces, Dot Products, and Semantic Embeddings',
      'Attention Mechanisms Demystified with Geometric Intuition',
      'Evaluation Metrics: Precision, Recall, Perplexity, and Hallucination Rates',
      'Hands-on Lab: Training your first miniature classifier'
    ]
  },
  {
    id: 'edu-2',
    title: 'Generative AI Engineering & Latent Spaces',
    description: 'Deep dive into diffusion models, autoregressive decoders, structured prompt graphs, and latent space arithmetic for multi-modal generation.',
    difficulty: 'Intermediate',
    duration: '6 Hours',
    modulesCount: 8,
    category: 'Generative AI',
    iconName: 'Sparkles',
    tags: ['Diffusion', 'Prompt Graphs', 'Multimodal'],
    syllabus: [
      'Tokenization strategies: BPE, WordPiece, and Byte-level representations',
      'Autoregressive decoding: Temperature, Top-p, and Beam Search strategies',
      'Diffusion models and score-based generative modeling',
      'Structured Outputs: JSON schemas, BNF grammar enforcement, and tool calling',
      'Hands-on Project: Multi-modal generative pipeline with validation loops'
    ]
  },
  {
    id: 'edu-3',
    title: 'AI Automation Workflows & Autonomous Agents',
    description: 'Learn to design resilient multi-step autonomous pipelines with stateful memory, validation guards, and human-in-the-loop controls.',
    difficulty: 'Advanced',
    duration: '5.5 Hours',
    modulesCount: 7,
    category: 'AI Automation',
    iconName: 'Workflow',
    tags: ['Agents', 'Pipelines', 'State Machines'],
    syllabus: [
      'Stateful graph-based agent topologies vs sequential chains',
      'Memory mechanisms: Episodic memory, semantic recall, and context pruning',
      'Guardrails, output verification, and rollback strategies',
      'Connecting webhook triggers with asynchronous AI workers',
      'Hands-on Lab: Enterprise invoice extraction & automated reconciliation bot'
    ]
  },
  {
    id: 'edu-4',
    title: 'Practical AI Tools & Enterprise Tooling',
    description: 'Hands-on practical mastery over modern developer toolchains, vector stores, synthetic evaluation suites, and monitoring dashboards.',
    difficulty: 'Intermediate',
    duration: '3.5 Hours',
    modulesCount: 5,
    category: 'Practical AI Usage',
    iconName: 'Wrench',
    tags: ['Toolchains', 'Vector DB', 'Monitoring'],
    syllabus: [
      'Vector databases: HNSW indexing, cosine similarity, and hybrid search',
      'Chunking heuristics: Semantic boundary vs token fixed chunking',
      'Latency optimization: KV-caching, speculative decoding, and quantization',
      'Observability: Token analytics, latency profiling, and cost estimation',
      'Hands-on Lab: Benchmarking RAG retrieval accuracy across 500 documents'
    ]
  },
  {
    id: 'edu-5',
    title: 'Applied Robotics Perception & Edge Intelligence',
    description: 'Bridge hardware and deep learning through spatial awareness, point cloud processing, real-time kinematic policies, and edge inference.',
    difficulty: 'Advanced',
    duration: '7 Hours',
    modulesCount: 9,
    category: 'Robotics + AI',
    iconName: 'Bot',
    tags: ['Robotics', 'Edge AI', 'Point Clouds'],
    syllabus: [
      'Coordinate transforms, forward kinematics, and spatial sensor fusion',
      'Processing real-time LiDAR and RGB-D depth sensor streams',
      'Vision-Language-Action (VLA) models for robotic manipulation',
      'Quantized INT8/FP8 model deployment on Jetson and embedded TPU chips',
      'Hands-on Simulation: Robotic arm pick-and-place with obstacle avoidance'
    ]
  },
  {
    id: 'edu-6',
    title: 'Legal AI Systems & Contract Intelligence',
    description: 'Learn how legal organizations leverage natural language verification, clause classification, and citation grounding under strict compliance.',
    difficulty: 'Intermediate',
    duration: '4 Hours',
    modulesCount: 5,
    category: 'Legal AI',
    iconName: 'Scale',
    tags: ['Contract Review', 'Compliance', 'Citation Grounding'],
    syllabus: [
      'Regulatory compliance frameworks for automated document review',
      'Clause extraction and risk scoring methodologies',
      'Grounding AI outputs against statutory precedent libraries',
      'Redaction and PII sanitization pipelines prior to model ingestion',
      'Hands-on Lab: Automated NDA risk flagger and cross-reference auditor'
    ]
  }
];

export const PRODUCTS_DATA: Product[] = [
  {
    id: 'prod-1',
    name: 'Nexora FlowEngine',
    category: 'AI automation',
    description: 'Intelligent event-driven pipeline orchestrator that transforms webhooks, documents, and system alerts into validated automated actions.',
    purpose: 'Eliminate manual repetitive operations across business workflows with guaranteed verification gates.',
    badge: 'Interactive Prototype',
    version: 'v2.4 Demo',
    metrics: '99.4% Task Accuracy • 420ms Latency',
    demoType: 'workflow-bot'
  },
  {
    id: 'prod-2',
    name: 'Nexora LexiCheck',
    category: 'Legal AI',
    description: 'Document intelligence assistant that highlights clause anomalies, cross-references statutory codes, and generates plain-language risk breakdowns.',
    purpose: 'Accelerate legal team preliminary document audit times while preserving rigorous evidentiary audit trails.',
    badge: 'Interactive Prototype',
    version: 'v1.8 Demo',
    metrics: 'Over 140+ Standard Clauses Indexed',
    demoType: 'legal-parser'
  },
  {
    id: 'prod-3',
    name: 'Nexora Synapse CoPilot',
    category: 'AI productivity',
    description: 'Context-aware productivity partner for research synthesis, multi-source executive briefs, and technical decision matrices.',
    purpose: 'Empower operators to distill 100+ page technical briefs into actionable tabular insights in seconds.',
    badge: 'Interactive Prototype',
    version: 'v3.1 Demo',
    metrics: 'Context window: 200k tokens simulation',
    demoType: 'text-summary'
  },
  {
    id: 'prod-4',
    name: 'Nexora CodeScribe',
    category: 'AI productivity',
    description: 'Self-correcting algorithmic optimizer that identifies architectural bottlenecks, security anti-patterns, and computes Big-O asymptotic cost.',
    purpose: 'Assist engineering teams in diagnosing algorithmic latency and automated test generation.',
    badge: 'Interactive Prototype',
    version: 'v2.0 Demo',
    metrics: 'Supports 18 programming languages',
    demoType: 'code-optimizer'
  },
  {
    id: 'prod-5',
    name: 'Nexora Academy Tutor',
    category: 'AI education',
    description: 'Adaptive Socratic learning assistant that generates personalized exercise drills, interactive code quizzes, and conceptual analogies.',
    purpose: 'Provide 1-on-1 personalized AI pedagogy that adapts in real time to the student’s comprehension curve.',
    badge: 'Interactive Prototype',
    version: 'v1.5 Demo',
    metrics: 'Adaptive difficulty scaling',
    demoType: 'assistant-chat'
  },
  {
    id: 'prod-6',
    name: 'Nexora NexusBot',
    category: 'AI assistants',
    description: 'Multi-turn autonomous enterprise concierge capable of scheduled follow-ups, internal knowledge synthesis, and calendar coordination.',
    purpose: 'Seamless self-service resolution for high-frequency internal operational inquiries.',
    badge: 'Interactive Prototype',
    version: 'v2.9 Demo',
    metrics: 'Zero-shot tool invocation',
    demoType: 'assistant-chat'
  }
];

export const WORKSHOPS_DATA: Workshop[] = [
  {
    id: 'ws-1',
    title: 'Building Resilient Multi-Agent AI Systems',
    description: 'A deep interactive masterclass on designing autonomous agent swarms with deterministic state rollbacks, consensus protocols, and API safeguards.',
    skillLevel: 'Advanced',
    duration: '3.5 Hours (Live Workshop)',
    date: 'Saturday, Oct 11, 2026',
    instructor: 'Dr. Evelyn Vance',
    instructorRole: 'Head of Autonomous Systems, Nexora Labs',
    seatsLeft: 14,
    topics: ['Agent Topology', 'Consensus Protocols', 'Memory Caching', 'Telemetry']
  },
  {
    id: 'ws-2',
    title: 'Production RAG & Vector Pipeline Engineering',
    description: 'Architecting ultra-low latency semantic retrieval pipelines with hybrid search, re-ranking models, and synthetic evaluation datasets.',
    skillLevel: 'Intermediate',
    duration: '4 Hours (Live Workshop)',
    date: 'Wednesday, Oct 15, 2026',
    instructor: 'Marcus Sterling',
    instructorRole: 'Lead Platform Architect',
    seatsLeft: 8,
    topics: ['HNSW vs IVF', 'Re-ranking Cross-Encoders', 'Metadata Filtering', 'Hallucination Checks']
  },
  {
    id: 'ws-3',
    title: 'AI in Legal Practice: Risk, Ethics & Document Automation',
    description: 'Practical compliance frameworks for legal professionals incorporating AI into contract review, due diligence, and legal discovery workflows.',
    skillLevel: 'All Levels',
    duration: '2.5 Hours (Live Workshop)',
    date: 'Tuesday, Oct 21, 2026',
    instructor: 'Sarah Jenkins, Esq.',
    instructorRole: 'Director of Legal Technology & Regulatory Affairs',
    seatsLeft: 22,
    topics: ['Statutory Verification', 'Ethical Guardrails', 'Prompt Auditing', 'Non-Disclosure Compliance']
  },
  {
    id: 'ws-4',
    title: 'Hands-on Edge Robotics: Vision-Language-Action Models',
    description: 'Deploying lightweight vision-action neural controllers onto embedded robotics platforms for real-time spatial manipulation tasks.',
    skillLevel: 'Advanced',
    duration: '4.5 Hours (Live Workshop)',
    date: 'Saturday, Oct 25, 2026',
    instructor: 'Kiran Patel',
    instructorRole: 'Robotics Engineering Lead',
    seatsLeft: 6,
    topics: ['Spatial Point Clouds', 'VLA Architectures', 'Edge Quantization', 'Physical Safety Interlocks']
  }
];

export const RESOURCES_DATA: Resource[] = [
  {
    id: 'res-1',
    title: 'The Comprehensive Guide to Modern Transformer Self-Attention',
    type: 'Guide',
    category: 'Fundamentals',
    description: 'An intuitive, mathematically grounded breakdown of query, key, value projections and why scaled dot-product attention scales quadratically.',
    readTime: '12 min read',
    level: 'Intermediate',
    date: 'Sep 2026',
    contentSnippet: 'Attention mechanisms allow neural networks to dynamically weight disparate positions in a sequence regardless of spatial distance. By computing softmax((Q * K^T) / sqrt(d_k)) * V, the network forms contextualized token representations...',
    takeaways: [
      'Geometric meaning of Key-Query compatibility matrix',
      'Why root dimension scaling stabilizes softmax gradients',
      'FlashAttention memory optimizations (SRAM tiling)'
    ]
  },
  {
    id: 'res-2',
    title: 'Deterministic Guardrails for Non-Deterministic Generative Models',
    type: 'Tutorial',
    category: 'Generative AI',
    description: 'How to build production-grade schema enforcement, fallback cascades, and automated validation filters around LLM outputs.',
    readTime: '15 min read',
    level: 'Advanced',
    date: 'Aug 2026',
    contentSnippet: 'Deploying LLMs in mission-critical environments requires strict deterministic output guarantees. Combining Pydantic/JSON-Schema constraints with context-free grammar logit bias eliminates parsing failures at inference time...',
    takeaways: [
      'Grammar-guided constrained decoding techniques',
      'Automatic self-correction retries with differential feedback',
      'Rate-limiting and token quota management strategies'
    ]
  },
  {
    id: 'res-3',
    title: 'Autonomous Robotics: Sensor Fusion & Spatial Neural Representation',
    type: 'Whitepaper',
    category: 'Robotics',
    description: 'Experimental results comparing 3D Gaussian Splatting and occupancy voxel grids for real-time robotic obstacle avoidance.',
    readTime: '18 min read',
    level: 'Advanced',
    date: 'Jul 2026',
    contentSnippet: 'Modern mobile manipulation robots must maintain a coherent 3D mental map of their dynamic workspace. We evaluate spatial radiance fields alongside fast octree occupancy grids to achieve 90Hz real-time path replanning...',
    takeaways: [
      'Real-time point cloud registration via Iterative Closest Point',
      'Zero-shot spatial grounding using open-vocabulary detectors',
      'Sub-5ms trajectory recomputation algorithms'
    ]
  },
  {
    id: 'res-4',
    title: 'Legal AI Compliance: Evaluating Hallucination Hazards in Briefs',
    type: 'Technical Article',
    category: 'Legal Tech',
    description: 'Methodologies for measuring statutory grounding accuracy and building automated citation cross-verifiers for legal discovery.',
    readTime: '9 min read',
    level: 'Beginner',
    date: 'Aug 2026',
    contentSnippet: 'In the legal domain, fictitious case citations present immense professional liability. We demonstrate a dual-engine architecture where every generated assertion must be backed by an unambiguous cryptographic citation hash...',
    takeaways: [
      'Why legal hallucination rate must be verified under 0.1%',
      'Automated citation matching against official court registers',
      'Human-in-the-loop sign-off protocols'
    ]
  },
  {
    id: 'res-5',
    title: 'Zero-to-One: Building Event-Driven AI Automation Pipelines',
    type: 'Experiment',
    category: 'Automation',
    description: 'Hands-on architectural blueprint connecting Slack, Stripe webhooks, and CRM data through a self-healing AI orchestration engine.',
    readTime: '14 min read',
    level: 'Intermediate',
    date: 'Sep 2026',
    contentSnippet: 'Traditional automation pipelines break when unstructured payloads change. By introducing an adaptive semantic intermediary layer, incoming events are automatically normalized before reaching downstream enterprise endpoints...',
    takeaways: [
      'Idempotent webhook processing patterns',
      'Schema evolution without system downtime',
      'Dead-letter queues and automated remediation agents'
    ]
  }
];

export const WORKFLOW_PRESETS = [
  {
    id: 'customer-intake',
    name: 'Enterprise Customer Intake',
    description: 'Inbound high-priority support ticket or lead qualification',
    nodes: [
      {
        id: 'n1',
        label: 'Inbound Webhook',
        sublabel: 'Event Trigger',
        type: 'trigger' as const,
        icon: 'Zap',
        status: 'completed' as const,
        detail: 'Ticket #NX-8821 received via REST API payload (Type: Enterprise Support)'
      },
      {
        id: 'n2',
        label: 'Nexora AI Cognitive Core',
        sublabel: 'Semantic Analysis',
        type: 'ai' as const,
        icon: 'Brain',
        status: 'processing' as const,
        detail: 'Classifying urgency, sentiment score (0.92 urgency), and intent extraction'
      },
      {
        id: 'n3',
        label: 'Dispatch & Tool Call',
        sublabel: 'Automated Action',
        type: 'action' as const,
        icon: 'Send',
        status: 'idle' as const,
        detail: 'Routing to Tier-3 Solution Engineer & drafting synthesized resolution context'
      },
      {
        id: 'n4',
        label: 'Verified Resolution',
        sublabel: 'End Result',
        type: 'result' as const,
        icon: 'CheckCircle2',
        status: 'idle' as const,
        detail: 'SLA response dispatched in 1.2s • CRM contact profile updated with summary'
      }
    ]
  },
  {
    id: 'contract-review',
    name: 'Automated Contract Review',
    description: 'Vendor NDA and Master Services Agreement verification',
    nodes: [
      {
        id: 'c1',
        label: 'PDF Document Upload',
        sublabel: 'File Trigger',
        type: 'trigger' as const,
        icon: 'FileText',
        status: 'completed' as const,
        detail: 'Vendor_Agreement_v3.pdf (42 pages, 8.4 MB) ingested via secure sFTP'
      },
      {
        id: 'c2',
        label: 'Nexora LexiCheck AI',
        sublabel: 'Clause Extraction',
        type: 'ai' as const,
        icon: 'Scale',
        status: 'processing' as const,
        detail: 'Evaluating liability caps, non-solicitation, and indemnification deviations'
      },
      {
        id: 'c3',
        label: 'Risk Flagging & Redline',
        sublabel: 'Compliance Action',
        type: 'action' as const,
        icon: 'AlertTriangle',
        status: 'idle' as const,
        detail: 'Flagging 2 unlimited liability clauses; generating suggested substitute language'
      },
      {
        id: 'c4',
        label: 'Executive Summary Brief',
        sublabel: 'Audit Result',
        type: 'result' as const,
        icon: 'FileCheck',
        status: 'idle' as const,
        detail: 'Audit report exported with side-by-side clause risk scores for General Counsel'
      }
    ]
  },
  {
    id: 'robotics-telemetry',
    name: 'Robotic Quality Inspection',
    description: 'High-speed conveyor defect detection & mechanical arm sorting',
    nodes: [
      {
        id: 'r1',
        label: 'Camera Frame Stream',
        sublabel: 'Hardware Trigger',
        type: 'trigger' as const,
        icon: 'Camera',
        status: 'completed' as const,
        detail: '4K 120fps optical sensor frame captured on Assembly Line B'
      },
      {
        id: 'r2',
        label: 'Spatial Vision Model',
        sublabel: 'Edge AI Inference',
        type: 'ai' as const,
        icon: 'Eye',
        status: 'processing' as const,
        detail: 'Identifying microscopic surface fracture (0.3mm hairline tolerance breach)'
      },
      {
        id: 'r3',
        label: 'Pneumatic Actuator',
        sublabel: 'Mechanical Action',
        type: 'action' as const,
        icon: 'Cpu',
        status: 'idle' as const,
        detail: 'Triggering sub-second pneumatic diverter arm to route item to secondary bin'
      },
      {
        id: 'r4',
        label: 'Quality Telemetry Log',
        sublabel: 'IoT Result',
        type: 'result' as const,
        icon: 'Activity',
        status: 'idle' as const,
        detail: 'Zero conveyor stoppage • Defect coordinate logged to manufacturing telemetry'
      }
    ]
  }
];
