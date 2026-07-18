// Data model representing the developer's career repository
export const developerProfile = {
  name: "Sai Akshith Kendyala",
  title: "Software & AI Developer",
  subtitle: "AI & Full Stack Enthusiast",
  bio: "Building production-ready AI pipelines, scalable microservices, and immersive frontends. Focused on solving real-world challenges through elegant, high-throughput software design.",
  location: "Hyderabad, India",
  email: "akshithkendyala@gmail.com",
  github: "https://github.com/akshithkendyala",
  linkedin: "https://www.linkedin.com/in/sai-akshith-kendyala-309205360/",
  resumeUrl: "C:\Users\akshi\OneDrive\Desktop\Akshith\Portfolio\public\Sai_Akshith_Resume_Enhanced.pdf", // Add resume download path or placeholder link
};

export const codingProfiles = [
  {
    id: "github",
    name: "GitHub",
    handle: "sai-akshith",
    url: "https://github.com/sai-akshith",
    stats: { repositories: 42, contributions: "1,248+", stars: 124, followers: 85 },
    languages: [
      { name: "Python", percent: 45, color: "#3572A5" },
      { name: "TypeScript", percent: 25, color: "#3178C6" },
      { name: "C++", percent: 18, color: "#f34b7d" },
      { name: "JavaScript", percent: 12, color: "#f1e05a" }
    ],
    activityPattern: [8, 5, 3, 6, 2, 7, 9, 4, 1, 8, 10, 5, 3, 6, 4, 8, 12, 7, 5, 3, 2, 4, 9, 6] // Fake grid simulation
  },
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "sai_akshith",
    url: "https://leetcode.com/sai_akshith",
    stats: { solved: "450+", rating: "1850+", badge: "Knight", globalRank: "Top 4.2%" },
    languages: [
      { name: "C++", percent: 60, color: "#f34b7d" },
      { name: "Python", percent: 35, color: "#3572A5" },
      { name: "JavaScript", percent: 5, color: "#f1e05a" }
    ],
    activityPattern: [12, 15, 8, 9, 14, 10, 7, 8, 13, 11, 15, 12, 9, 8, 6, 5, 11, 14, 12, 9, 8, 7, 6, 5]
  },
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "sai_akshith",
    url: "https://codeforces.com/profile/sai_akshith",
    stats: { rating: "1542 (Specialist)", maxRating: "1610", rank: "Specialist", solved: "200+" },
    languages: [
      { name: "C++", percent: 100, color: "#f34b7d" }
    ],
    activityPattern: [4, 2, 0, 5, 8, 2, 0, 3, 5, 2, 0, 6, 4, 1, 0, 2, 8, 3, 0, 4, 2, 0, 5, 1]
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "sai_akshith_k",
    url: "https://www.codechef.com/users/sai_akshith_k",
    stats: { rating: "1720 (3-Star)", maxRating: "1785", division: "Div 2", stars: "3 ★" },
    languages: [
      { name: "C++", percent: 85, color: "#f34b7d" },
      { name: "Python", percent: 15, color: "#3572A5" }
    ],
    activityPattern: [3, 0, 2, 4, 1, 5, 0, 3, 2, 0, 4, 1, 6, 0, 3, 2, 0, 4, 1, 5, 0, 3, 2, 0]
  },
  {
    id: "hackerrank",
    name: "HackerRank",
    handle: "sai_akshith",
    url: "https://www.hackerrank.com/sai_akshith",
    stats: { badges: "Problem Solving (5 ★)", python: "5 ★", cpp: "5 ★", sql: "4 ★" },
    languages: [
      { name: "C++", percent: 40, color: "#f34b7d" },
      { name: "Python", percent: 40, color: "#3572A5" },
      { name: "SQL", percent: 20, color: "#e38c00" }
    ],
    activityPattern: [6, 4, 5, 3, 7, 2, 8, 4, 6, 5, 3, 7, 2, 8, 4, 6, 5, 3, 7, 2, 8, 4, 6, 5]
  },
  {
    id: "geeksforgeeks",
    name: "GeeksforGeeks",
    handle: "sai_akshith",
    url: "https://auth.geeksforgeeks.org/user/sai_akshith",
    stats: { score: "1250+", solved: "320+", rank: "College Rank: 3", articles: 2 },
    languages: [
      { name: "C++", percent: 70, color: "#f34b7d" },
      { name: "Java", percent: 20, color: "#b07219" },
      { name: "Python", percent: 10, color: "#3572A5" }
    ],
    activityPattern: [5, 5, 4, 3, 6, 7, 2, 1, 4, 5, 3, 6, 7, 2, 1, 4, 5, 3, 6, 7, 2, 1, 4, 5]
  }
];

