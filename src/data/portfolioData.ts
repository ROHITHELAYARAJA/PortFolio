export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  brandColor: string;
}

export interface TechnologyItem {
  name: string;
  iconName: string;
  color?: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  status: 'Ongoing' | 'Completed' | 'Delivered';
  technologies: TechnologyItem[];
  achievements: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  primaryTech: string[];
  repoUrl: string;
  liveUrl?: string;
  stats?: { label: string; value: string }[];
  featured: boolean;
  highlights: string[];
  architectureSummary: string;
  problem: string;
  solution: string;
  decisions: string[];
  challenges: string[];
  results: string[];
}

export interface LabItem {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  tags: string[];
  previewUrl: string;
  details: string;
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  slug: string;
  status: 'Published' | 'Upcoming';
}

export const AUTHOR_INFO = {
  name: 'Rohith E',
  title: 'Software Developer',
  location: 'Namakkal, Tamil Nadu, India',
  phone: '+91 96554 83130',
  email: 'e.rohit3130@gmail.com',
  avatarUrl: '/assets/profile.png',
  heroSubtitle: 'Software Developer · Backend & Full-Stack Systems',
  tagline: 'Third-year B.E. Artificial Intelligence & Data Science student building backend systems, AI products, and client web applications.',
  bioParagraphs: [
    'Third-year B.E. Artificial Intelligence & Data Science student focused on backend and full-stack software development.',
    'Built and deployed applications with Java, Spring Boot, React, TypeScript, SQL, and AWS, including client websites, an engineering learning platform, and an AI study assistant.',
    'Strong foundation in DSA, OOP, DBMS, Operating Systems, and Computer Networks. Solved 315+ problems on LeetCode.'
  ],
  currentlyBuilding: {
    label: 'Currently building',
    project: 'Virtual Labs & Blast AI',
    url: 'https://github.com/ROHITHELAYARAJA/Virtual-Labs',
  },
  socials: [
    {
      name: 'GitHub',
      url: 'https://github.com/ROHITHELAYARAJA',
      icon: 'github',
      brandColor: '#181717',
    },
    {
      name: 'LeetCode',
      url: 'https://leetcode.com/Shinchan_2007',
      icon: 'code',
      brandColor: '#FFA116',
    },
    {
      name: 'Portfolio Live',
      url: 'https://rohith-digital-x-xi.vercel.app',
      icon: 'external-link',
      brandColor: '#0070F3',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rohith-elayaraja/',
      icon: 'linkedin',
      brandColor: '#0A66C2',
    },
    {
      name: 'Email',
      url: 'mailto:e.rohit3130@gmail.com',
      icon: 'mail',
      brandColor: '#EA4335',
    },
    {
      name: 'Phone',
      url: 'tel:+919655483130',
      icon: 'phone',
      brandColor: '#10B981',
    },
  ],
};

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'virtual-labs',
    slug: 'virtual-labs',
    title: 'Virtual Labs',
    category: 'Full-Stack Platform',
    summary: 'Multi-tenant engineering learning platform with interactive simulations and in-browser code visualizers.',
    primaryTech: ['Next.js', 'Spring Boot', 'Java 21', 'PostgreSQL', 'Tailwind CSS'],
    repoUrl: 'https://github.com/ROHITHELAYARAJA/Virtual-Labs',
    featured: true,
    highlights: [
      'Multi-tenant routing supporting dedicated institutional syllabi and isolated cohorts',
      'In-browser AST visualizer and JVM execution call-stack tracing engine for Data Structures',
      'Spring Boot 3 REST API backend with Supabase PostgreSQL and Row Level Security'
    ],
    architectureSummary: 'Next.js client communicating via JWT Bearer tokens with a Spring Boot REST API backed by Supabase PostgreSQL with tenant-isolated Row Level Security.',
    problem: 'Engineering colleges face physical lab scheduling bottlenecks and lack visual code tracing for algorithmic comprehension.',
    solution: 'Designed and deployed an integrated learning hub with in-browser simulators, JVM call-stack tracing, and faculty analytics.',
    decisions: [
      'Adopted Spring Boot 3.3 for student assessment evaluations and grading invariants.',
      'Selected Supabase PostgreSQL with tenant-based foreign keys and RLS policies for institutional data segregation.',
      'Built custom AST-based step runner to visualize memory heap allocation and recursion call-stacks directly in the browser.'
    ],
    challenges: [
      'Orchestrating concurrent simulation states without heavy WebSocket backend infrastructure.',
      'Maintaining compatibility with multiple college grading rubrics and custom laboratory manuals.'
    ],
    results: [
      'Deployed interactive laboratory courses covering Data Structures and Operating Systems.',
      'Eliminated manual software installation hurdles across college computer centers.'
    ],
  },
  {
    id: 'blast-ai',
    slug: 'blast-ai',
    title: 'Blast AI',
    category: 'AI Application',
    summary: 'Document-aware AI study assistant that converts textbooks and notes into structured summaries, active-recall flashcards, and quizzes.',
    primaryTech: ['React', 'TypeScript', 'AWS Bedrock', 'SQLite', 'Tailwind CSS'],
    repoUrl: 'https://github.com/ROHITHELAYARAJA/Student-AI-Assistant',
    featured: true,
    highlights: [
      'Document parsing for searchable PDFs, text, and markdown files',
      'Document-aware tutoring generating concept breakdowns and verification questions',
      'Deterministic generation schemas producing flashcards and multiple-choice quizzes'
    ],
    architectureSummary: 'React TypeScript frontend communicating with an Express backend using SQLite WAL storage, integrated with AWS Bedrock and deployed on AWS S3.',
    problem: 'Students are overwhelmed by dense academic documents and generic LLM interfaces that lack grounded source citations.',
    solution: 'Engineered a specialized document workspace that parses text into bounded chunks, executes structured generation schemas, and presents interactive study tools.',
    decisions: [
      'Enforced bounded document size limits to ensure stable execution.',
      'Separated content generation into discrete, auditable JSON schema pipelines.'
    ],
    challenges: [
      'Handling PDF stream extraction edge cases without third-party cloud OCR fees.',
      'Designing reliable fallback handling and test suites to verify workflows.'
    ],
    results: [
      'Study workspace featuring automated flashcards, quizzes, and live speech synthesis playback.',
      'Verified integration test suite running on mocked environments.'
    ],
  },
  {
    id: 'bank-management-system',
    slug: 'bank-management-system',
    title: 'Bank Management System',
    category: 'Backend System',
    summary: 'Transaction-safe core banking backend with atomic ACID rollback controls, BCrypt password hashing, and MySQL persistence.',
    primaryTech: ['Java', 'JDBC', 'MySQL', 'BCrypt', 'Maven'],
    repoUrl: 'https://github.com/ROHITHELAYARAJA/Bank-Management-System',
    featured: true,
    highlights: [
      'Layered enterprise architecture separating Presentation, Business Service, and DAO layers',
      'BCrypt password hashing ensuring zero plaintext credential exposure in the database',
      'Atomic JDBC transaction handling with explicit commit and rollback boundaries'
    ],
    architectureSummary: 'Clean MVC/DAO Java application separating Presentation, Banking Service, and MySQL Data Access with transaction isolation.',
    problem: 'Database applications often suffer from plaintext credentials, SQL injection vectors, and non-transactional balance mutations causing data corruption.',
    solution: 'Built a disciplined banking backend that treats balance mutations as atomic financial transactions with rollback guarantees and BCrypt security.',
    decisions: [
      'Employed pure JDBC to maintain precise control over transaction boundaries and SQL execution.',
      'Established immutable Account and Transaction data transfer objects to prevent state leakage.'
    ],
    challenges: [
      'Ensuring simultaneous debits and credits in inter-account fund transfers atomically commit or roll back.',
      'Handling overdraft limits cleanly without exposing negative balance anomalies.'
    ],
    results: [
      'Secure architecture using PreparedStatement parameterization and BCrypt encryption.',
      'Consistent transaction handling verified through multi-scenario failure and rollback tests.'
    ],
  },
  {
    id: 'rohith-digital-x',
    slug: 'rohith-digital-x',
    title: 'Rohith Digital X',
    category: 'Client Systems',
    summary: 'Production client web applications and localized digital storefronts featuring direct WhatsApp cart checkout flows.',
    primaryTech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vercel'],
    repoUrl: 'https://github.com/ROHITHELAYARAJA',
    liveUrl: 'https://rohith-digital-x-xi.vercel.app',
    featured: false,
    highlights: [
      'Online bakery ordering catalog with automated WhatsApp cart payloads',
      'Digital agency and portfolio websites with responsive service showcases',
      'Full delivery lifecycle from requirements to edge CDN deployment'
    ],
    architectureSummary: 'Lightweight Vite and React frontends deployed on global CDN edges with progressive image streaming and localized SEO.',
    problem: 'Local business clients suffered from slow, complex platforms that frustrated mobile users and lost inbound inquiries.',
    solution: 'Engineered fast React storefronts with direct WhatsApp cart checkout flows that eliminate friction for customers.',
    decisions: [
      'Implemented direct WhatsApp cart payloads suited to regional shopping habits.',
      'Enforced responsive layouts optimized for mobile devices and varied connection speeds.'
    ],
    challenges: [
      'Balancing high-resolution catalog imagery with fast initial page load requirements.'
    ],
    results: [
      'Delivered production client websites with zero reported downtime and smooth mobile performance.',
      'Improved client inquiry conversion rates through direct messaging ordering.'
    ],
  },
];

