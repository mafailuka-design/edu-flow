export const INITIAL_COURSES = [
  {
    id: "course-1",
    title: "Full-Stack React & Modern Node.js Masterclass",
    slug: "fullstack-react-nodejs-masterclass",
    instructor: {
      id: "inst-1",
      name: "Alex Rivera",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      title: "Senior Full-Stack Architect & Tech Lead",
      bio: "Alex has over 12 years of industry experience building cloud-native web applications for fintech and high-growth startups. Passionate about modern JavaScript and developer ergonomics.",
      rating: 4.9,
      studentsCount: 38400,
      coursesCount: 5,
    },
    category: "Development",
    level: "Intermediate",
    price: 49.99,
    originalPrice: 99.99,
    isFree: false,
    rating: 4.9,
    reviewsCount: 1420,
    students: 12450,
    duration: "18.5 hours",
    totalLessons: 12,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80",
    description: "Master modern full-stack engineering from the ground up. In this comprehensive course, you'll build responsive React frontends with Tailwind CSS and scalable Node.js REST APIs with robust state management, clean architecture, and modern best practices.",
    lastUpdated: "August 2026",
    language: "English",
    objectives: [
      "Build production-grade React applications using modern hooks and component patterns",
      "Design clean, secure RESTful APIs with Node.js, Express, and modern middleware",
      "Implement JWT authentication, authorization, and secure cookie storage",
      "Integrate responsive styling with Tailwind CSS and manage component UI states",
      "Deploy full-stack applications with environment management and continuous delivery"
    ],
    requirements: [
      "Basic understanding of HTML, CSS, and modern JavaScript (ES6+)",
      "A computer running Windows, macOS, or Linux with Node.js installed",
      "No prior experience with React or backend development required"
    ],
    modules: [
      {
        id: "mod-1-1",
        title: "Module 1: React Fundamentals & Component Architecture",
        duration: "1h 45m",
        lessons: [
          {
            id: "les-1-1-1",
            title: "Course Overview & Setting Up Modern Tooling",
            duration: "12m",
            type: "video",
            summary: "Learn what we'll build, configure your IDE with Vite and Tailwind, and understand the project roadmap.",
            content: "Welcome to the Full-Stack Masterclass! In this introductory lesson, we outline our roadmap, set up Vite with fast HMR, configure Tailwind CSS for rapid styling, and explore the architecture of production React applications.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-1-1-2",
            title: "React Component Hierarchy & State Lifecycle",
            duration: "24m",
            type: "video",
            summary: "Deep dive into useState, useEffect, pure components, and unidirectional data flow.",
            content: "React components are pure functions of props and state. Here, we analyze how the virtual DOM reconciles changes, why keys are vital for lists, and how to structure reusable UI elements without prop drilling.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-1-1-3",
            title: "Essential Hooks Guide: useMemo, useCallback & useRef",
            duration: "32m",
            type: "reading",
            summary: "Avoid unnecessary re-renders and access DOM elements safely with modern hooks.",
            content: "Performance optimization in React relies on understanding render triggers. We explore when useMemo and useCallback are beneficial, when they add needless overhead, and how useRef provides mutable instance references.",
            videoUrl: ""
          },
          {
            id: "les-1-1-4",
            title: "Module 1 Knowledge Assessment",
            duration: "15m",
            type: "quiz",
            summary: "Test your understanding of React core principles and hooks.",
            content: "Take this quick 5-question multiple-choice quiz to validate your knowledge of React component lifecycle and state management.",
            quizId: "quiz-react-1"
          }
        ]
      },
      {
        id: "mod-1-2",
        title: "Module 2: Scalable Node.js & API Engineering",
        duration: "2h 15m",
        lessons: [
          {
            id: "les-1-2-1",
            title: "Node.js Event Loop & Asynchronous Architecture",
            duration: "28m",
            type: "video",
            summary: "Understand non-blocking I/O, libuv, microtasks, and thread pools in Node.js.",
            content: "Demystify the Node.js runtime. Learn how the event loop processes timer callbacks, I/O events, and process.nextTick, enabling high-concurrency applications with minimal overhead.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-1-2-2",
            title: "Building RESTful Services with Express & Middleware",
            duration: "35m",
            type: "video",
            summary: "Create structured controllers, route validators, error handling, and CORS policies.",
            content: "Clean architecture begins with separation of concerns. We build custom middleware pipelines, handle synchronous and asynchronous exceptions gracefully, and format standardized JSON responses.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-1-2-3",
            title: "Authentication, JWT Tokens & Password Hashing",
            duration: "40m",
            type: "reading",
            summary: "Implement secure user registration, bcrypt password hashing, and signed JWT authentication.",
            content: "Security is non-negotiable. Learn best practices for salting and hashing credentials, generating signed JSON Web Tokens, verifying claims, and protecting private API endpoints.",
            videoUrl: ""
          },
          {
            id: "les-1-2-4",
            title: "Node.js & Security Checkpoint Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Validate your backend security and Node.js concepts.",
            content: "A comprehensive quiz covering API status codes, middleware chaining, and JWT token authentication.",
            quizId: "quiz-node-1"
          }
        ]
      },
      {
        id: "mod-1-3",
        title: "Module 3: Full-Stack Integration & Production Deployment",
        duration: "3h 05m",
        lessons: [
          {
            id: "les-1-3-1",
            title: "Connecting React Frontend to Node.js Backend",
            duration: "38m",
            type: "video",
            summary: "Handle asynchronous data fetching, caching, loading skeletons, and error boundaries.",
            content: "Connect the frontend and backend with seamless error handling. Implement retry policies, handle offline states, and deliver snappy UI feedback using optimistic updates.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-1-3-2",
            title: "State Synchronization & Real-time Updates",
            duration: "42m",
            type: "video",
            summary: "Persist user sessions, cart or course progress, and handle real-time feedback.",
            content: "Learn strategies for synchronizing client-side local state with server data, managing cache invalidation, and ensuring atomic updates across user actions.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-1-3-3",
            title: "CI/CD, Cloud Deployment & Environment Hardening",
            duration: "30m",
            type: "reading",
            summary: "Deploy your full-stack app with production configuration and health checks.",
            content: "Prepare your application for real users. Configure environment variables, gzip compression, security headers with Helmet, and continuous deployment workflows.",
            videoUrl: ""
          },
          {
            id: "les-1-3-4",
            title: "Final Certification Assessment",
            duration: "20m",
            type: "quiz",
            summary: "Complete the capstone assessment to earn your Full-Stack Masterclass Certificate.",
            content: "Test your comprehensive full-stack knowledge to earn your official completion badge and downloadable certificate.",
            quizId: "quiz-capstone-1"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-1-1",
        studentName: "Elena Rostova",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 days ago",
        comment: "This is easily the highest quality full-stack course I've taken. The explanations of state lifecycles and clean API middleware cleared up doubts I've had for years."
      },
      {
        id: "rev-1-2",
        studentName: "Marcus Thorne",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 week ago",
        comment: "Practical, no fluff, and straight to building modern architectures. The quiz feature and lesson milestones kept me consistently motivated."
      }
    ]
  },
  {
    id: "course-2",
    title: "UI/UX Design Systems & High-Fidelity Prototyping in Figma",
    slug: "ui-ux-design-systems-figma",
    instructor: {
      id: "inst-2",
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      title: "Staff Product Designer & Design Systems Lead",
      bio: "Sophia has designed enterprise design systems used by millions worldwide. She specializes in tokenized design tokens, accessibility, and designer-developer handoff.",
      rating: 4.95,
      studentsCount: 29100,
      coursesCount: 3,
    },
    category: "Design",
    level: "Beginner",
    price: 39.99,
    originalPrice: 79.99,
    isFree: false,
    rating: 4.9,
    reviewsCount: 980,
    students: 8640,
    duration: "14.0 hours",
    totalLessons: 9,
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&auto=format&fit=crop&q=80",
    description: "Learn to design scalable, cohesive, and beautiful digital products. From color theory and typography scales to nested auto-layouts, interactive component variants, and design tokens.",
    lastUpdated: "July 2026",
    language: "English",
    objectives: [
      "Master Figma auto-layout 5.0, variables, and multi-state interactive component sets",
      "Construct a comprehensive design system with typography, color, spacing, and elevation tokens",
      "Design accessible interfaces meeting WCAG 2.1 AA/AAA compliance",
      "Build seamless interactive micro-animations and clickable prototypes for user testing",
      "Conduct professional developer handoff with design tokens and redline specs"
    ],
    requirements: [
      "Free Figma account and a web browser or desktop app",
      "No previous graphic design or coding background required"
    ],
    modules: [
      {
        id: "mod-2-1",
        title: "Module 1: Design Foundations & Visual Hierarchy",
        duration: "1h 30m",
        lessons: [
          {
            id: "les-2-1-1",
            title: "Typography Scales & Systematic Spacing",
            duration: "20m",
            type: "video",
            summary: "Understand modular scales, line-height ratios, and 4px/8px spatial grids.",
            content: "Good UI starts with rhythm. Learn how an 8-point spatial grid creates harmony across viewports, and how to define responsive typographic hierarchies.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-2-1-2",
            title: "Accessible Color Palettes & Contrast Ratios",
            duration: "25m",
            type: "video",
            summary: "Create semantic color tokens with automated contrast checking for light and dark modes.",
            content: "Color is both emotional and functional. We construct neutral ramps, primary brand scales, and semantic functional shades (success, warning, error) that pass WCAG contrast tests.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-2-1-3",
            title: "Foundations Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Test your understanding of grids, typography, and contrast standards.",
            content: "Quick quiz to check your mastery of design hierarchy and spatial grids.",
            quizId: "quiz-figma-1"
          }
        ]
      },
      {
        id: "mod-2-2",
        title: "Module 2: Advanced Figma Component Architecture",
        duration: "2h 00m",
        lessons: [
          {
            id: "les-2-2-1",
            title: "Auto-Layout Mastery & Responsive Constraints",
            duration: "35m",
            type: "video",
            summary: "Learn nested auto-layout, fill vs hug contents, and absolute positioning inside frames.",
            content: "Harness the true power of Figma. We build responsive navigation bars, cards, and modal dialogs that adapt automatically to viewport resizes.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-2-2-2",
            title: "Component Properties, Variants & Interactive States",
            duration: "40m",
            type: "video",
            summary: "Create buttons, inputs, and cards with hover, pressed, disabled, and loading states.",
            content: "Reduce component clutter using Boolean, Text, and Instance swap properties combined with interactive prototype connections.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-2-2-3",
            title: "Figma Architecture Checkpoint",
            duration: "15m",
            type: "quiz",
            summary: "Validate component properties and variant structuring.",
            content: "Test your skills on Figma component variants, slots, and properties.",
            quizId: "quiz-figma-2"
          }
        ]
      },
      {
        id: "mod-2-3",
        title: "Module 3: Prototyping & Developer Handoff",
        duration: "1h 45m",
        lessons: [
          {
            id: "les-2-3-1",
            title: "Smart Animate & High-Fidelity Micro-interactions",
            duration: "30m",
            type: "video",
            summary: "Design delightful page transitions, toggle switches, and sliding drawers.",
            content: "Micro-interactions transform a static mock into a living product. Learn cubic-bezier timing curves and seamless layer naming conventions for smart animate.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-2-3-2",
            title: "Design Tokens & Seamless Engineer Collaboration",
            duration: "25m",
            type: "reading",
            summary: "Export tokens to CSS variables/Tailwind and write comprehensive component documentation.",
            content: "Bridge the gap between design and code. Learn how token taxonomies map 1:1 to Tailwind configurations and design system repositories.",
            videoUrl: ""
          },
          {
            id: "les-2-3-3",
            title: "UI/UX Capstone Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Final test to unlock your Design System Specialist Certificate.",
            content: "Verify your design system strategy and prototyping expertise.",
            quizId: "quiz-capstone-design"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-2-1",
        studentName: "David Kim",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "Figma auto-layout always confused me until Sophia broke it down with simple mental models. Now our team's design system is twice as efficient!"
      }
    ]
  },
  {
    id: "course-3",
    title: "Data Science & Machine Learning Bootcamp with Python",
    slug: "data-science-machine-learning-python",
    instructor: {
      id: "inst-3",
      name: "Dr. Sarah Jenkins",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      title: "AI Research Scientist & Quantitative Analyst",
      bio: "Dr. Jenkins holds a PhD in Computational Statistics and has spearheaded predictive modeling engines for Fortune 500 enterprises and healthcare research labs.",
      rating: 4.88,
      studentsCount: 45200,
      coursesCount: 4,
    },
    category: "Data Science",
    level: "Beginner",
    price: 59.99,
    originalPrice: 119.99,
    isFree: false,
    rating: 4.8,
    reviewsCount: 2310,
    students: 19800,
    duration: "22.0 hours",
    totalLessons: 10,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    description: "From data wrangling with Pandas and NumPy to predictive modeling, regression, classification, and deep neural networks. Real-world datasets with practical, hands-on Jupyter notebooks.",
    lastUpdated: "June 2026",
    language: "English",
    objectives: [
      "Clean, transform, and analyze messy tabular data using Pandas and NumPy",
      "Create publication-ready exploratory data visualizations with Seaborn and Matplotlib",
      "Train, tune, and evaluate Supervised & Unsupervised Machine Learning models with Scikit-Learn",
      "Understand bias-variance tradeoff, cross-validation, regularization, and ROC-AUC metrics",
      "Deploy ML models as lightweight prediction endpoints"
    ],
    requirements: [
      "Basic math and familiarity with high school algebra",
      "No advanced statistics or deep programming experience needed"
    ],
    modules: [
      {
        id: "mod-3-1",
        title: "Module 1: Python for Data Analysis & Exploratory Data Analysis",
        duration: "3h 10m",
        lessons: [
          {
            id: "les-3-1-1",
            title: "Pandas DataFrames, Indexing & Missing Data Handling",
            duration: "35m",
            type: "video",
            summary: "Master vectorized operations, grouping, pivoting, and handling null values efficiently.",
            content: "Learn the core idioms of Pandas. We practice filtering, aggregation with groupby, handling timestamp indexes, and imputing missing records without bias.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-3-1-2",
            title: "Visual Storytelling with Matplotlib & Seaborn",
            duration: "30m",
            type: "video",
            summary: "Design informative distribution plots, heatmaps, and correlation matrices.",
            content: "Effective EDA uncovers hidden patterns before modeling. Learn how to spot multicollinearity, skewed distributions, and outliers visually.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-3-1-3",
            title: "EDA & Python Data Science Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Verify your Pandas and data preparation knowledge.",
            content: "Questions covering DataFrame manipulations, vectorization, and statistical charts.",
            quizId: "quiz-data-1"
          }
        ]
      },
      {
        id: "mod-3-2",
        title: "Module 2: Classical Machine Learning Algorithms",
        duration: "4h 00m",
        lessons: [
          {
            id: "les-3-2-1",
            title: "Linear & Logistic Regression Under the Hood",
            duration: "40m",
            type: "video",
            summary: "Gradient descent, loss functions, odds ratios, and decision boundaries.",
            content: "Understand the mathematical foundations behind regression models. Learn how cost minimization drives feature weights and how log-odds convert to probabilities.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-3-2-2",
            title: "Tree-Based Models: Random Forests & XGBoost",
            duration: "45m",
            type: "video",
            summary: "Information gain, Gini impurity, bagging, and gradient boosting algorithms.",
            content: "Tree ensembles dominate tabular predictive modeling competitions. Learn hyperparameters like max_depth, n_estimators, and learning rate for peak performance.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-3-2-3",
            title: "Model Validation & Performance Metrics",
            duration: "25m",
            type: "reading",
            summary: "Beyond accuracy: Precision, Recall, F1-Score, Confusion Matrices, and Stratified K-Fold.",
            content: "Why accuracy is deceitful on imbalanced datasets. Learn how to tune decision thresholds for business impact and avoid data leakage.",
            videoUrl: ""
          },
          {
            id: "les-3-2-4",
            title: "Machine Learning Capstone Quiz",
            duration: "20m",
            type: "quiz",
            summary: "Comprehensive ML assessment to qualify for your Data Science Certificate.",
            content: "Challenge your model selection, hyperparameter tuning, and metric evaluation skills.",
            quizId: "quiz-capstone-data"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-3-1",
        studentName: "Chloe Martin",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Dr. Jenkins explains the math with unmatched clarity. The real-world housing and churn prediction datasets made everything click immediately."
      }
    ]
  },
  {
    id: "course-4",
    title: "Digital Marketing & Growth Hacking 2026",
    slug: "digital-marketing-growth-hacking",
    instructor: {
      id: "inst-4",
      name: "Jordan Vance",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
      title: "VP of Growth & Performance Marketing",
      bio: "Jordan has scaled consumer and B2B SaaS products from zero to $50M+ ARR through data-driven acquisition, viral loops, and content marketing funnels.",
      rating: 4.82,
      studentsCount: 18700,
      coursesCount: 2,
    },
    category: "Marketing",
    level: "Beginner",
    price: 0,
    originalPrice: 49.99,
    isFree: true,
    rating: 4.75,
    reviewsCount: 840,
    students: 11200,
    duration: "9.5 hours",
    totalLessons: 7,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
    description: "Learn modern growth tactics that work today: organic SEO, high-converting PPC campaigns, automated email marketing funnels, and viral retention loops.",
    lastUpdated: "May 2026",
    language: "English",
    objectives: [
      "Design and optimize high-converting sales funnels with measurable CAC and LTV",
      "Execute high-ROI search and social ad campaigns with precise audience targeting",
      "Apply SEO strategies for modern semantic search engines and AI answer engines",
      "Build automated drip email sequences that turn leads into loyal paying customers"
    ],
    requirements: [
      "No marketing experience required",
      "An open mind and eagerness to experiment with data-driven creative strategies"
    ],
    modules: [
      {
        id: "mod-4-1",
        title: "Module 1: The Modern Growth Framework",
        duration: "2h 00m",
        lessons: [
          {
            id: "les-4-1-1",
            title: "The Pirate Funnel (AARRR) for Fast-Growing Brands",
            duration: "25m",
            type: "video",
            summary: "Acquisition, Activation, Retention, Referral, and Revenue metrics explained.",
            content: "Discover how top tech companies measure growth. We break down the exact levers that move each step of the customer journey.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-4-1-2",
            title: "Customer Persona Mapping & High-Conversion Copywriting",
            duration: "30m",
            type: "video",
            summary: "Write compelling headlines, value propositions, and calls to action.",
            content: "Words sell. Learn the psychological triggers that reduce friction and motivate prospects to take decisive action.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-4-1-3",
            title: "Growth Funnels Checkpoint Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Test your funnel and copywriting strategy knowledge.",
            content: "Check your retention loops, CAC, and conversion rate optimization concepts.",
            quizId: "quiz-growth-1"
          }
        ]
      },
      {
        id: "mod-4-2",
        title: "Module 2: Performance Channels & Automation",
        duration: "2h 30m",
        lessons: [
          {
            id: "les-4-2-1",
            title: "SEO in the Era of AI & Semantic Search",
            duration: "35m",
            type: "video",
            summary: "Keyword intent, topical authority, technical speed, and programmatic pages.",
            content: "How search rankings have evolved. We cover technical audits, internal link graphs, and creating content that satisfies both users and search bots.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-4-2-2",
            title: "Email Lifecycle Automations & Retargeting",
            duration: "30m",
            type: "reading",
            summary: "Welcome series, cart abandonment recovery, and re-engagement workflows.",
            content: "Automated emails generate the highest ROI in digital marketing. Study real email templates that achieved 40%+ open rates and 8% conversions.",
            videoUrl: ""
          },
          {
            id: "les-4-2-3",
            title: "Digital Marketing Final Assessment",
            duration: "15m",
            type: "quiz",
            summary: "Demonstrate your growth marketing knowledge to earn certification.",
            content: "Comprehensive quiz covering paid acquisition, retention loops, and analytics.",
            quizId: "quiz-capstone-mkt"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-4-1",
        studentName: "Samira Patel",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "The AARRR framework lesson alone doubled our team's clarity. Can't believe this course is completely free!"
      }
    ]
  },
  {
    id: "course-5",
    title: "Product Management from Scratch to Scale",
    slug: "product-management-scratch-to-scale",
    instructor: {
      id: "inst-5",
      name: "Tariq Al-Mansoor",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
      title: "Chief Product Officer & Startup Advisor",
      bio: "Former Head of Product at major tech unicorns, Tariq has shipped products to 50M+ users and mentored over 200 aspiring Product Managers.",
      rating: 4.91,
      studentsCount: 22400,
      coursesCount: 3,
    },
    category: "Business",
    level: "Intermediate",
    price: 44.99,
    originalPrice: 89.99,
    isFree: false,
    rating: 4.87,
    reviewsCount: 1150,
    students: 9350,
    duration: "11.0 hours",
    totalLessons: 8,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=80",
    description: "Learn how elite Product Managers discover user needs, prioritize feature roadmaps, write crisp PRDs, align cross-functional engineering teams, and launch products that win.",
    lastUpdated: "July 2026",
    language: "English",
    objectives: [
      "Master user discovery interviews, problem definition, and customer journey mapping",
      "Write crystal-clear Product Requirement Documents (PRDs) with measurable success criteria",
      "Apply prioritization frameworks like RICE, Kano, and Value vs Effort with confidence",
      "Lead cross-functional Agile sprints with engineers, designers, and business stakeholders"
    ],
    requirements: [
      "No specific technical degree required",
      "Interest in business strategy, software design, and team leadership"
    ],
    modules: [
      {
        id: "mod-5-1",
        title: "Module 1: User Discovery & Problem Space Validation",
        duration: "2h 10m",
        lessons: [
          {
            id: "les-5-1-1",
            title: "The Mom Test: Conducting Unbiased Customer Interviews",
            duration: "25m",
            type: "video",
            summary: "Learn to ask questions that reveal honest past behaviors rather than polite compliments.",
            content: "Customer feedback is often misleading if framed incorrectly. We demonstrate live interviews highlighting what to ask and which traps to avoid.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-5-1-2",
            title: "Crafting High-Impact Problem Statements & Jobs to be Done",
            duration: "30m",
            type: "video",
            summary: "Frame product challenges around customer jobs and emotional motivations.",
            content: "Customers don't want a drill; they want a hole. Master the Jobs to be Done (JTBD) framework to identify root problem opportunities.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-5-1-3",
            title: "Discovery Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Check your mastery of customer discovery principles.",
            content: "Quick quiz on interview techniques, JTBD, and user problem scoping.",
            quizId: "quiz-pm-1"
          }
        ]
      },
      {
        id: "mod-5-2",
        title: "Module 2: Roadmaps, PRDs & Cross-Functional Execution",
        duration: "2h 45m",
        lessons: [
          {
            id: "les-5-2-1",
            title: "Writing Crystal-Clear PRDs Engineers Love",
            duration: "35m",
            type: "video",
            summary: "Scope user stories, acceptance criteria, edge cases, and telemetry tracking.",
            content: "A great PRD aligns everyone without micromanagement. We walk through a real production PRD template used by tier-one tech firms.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-5-2-2",
            title: "RICE Framework & Managing Stakeholder Trade-offs",
            duration: "30m",
            type: "reading",
            summary: "Calculate Reach, Impact, Confidence, and Effort to defend your roadmap decisions.",
            content: "Saying no is the PM's true superpower. Learn how data-backed prioritization turns chaotic opinion battles into objective team decisions.",
            videoUrl: ""
          },
          {
            id: "les-5-2-3",
            title: "Product Leadership Capstone Assessment",
            duration: "20m",
            type: "quiz",
            summary: "Complete this assessment to earn your Certified Product Manager Certificate.",
            content: "Test your skills in roadmap prioritization, agile delivery, and metrics evaluation.",
            quizId: "quiz-capstone-pm"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-5-1",
        studentName: "Rachel Lee",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "3 weeks ago",
        comment: "This course helped me transition from a business analyst into my first Associate Product Manager role within 3 months. Invaluable PRD templates!"
      }
    ]
  },
  {
    id: "course-6",
    title: "Modern Financial Analysis & Investment Strategy",
    slug: "financial-analysis-investment-strategy",
    instructor: {
      id: "inst-6",
      name: "Victoria Hayes, CFA",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
      title: "Portfolio Manager & Financial Modeling Expert",
      bio: "Victoria has managed $1.2B in equity portfolios and taught financial modeling to investment banking analysts in London and New York.",
      rating: 4.93,
      studentsCount: 16500,
      coursesCount: 2,
    },
    category: "Finance",
    level: "Advanced",
    price: 64.99,
    originalPrice: 129.99,
    isFree: false,
    rating: 4.92,
    reviewsCount: 760,
    students: 6200,
    duration: "16.0 hours",
    totalLessons: 8,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
    description: "Master financial statement analysis, discounted cash flow (DCF) valuation, risk-adjusted portfolio construction, and corporate capital budgeting.",
    lastUpdated: "August 2026",
    language: "English",
    objectives: [
      "Deconstruct Income Statements, Balance Sheets, and Cash Flow Statements with precision",
      "Build a dynamic multi-year 3-statement financial model from historical filings",
      "Perform Discounted Cash Flow (DCF) and Comparable Company Analysis valuations",
      "Construct risk-optimized asset allocation models using Modern Portfolio Theory"
    ],
    requirements: [
      "Familiarity with spreadsheets (Excel, Google Sheets)",
      "Basic understanding of business operations"
    ],
    modules: [
      {
        id: "mod-6-1",
        title: "Module 1: Three-Statement Financial Modeling",
        duration: "2h 30m",
        lessons: [
          {
            id: "les-6-1-1",
            title: "Financial Statements Mechanics & Working Capital",
            duration: "35m",
            type: "video",
            summary: "Understand how revenue, depreciation, and inventory flow across the three statements.",
            content: "Learn the golden links between the P&L and Balance Sheet. Trace cash flow from operations and calculate Free Cash Flow to Firm (FCFF).",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-6-1-2",
            title: "Ratio Analysis: Liquidity, Solvency & DuPont ROE Breakdown",
            duration: "30m",
            type: "video",
            summary: "Evaluate corporate profitability, asset turnover, and leverage drivers.",
            content: "The 3-stage and 5-stage DuPont models reveal true management efficiency behind headline profit margins.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-6-1-3",
            title: "Financial Statements Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Test your financial accounting and ratio calculation fluency.",
            content: "Questions covering working capital adjustments, EBITDA, and DuPont analysis.",
            quizId: "quiz-fin-1"
          }
        ]
      },
      {
        id: "mod-6-2",
        title: "Module 2: Corporate Valuation & DCF Modeling",
        duration: "3h 00m",
        lessons: [
          {
            id: "les-6-2-1",
            title: "WACC Calculation & Cost of Capital Assumptions",
            duration: "40m",
            type: "video",
            summary: "Estimate Beta, equity risk premiums, after-tax cost of debt, and capital structure weights.",
            content: "Discount rate accuracy dictates valuation credibility. We calculate WACC step by step for public enterprise benchmarks.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-6-2-2",
            title: "DCF Sensitivity Tables & Terminal Value Multiples",
            duration: "35m",
            type: "reading",
            summary: "Model perpetual growth vs exit multiple approaches and generate scenario matrices.",
            content: "Learn how to stress-test valuations under recessionary vs expansionary economic environments.",
            videoUrl: ""
          },
          {
            id: "les-6-2-3",
            title: "Investment Valuation Final Quiz",
            duration: "20m",
            type: "quiz",
            summary: "Capstone assessment to earn your Certified Financial Analyst Certificate.",
            content: "Challenge your DCF, WACC, and multiple valuation concepts.",
            quizId: "quiz-capstone-fin"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-6-1",
        studentName: "Lucas Vance",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "1 month ago",
        comment: "Victoria's spreadsheet walkthroughs are phenomenal. The DCF modeling module helped me nail my corporate finance technical interviews."
      }
    ]
  },
  {
    id: "course-7",
    title: "Mastering Commercial Photography & Lighting",
    slug: "commercial-photography-lighting",
    instructor: {
      id: "inst-7",
      name: "Mateo Rossi",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
      title: "Commercial Advertising Photographer",
      bio: "Mateo has shot campaigns for luxury watchmakers, automobile brands, and editorial magazines across Europe and North America.",
      rating: 4.86,
      studentsCount: 11300,
      coursesCount: 2,
    },
    category: "Photography",
    level: "Beginner",
    price: 34.99,
    originalPrice: 69.99,
    isFree: false,
    rating: 4.84,
    reviewsCount: 420,
    students: 4890,
    duration: "8.5 hours",
    totalLessons: 6,
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&auto=format&fit=crop&q=80",
    description: "Learn studio lighting setups, tethered shooting, color calibration, product staging, and editorial retouching workflows in Adobe Lightroom and Photoshop.",
    lastUpdated: "June 2026",
    language: "English",
    objectives: [
      "Understand strobe lighting, continuous LED, diffusers, grids, and reflectors",
      "Stage commercial tabletop products with reflection management and gradient backgrounds",
      "Control exposure, depth of field, and focal compression with professional lenses",
      "Execute high-end skin and product retouching using frequency separation"
    ],
    requirements: [
      "Any interchangeable lens camera (DSLR or Mirrorless)",
      "Basic understanding of shutter speed, aperture, and ISO"
    ],
    modules: [
      {
        id: "mod-7-1",
        title: "Module 1: Studio Lighting Foundations",
        duration: "2h 00m",
        lessons: [
          {
            id: "les-7-1-1",
            title: "Inverse Square Law & Light Quality Explained",
            duration: "25m",
            type: "video",
            summary: "Master hard vs soft light, falloff distance, and modifier choices.",
            content: "Light behaves according to strict physics. Learn how modifier size and distance control shadow transition softness.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-7-1-2",
            title: "Three-Point Lighting for Commercial Portraits",
            duration: "30m",
            type: "video",
            summary: "Key light, fill light, rim light, and background separation techniques.",
            content: "Step inside our studio as we dial in power ratios to sculpt professional editorial portraits.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-7-1-3",
            title: "Studio Lighting Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Verify your lighting ratios and inverse-square physics.",
            content: "Check your knowledge on key light placement, flash sync speeds, and diffusers.",
            quizId: "quiz-photo-1"
          }
        ]
      },
      {
        id: "mod-7-2",
        title: "Module 2: Post-Production & Color Calibration",
        duration: "1h 45m",
        lessons: [
          {
            id: "les-7-2-1",
            title: "Raw Processing & Accurate Color Checking",
            duration: "30m",
            type: "video",
            summary: "Use ColorChecker charts and custom camera profiles in Lightroom.",
            content: "Commercial clients demand exact Pantone color accuracy. Learn how to calibrate raw profiles before retouching.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-7-2-2",
            title: "Photography Capstone Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Final quiz to receive your Commercial Photography Certificate.",
            content: "Test your studio setups, shutter sync, and commercial workflow techniques.",
            quizId: "quiz-capstone-photo"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-7-1",
        studentName: "Oliver Berg",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 months ago",
        comment: "The inverse square law lesson made studio lighting finally click for me. I booked my first commercial beverage shoot right after!"
      }
    ]
  },
  {
    id: "course-8",
    title: "High-Impact Public Speaking & Executive Leadership",
    slug: "public-speaking-executive-leadership",
    instructor: {
      id: "inst-8",
      name: "Amara Okonjo",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      title: "Keynote Speaker & Executive Presence Coach",
      bio: "Amara is a 3-time TEDx speaker and has coached Fortune 100 CEOs, startup founders, and public figures to deliver speeches that inspire and persuade.",
      rating: 4.96,
      studentsCount: 31000,
      coursesCount: 3,
    },
    category: "Personal Development",
    level: "All Levels",
    price: 0,
    originalPrice: 59.99,
    isFree: true,
    rating: 4.94,
    reviewsCount: 1680,
    students: 24500,
    duration: "7.0 hours",
    totalLessons: 6,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
    description: "Overcome speaking anxiety, master vocal modulation, structure persuasive keynotes, and command any room or virtual stage with authentic executive presence.",
    lastUpdated: "July 2026",
    language: "English",
    objectives: [
      "Calm stage fright through proven physiological reset and visualization routines",
      "Structure persuasive talks using the Narrative Arc and Monroe's Motivated Sequence",
      "Master pitch, cadence, strategic pauses, and posture to command attention",
      "Handle tough Q&A sessions and unexpected disruptions with poise and authority"
    ],
    requirements: [
      "No speaking experience needed",
      "Willingness to practice vocal warmups and record brief practice speeches"
    ],
    modules: [
      {
        id: "mod-8-1",
        title: "Module 1: Conquering Stage Anxiety & Vocal Control",
        duration: "1h 45m",
        lessons: [
          {
            id: "les-8-1-1",
            title: "Reprogramming the Nervous System Before Taking the Stage",
            duration: "20m",
            type: "video",
            summary: "Box breathing, posture anchors, and reframing adrenaline as focused excitement.",
            content: "Anxiety is simply unchanneled physiological arousal. Learn the 3-minute pre-stage ritual used by top keynote speakers worldwide.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-8-1-2",
            title: "Vocal Dynamics: Pitch, Pauses & Eliminating Filler Words",
            duration: "25m",
            type: "video",
            summary: "Learn why silence is your greatest rhetorical asset and how to speak with resonance.",
            content: "Say goodbye to 'um', 'ah', and 'like'. We practice dynamic pauses that build tension and allow key ideas to land with weight.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-8-1-3",
            title: "Vocal Delivery Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Test your vocal dynamic and nervous system regulation knowledge.",
            content: "Questions covering diaphragmatic breathing, pace control, and filler word elimination.",
            quizId: "quiz-speaking-1"
          }
        ]
      },
      {
        id: "mod-8-2",
        title: "Module 2: Storytelling Architecture & Persuasion",
        duration: "2h 00m",
        lessons: [
          {
            id: "les-8-2-1",
            title: "The Narrative Hook: Opening Your Talk with Power",
            duration: "25m",
            type: "video",
            summary: "Start with an arresting question, vivid sensory detail, or counterintuitive statistic.",
            content: "You have 30 seconds to capture your audience's curiosity. Never start with logistical thank-yous. Start with a compelling hook.",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
          },
          {
            id: "les-8-2-2",
            title: "Public Speaking Capstone Quiz",
            duration: "15m",
            type: "quiz",
            summary: "Earn your Executive Presence & Public Speaking Certificate.",
            content: "Demonstrate your understanding of persuasion, pacing, and audience engagement.",
            quizId: "quiz-capstone-speaking"
          }
        ]
      }
    ],
    reviews: [
      {
        id: "rev-8-1",
        studentName: "Gabriel Wright",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
        rating: 5,
        date: "2 weeks ago",
        comment: "Amara's breathing techniques completely cured my hands trembling during company all-hands meetings. Simply life-changing."
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Categories", icon: "BookOpen", count: 8 },
  { id: "Development", name: "Development", icon: "Code", count: 1 },
  { id: "Design", name: "Design", icon: "Palette", count: 1 },
  { id: "Data Science", name: "Data Science", icon: "BarChart3", count: 1 },
  { id: "Marketing", name: "Marketing", icon: "Megaphone", count: 1 },
  { id: "Business", name: "Business", icon: "Briefcase", count: 1 },
  { id: "Finance", name: "Finance", icon: "TrendingUp", count: 1 },
  { id: "Photography", name: "Photography", icon: "Camera", count: 1 },
  { id: "Personal Development", name: "Personal Development", icon: "Sparkles", count: 1 },
];