export const skillBranches = {
  mainBranchName: "main",
  branches: [
    {
      name: "feature/languages",
      color: "#58A6FF",
      skills: [
        { name: "Python", level: "Expert", years: "4 years", details: "Core development, scripting, data engineering, and ML model design." },
        { name: "C++", level: "Expert", years: "4 years", details: "Competitive programming, high-efficiency data structures, OOP." },
        { name: "JavaScript", level: "Advanced", years: "3 years", details: "Full-stack client logic, DOM manipulation, asynchronous architecture." }
      ]
    },
    {
      name: "feature/web-frameworks",
      color: "#2EA44F",
      skills: [
        { name: "React", level: "Advanced", years: "3 years", details: "Reusable design systems, state engines (Redux/Zustand), SSR/Next.js." },
        { name: "Node.js", level: "Intermediate", years: "2 years", details: "RESTful APIs, Express, real-time WebSockets, auth integration." },
        { name: "SQL", level: "Advanced", years: "3 years", details: "Query optimization, indexing, complex joins, PostgreSQL / MySQL." }
      ]
    },
    {
      name: "feature/ai-ml",
      color: "#BC8CFF",
      skills: [
        { name: "Machine Learning", level: "Advanced", years: "2 years", details: "Scikit-Learn, XGBoost, feature engineering, regression & classification." },
        { name: "Deep Learning", level: "Intermediate", years: "2 years", details: "CNNs, RNNs, transformers, sequence modeling, training dynamics." },
        { name: "TensorFlow", level: "Intermediate", years: "2 years", details: "Model definition, functional API, checkpointing and optimization." },
        { name: "PyTorch", level: "Advanced", years: "2 years", details: "Custom layers, eager execution, PyTorch Lightning, neural architectures." }
      ]
    },
    {
      name: "feature/devops-tools",
      color: "#F2C744",
      skills: [
        { name: "Git", level: "Expert", years: "4 years", details: "Branching workflows, merge conflict resolution, CI/CD integrations." },
        { name: "Docker", level: "Intermediate", years: "2 years", details: "Containerizing apps, multi-stage builds, docker-compose orchestration." },
        { name: "Linux", level: "Advanced", years: "3 years", details: "Bash scripting, process isolation, package managers, server deployment." }
      ]
    }
  ]
};

export const experiences = [
  {
    type: "Internship",
    role: "AI & Full Stack Engineer Intern",
    company: "Vellore Institute of Technology (Research Wing)",
    period: "May 2025 - July 2025",
    description: "Designed a multi-modal computer vision model for automated attendance matching. Restructured the image alignment pipeline, achieving a 14% improvement in processing latency.",
    details: [
      "Built a pipeline integrating facial landmark alignment with a customized ResNet backbone.",
      "Optimized backend request handlers using Node.js cluster pooling, serving 200+ concurrent requests.",
      "Deployed deployment instances inside Docker, decreasing onboarding setup time for new researchers."
    ],
    branchName: "Internships"
  },
  {
    type: "Research",
    role: "Student Researcher - Deep Learning Group",
    company: "VIT ML Labs",
    period: "Oct 2024 - Present",
    description: "Developing deep learning solutions for automated legal document summarization and named entity recognition in legal texts.",
    details: [
      "Fine-tuned domain-specific BERT and Legal-PEGASUS models on specialized legal corpora.",
      "Reduced hallucination rates in summarized briefs by 8% using custom loss functions and semantic matching checks.",
      "Published a peer-reviewed research brief on domain adaptation of transformer models."
    ],
    branchName: "Research"
  },
  {
    type: "Open Source",
    role: "Core Contributor & Maintainer",
    company: "Community Tech Projects",
    period: "Jan 2024 - Present",
    description: "Contributing to community-driven developer utilities and custom developer portfolios.",
    details: [
      "Refactored custom state-management interfaces for an open-source visual git branch visualizer.",
      "Optimized documentation search engines using localized embeddings and vector matching.",
      "Helped onboard 15+ new contributors and maintained CI lint workflows."
    ],
    branchName: "Open Source"
  },
  {
    type: "Hackathons",
    role: "Team Captain & Full Stack Lead",
    company: "Smart India Hackathon & Local Events",
    period: "2023 - 2025",
    description: "Led development for 4 hackathon builds, winning 2 regional titles.",
    details: [
      "Architected real-time IoT visualization platform in React with socket subscriptions.",
      "Designed a vector search retrieval-augmented generation (RAG) system in under 36 hours.",
      "Managed deployment strategies on serverless environments to handle spike loads during jury evaluations."
    ],
    branchName: "Hackathons"
  }
];