export const OPEN_SOURCE_CONTRIBUTION = {
  project: 'AbacusAI Bot',
  upstreamRepo: 'abacusai/abacusai-bot',
  upstreamUrl: 'https://github.com/abacusai/abacusai-bot',
  prNumber: 70,
  prTitle: 'fix(agent): normalize Windows scratch paths for 8.3 short paths',
  prUrl: 'https://github.com/abacusai/abacusai-bot/pull/70',
  status: 'MERGED' as const,
  mergedDate: '2026',
  badge: 'MERGED UPSTREAM ✓',
  summary: 'Normalized Windows 8.3 short paths against agent scratch-path security guardrails with regression test coverage.',
  primaryTech: ['TypeScript', 'Node.js', 'Security Guardrails', 'Windows API'],
  problem: 'On Windows operating systems, temporary directory paths frequently resolved using an 8.3 short path representation (RUNNER~1). Guardrails evaluated against canonical long paths, causing legitimate scratch operations to be rejected.',
  solution: 'Implemented consistent path canonicalization across Windows temp-dir utilities, ensuring both representations resolve identically prior to guardrail checks.',
  verification: 'Authored regression test fixtures validating Windows 8.3 short path expansion and cross-platform path equality.',
};

export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  cgpa: string;
  coursework: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  year?: string;
  description: string;
  badge?: string;
}

export const EDUCATION_DATA: EducationItem = {
  institution: 'VSB Engineering College',
  degree: 'B.E. Artificial Intelligence & Data Science',
  period: '2024 – 2028',
  location: 'Karur, Tamil Nadu',
  cgpa: '8.00 / 10',
  coursework: ['Data Structures & Algorithms', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
};

export const TECHNICAL_SKILLS_DATA: SkillCategory[] = [
  { category: 'Languages', skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'] },
  { category: 'Backend', skills: ['Spring Boot (REST APIs, JDBC)', 'Express', 'Java 21'] },
  { category: 'DevOps & Cloud', skills: ['Docker', 'GitHub Actions', 'Linux', 'AWS', 'Vercel'] },
  { category: 'Frontend', skills: ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { category: 'Databases', skills: ['MySQL', 'PostgreSQL', 'Supabase', 'Firebase'] },
  { category: 'Testing & API Tools', skills: ['Postman', 'JUnit', 'Jasmine'] },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    title: '315+ DSA Problems Solved',
    issuer: 'LeetCode',
    description: 'Solved 315+ Data Structures and Algorithms problems on LeetCode and regularly participated in programming contests.',
    badge: 'Shinchan_2007',
  },
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    description: 'Validated cloud architecture principles, security, compute, storage, and serverless best practices.',
    badge: 'AWS Certified',
  },
  {
    title: 'Google AI Professional Certificate',
    issuer: 'Google',
    description: 'Professional artificial intelligence workflows, model implementation, and machine learning foundations.',
    badge: 'Google AI',
  },
  {
    title: 'HackerRank SQL Intermediate / Gold Achievement',
    issuer: 'HackerRank',
    year: '2026',
    description: 'Complex query optimization, joins, aggregation, grouping, and relational schema management.',
    badge: 'Gold 2026',
  },
];

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'rohith-digital-x',
    company: 'Rohith Digital X',
    role: 'Freelance Software Developer',
    period: 'Aug 2026 – Present',
    location: 'Namakkal & Madurai, Tamil Nadu · Remote',
    status: 'Ongoing',
    technologies: [
      { name: 'React', iconName: 'react', color: '#61DAFB' },
      { name: 'TypeScript', iconName: 'typescript', color: '#3178C6' },
      { name: 'Next.js', iconName: 'nextjs', color: '#111111' },
      { name: 'Tailwind CSS', iconName: 'tailwind', color: '#38BDF8' },
      { name: 'Vite', iconName: 'vite', color: '#646CFF' },
      { name: 'Vercel', iconName: 'vercel', color: '#111111' },
    ],
    achievements: [
      'Delivered 3 production websites for a local business, a digital marketing agency, and my own software portfolio, handling requirements, development, testing, deployment, and revisions.',
      'Built Cake Lover Namakkal\'s website to make products and ordering information easier to find; the client reported approximately 30% revenue growth after launch.',
      'Designed and launched the Anis Creation website for a Madurai digital marketing agency, with responsive service pages and clear contact and enquiry paths.',
      'Live deployment: rohith-digital-x-xi.vercel.app.'
    ],
  },
  {
    id: 'open-source-abacus',
    company: 'AbacusAI Bot',
    role: 'Open Source Contributor',
    period: '2026',
    location: 'GitHub Upstream',
    status: 'Completed',
    technologies: [
      { name: 'TypeScript', iconName: 'typescript', color: '#3178C6' },
      { name: 'Node.js', iconName: 'nodejs', color: '#339933' },
      { name: 'Security Guardrails', iconName: 'shield', color: '#8B5CF6' },
    ],
    achievements: [
      'Fixed a Windows 8.3 temp-path bug in the agent guardrails that blocked valid scratch-file writes.',
      'Added Windows regression tests for scratch-path handling; the fix was reviewed and merged upstream in PR #70.',
    ],
  },
];