export const projects = [
  {
    id: "vision-ai",
    title: "Multimodal Vision AI System",
    branchName: "feature/vision-ai",
    description: "A state-of-the-art computer vision platform designed for real-time facial feature mapping, alignment, and facial authentication.",
    techStack: ["PyTorch", "Python", "React", "Docker", "FastAPI"],
    githubUrl: "https://github.com/sai-akshith/multimodal-vision-ai",
    liveDemoUrl: "#",
    achievements: [
      "Engineered high-accuracy landmark alignment under high rotation variations (up to 45 degrees).",
      "Achieved sub-100ms inference times by implementing TensorRT model compilation.",
      "Developed a modern dashboard for visual profiling of model embeddings using t-SNE projections."
    ]
  },
  {
    id: "attendance-system",
    title: "Smart Classroom Attendance",
    branchName: "feature/attendance-system",
    description: "An automated, camera-driven attendance logging application leveraging facial recognition and edge computing to eliminate manual roll calls.",
    techStack: ["Node.js", "Express", "PostgreSQL", "React", "OpenCV"],
    githubUrl: "https://github.com/sai-akshith/smart-attendance-system",
    liveDemoUrl: "#",
    achievements: [
      "Engineered automated deduplication algorithms that guarantee zero double-counting of students.",
      "Designed a real-time analytics dashboard presenting attendance records, trends, and analytics.",
      "Integrated secure JWT-based administrative overrides and secure audit logging."
    ]
  },
  {
    id: "legal-ai",
    title: "LegalBrief - AI Legal Assistant",
    branchName: "feature/legal-ai",
    description: "A domain-specialized NLP system that ingests legal contracts, performs named entity recognition, and spits out clean summary briefings.",
    techStack: ["Transformers", "HuggingFace", "Python", "Next.js", "Tailwind CSS"],
    githubUrl: "https://github.com/sai-akshith/legal-brief-ai",
    liveDemoUrl: "#",
    achievements: [
      "Fine-tuned LLMs on 50,000+ legal documents using LoRA and PEFT optimization techniques.",
      "Built a secure chat interface offering instant citations to specific paragraphs of long PDFs.",
      "Reduced lawyer summarization workload by an estimated 65% during pilot testing."
    ]
  },
  {
    id: "subscription-intelligence",
    title: "SubIntel - Subscription Analytics",
    branchName: "feature/subscription-intelligence",
    description: "A business intelligence SaaS dashboard analyzing customer churn, monthly recurring revenue, and cohort retention models.",
    techStack: ["React", "Go", "PostgreSQL", "Tailwind CSS", "Recharts"],
    githubUrl: "https://github.com/sai-akshith/sub-intel-analytics",
    liveDemoUrl: "#",
    achievements: [
      "Optimized analytical SQL queries, improving table scanning speeds by 300%.",
      "Implemented Stripe webhook processing pipelines capable of processing transactions asynchronously.",
      "Constructed custom interactive cohort diagrams tracking customer lifespans and subscription decay rates."
    ]
  }
];

export const educationHistory = [
  {
    version: "v4.0",
    stage: "Future Goals",
    title: "Master's & Advanced AI Research",
    institution: "Top Global Universities",
    period: "2026 and Beyond",
    details: "Aspiring to specialize in deep neural networks, multimodal learning representation, and core generative AI alignment.",
    badgeColor: "bg-purple-950 text-purple-300 border-purple-800"
  },
  {
    version: "v3.0",
    stage: "Bachelor of Technology",
    title: "Computer Science & Engineering",
    institution: "Vellore Institute of Technology (VIT)",
    period: "2022 - 2026",
    details: "Focused on Algorithms, Deep Learning, Databases, and Software Architectures. Active member of competitive coding clubs.",
    badgeColor: "bg-green-950 text-green-300 border-green-800"
  },
  {
    version: "v2.0",
    stage: "Intermediate Education",
    title: "MPC (Maths, Physics, Chemistry)",
    institution: "Sri Chaitanya Junior College",
    period: "2020 - 2022",
    details: "Strong fundamental grounding in Mathematics, Physics, and analytical logic. Achieved top marks in competitive engineering entrance tests.",
    badgeColor: "bg-blue-950 text-blue-300 border-blue-800"
  },
  {
    version: "v1.0",
    stage: "Schooling",
    title: "Secondary School Certificate",
    institution: "Silver Oaks International School",
    period: "2010 - 2020",
    details: "Introduced to software logic via scratch programming, HTML, and basic computational models. Cultivated lifelong curiosity.",
    badgeColor: "bg-zinc-800 text-zinc-300 border-zinc-700"
  }
];