export const ENGINEERING_LAB_ITEMS: LabItem[] = [
  {
    id: 'jvm-tracer',
    title: 'In-Browser JVM Call-Stack & State Engine',
    category: 'Runtime Simulation',
    description: 'Custom AST-based step runner illustrating recursion trees, activation records, and heap mutations in real time.',
    date: '2026',
    tags: ['AST', 'Java', 'Next.js', 'Visualizer'],
    previewUrl: '/assets/lab-jvm.svg',
    details: 'Developed for the Virtual Labs platform to help engineering students visualize call-stack frames during recursive mergesort and binary tree traversals without spinning up heavy remote container sandboxes.'
  },
  {
    id: 'multi-tenant-rls',
    title: 'Multi-Tenant PostgreSQL Architecture',
    category: 'Database Design',
    description: 'PostgreSQL schema with institution-scoped Row Level Security (RLS) policies for complete campus data isolation.',
    date: '2026',
    tags: ['PostgreSQL', 'Supabase', 'RLS', 'Security'],
    previewUrl: '/assets/lab-db.svg',
    details: 'Engineered for Virtual Labs to support 500–600 student cohorts across affiliated colleges. Enforces strict college_id tenant isolation at the database layer.'
  },
  {
    id: 'doc-ai-pipeline',
    title: 'Bounded Document Parsing & Chunking Pipeline',
    category: 'AI Pipeline',
    description: 'Deterministic token-budget chunker with schema validation for academic textbooks and technical lecture notes.',
    date: '2026',
    tags: ['AI Engine', 'Bedrock', 'PDF', 'TypeScript'],
    previewUrl: '/assets/lab-ai.svg',
    details: 'Powers Blast AI by slicing 80-page searchable PDFs into contextual sections, preventing model hallucination and ensuring accurate citations on generated flashcards.'
  },
  {
    id: 'bank-transactions',
    title: 'ACID Transaction Engine with JDBC Rollbacks',
    category: 'System Reliability',
    description: 'Financial state machine guaranteeing atomic balance transfers with connection-level rollback triggers on failure.',
    date: '2026',
    tags: ['Java', 'JDBC', 'MySQL', 'ACID'],
    previewUrl: '/assets/lab-bank.svg',
    details: 'Core transaction module for Bank Management System preventing race conditions and double-spending across concurrent deposit and debit sequences.'
  },
  {
    id: 'windows-path-normalizer',
    title: 'Windows 8.3 Short Path Canonicalizer',
    category: 'OS Interop',
    description: 'Cross-platform path resolution matrix neutralizing 8.3 short-name mismatches against security guardrail boundaries.',
    date: '2026',
    tags: ['Windows API', 'Guardrails', 'Open Source', 'Node.js'],
    previewUrl: '/assets/lab-oss.svg',
    details: 'Directly grounded in merged upstream PR #70 on abacusai/abacusai-bot. Normalizes RUNNER~1 short names into canonical system paths.'
  },
  {
    id: 'whatsapp-checkout',
    title: 'Sub-0.4s Headless E-Commerce Cart Engine',
    category: 'Frontend Engineering',
    description: 'Client-side reactive catalog generator that encodes multi-item orders into preformatted WhatsApp direct messaging payloads.',
    date: '2026',
    tags: ['React', 'Vite', 'Tailwind', 'Edge'],
    previewUrl: '/assets/lab-cart.svg',
    details: 'Production module deployed across Rohith Digital X client stores, reducing checkout abandonment by eliminating registration requirements.'
  },
];

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'building-virtual-labs',
    title: 'How I Built Virtual Labs: A Multi-Tenant Engineering Learning Platform',
    category: 'Architecture',
    date: 'Oct 2026',
    readTime: '8 min read',
    description: 'Deconstructing the system design behind a campus cloud delivering 12 interactive engineering laboratories, in-browser JVM tracers, and multi-tenant isolation.',
    slug: 'building-virtual-labs',
    status: 'Upcoming',
  },
  {
    id: 'merged-pr-windows-paths',
    title: 'What I Learned from My First Merged Open-Source PR: The 8.3 Path Trap',
    category: 'Open Source',
    date: 'Sep 2026',
    readTime: '5 min read',
    description: 'Why Windows 8.3 short-name paths break legitimate agent scratch operations, and how to write rigorous regression tests for cross-platform file paths.',
    slug: 'merged-pr-windows-paths',
    status: 'Upcoming',
  },
  {
    id: 'designing-ai-study-tools',
    title: 'Designing Document-Aware AI Study Tools: Beyond Naive Chatbots',
    category: 'AI & ML',
    date: 'Aug 2026',
    readTime: '6 min read',
    description: 'Architectural lessons from building Blast AI: schema enforcement, bounded token budgeting, and turning 80-page PDFs into actionable active recall flashcards.',
    slug: 'designing-ai-study-tools',
    status: 'Upcoming',
  },
  {
    id: 'reliable-spring-boot-apis',
    title: 'Building Reliable Spring Boot REST APIs with Pure Transaction Boundaries',
    category: 'Backend',
    date: 'Jul 2026',
    readTime: '7 min read',
    description: 'Best practices for JDBC transaction isolation, BCrypt password security, and structuring maintainable DAO and Service layers.',
    slug: 'reliable-spring-boot-apis',
    status: 'Upcoming',
  },
];
