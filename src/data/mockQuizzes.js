export const MOCK_QUIZZES = {
  "quiz-react-1": {
    id: "quiz-react-1",
    courseId: "course-1",
    title: "React Fundamentals & Component Lifecycle Quiz",
    description: "Assess your mastery of state, props, hooks, and reconciliation in React.",
    passingScore: 75,
    questions: [
      {
        id: "q-r1",
        question: "Why should state updates in React never be modified directly (mutated)?",
        options: [
          "Direct mutation breaks React's shallow comparison in reconciliation, preventing re-renders.",
          "React throws a compile-time syntax error on property reassignment.",
          "Direct mutation causes the entire browser tab to reload.",
          "Direct mutation is slower because JavaScript arrays are fixed in size."
        ],
        correctIndex: 0,
        explanation: "React relies on referential equality to determine if state has changed. Direct mutation alters the existing object reference, meaning shallow comparison perceives no change."
      },
      {
        id: "q-r2",
        question: "What is the primary difference between useEffect and useLayoutEffect?",
        options: [
          "useEffect runs on the server while useLayoutEffect runs on the client.",
          "useLayoutEffect runs synchronously immediately after DOM mutations before browser paint, while useEffect runs asynchronously after paint.",
          "useEffect is only for network requests while useLayoutEffect is for timers.",
          "There is no difference; useLayoutEffect is deprecated."
        ],
        correctIndex: 1,
        explanation: "useLayoutEffect fires synchronously right after React mutates the DOM, making it ideal for reading layout measurements (like scroll or bounding rect) before visual flicker."
      },
      {
        id: "q-r3",
        question: "When should you use the useCallback hook?",
        options: [
          "For every single function defined in every component.",
          "Only when memoizing an expensive mathematical calculation.",
          "To cache a callback instance between renders when passing it to memoized child components or dependency arrays.",
          "To trigger side effects when a prop changes."
        ],
        correctIndex: 2,
        explanation: "useCallback preserves function reference equality across renders, which is useful when passing functions to React.memo components or hook dependency arrays."
      },
      {
        id: "q-r4",
        question: "What is the role of the 'key' prop when rendering lists of elements in React?",
        options: [
          "It acts as a CSS class for styling list items.",
          "It helps React identify which items have changed, been added, or removed during reconciliation.",
          "It specifies the database primary key for backend auto-saving.",
          "It prevents the list from having more than 100 items."
        ],
        correctIndex: 1,
        explanation: "Keys provide stable identities to list elements across renders so React can re-order, update, or remove only affected DOM nodes efficiently."
      }
    ]
  },
  "quiz-node-1": {
    id: "quiz-node-1",
    courseId: "course-1",
    title: "Node.js & Express API Security Quiz",
    description: "Evaluate your understanding of asynchronous Node.js, middleware, and JWT authentication.",
    passingScore: 75,
    questions: [
      {
        id: "q-n1",
        question: "What makes Node.js single-threaded yet capable of handling thousands of concurrent connections?",
        options: [
          "Node.js runs on a multi-threaded CPU emulator.",
          "The non-blocking event loop offloads I/O operations to OS kernels or libuv thread pool.",
          "Node.js opens a new operating system process for each HTTP client.",
          "Node.js uses quantum computing acceleration."
        ],
        correctIndex: 1,
        explanation: "Node.js executes JavaScript on a single main thread, but uses libuv to asynchronously delegate system and I/O tasks to background OS threads."
      },
      {
        id: "q-n2",
        question: "In Express.js, what must an error-handling middleware contain in its function signature?",
        options: [
          "Exactly 4 parameters: (err, req, res, next)",
          "An async/await try-catch block only",
          "Exactly 2 parameters: (error, response)",
          "A return status code of 500"
        ],
        correctIndex: 0,
        explanation: "Express recognizes error handlers specifically by the 4-argument signature (err, req, res, next). Missing any argument causes Express to treat it as standard middleware."
      },
      {
        id: "q-n3",
        question: "Where should JWT authentication tokens be stored in modern web apps to mitigate XSS attacks?",
        options: [
          "In localStorage as plain text",
          "In an httpOnly, Secure, SameSite cookie",
          "In the URL query string",
          "In the browser window.name property"
        ],
        correctIndex: 1,
        explanation: "An httpOnly cookie cannot be read or stolen by client-side JavaScript, rendering cross-site scripting (XSS) attacks unable to exfiltrate the token directly."
      },
      {
        id: "q-n4",
        question: "Which HTTP status code signifies that the client is authenticated but lacks authorization for the requested resource?",
        options: [
          "401 Unauthorized",
          "403 Forbidden",
          "404 Not Found",
          "422 Unprocessable Entity"
        ],
        correctIndex: 1,
        explanation: "401 means unauthenticated (identity unknown), while 403 means authenticated but forbidden (identity known, but insufficient permission)."
      }
    ]
  },
  "quiz-capstone-1": {
    id: "quiz-capstone-1",
    courseId: "course-1",
    title: "Full-Stack Capstone Certification Exam",
    description: "Comprehensive evaluation covering frontend architecture, backend APIs, and production deployment.",
    passingScore: 75,
    questions: [
      {
        id: "q-c1",
        question: "What is an optimistic UI update?",
        options: [
          "Updating the frontend state immediately before the server response returns, reverting if it fails.",
          "Hoping the server never crashes under heavy traffic.",
          "Writing code without try/catch blocks for faster execution.",
          "Disabling error logging in production."
        ],
        correctIndex: 0,
        explanation: "Optimistic UI immediately renders the predicted result of a user action for instantaneous perceived speed, with automatic rollback if the API responds with an error."
      },
      {
        id: "q-c2",
        question: "Why is CORS (Cross-Origin Resource Sharing) enforced by web browsers?",
        options: [
          "To prevent unauthorized scripts on one origin from accessing sensitive data on another origin.",
          "To speed up DNS resolution times.",
          "To compress network payloads automatically.",
          "To convert HTTP requests to HTTPS."
        ],
        correctIndex: 0,
        explanation: "CORS is a browser security mechanism that restricts web pages from making AJAX requests to a different domain unless the destination server explicitly allows it."
      },
      {
        id: "q-c3",
        question: "Which HTTP method should be used for updating a single attribute of an existing resource?",
        options: [
          "POST",
          "PUT",
          "PATCH",
          "DELETE"
        ],
        correctIndex: 2,
        explanation: "PATCH is designated for partial modifications to an existing resource, whereas PUT implies full replacement."
      },
      {
        id: "q-c4",
        question: "What does the continuous integration (CI) phase primarily validate before deployment?",
        options: [
          "Automated test suites, linting rules, and build bundle compilation.",
          "Credit card transactions of registered users.",
          "The physical temperature of cloud server racks.",
          "Social media mentions of the company."
        ],
        correctIndex: 0,
        explanation: "CI pipelines automatically run tests, static analysis, and production build checks on code commits to catch regressions before deployment."
      }
    ]
  },
  "quiz-figma-1": {
    id: "quiz-figma-1",
    courseId: "course-2",
    title: "Design Foundations & Spatial Grids Quiz",
    description: "Verify your knowledge of typographic scales, color contrast, and spacing tokens.",
    passingScore: 75,
    questions: [
      {
        id: "q-f1",
        question: "Why do digital product design systems frequently use an 8-point spatial grid?",
        options: [
          "Because 8 is universally divisible and aligns cleanly with common screen resolutions and pixel densities.",
          "Because Figma only allows margins that end in 8.",
          "Because CSS only supports multiples of 8.",
          "Because human eyes can only perceive increments of 8 pixels."
        ],
        correctIndex: 0,
        explanation: "The 8pt grid scales gracefully across modern high-DPI displays (1x, 2x, 3x) without producing blurry sub-pixel fractions."
      },
      {
        id: "q-f2",
        question: "According to WCAG 2.1 AA standards, what is the minimum contrast ratio required for normal body text?",
        options: [
          "2.5:1",
          "3.0:1",
          "4.5:1",
          "7.0:1"
        ],
        correctIndex: 2,
        explanation: "WCAG AA requires a 4.5:1 contrast ratio for normal body text, and 3.0:1 for large text (18pt+ or 14pt bold)."
      },
      {
        id: "q-f3",
        question: "What is the purpose of design tokens in a modern design system?",
        options: [
          "They are cryptographic coins used to buy Figma plugins.",
          "They are platform-agnostic name-value pairs (colors, spacing, shadows) that synchronize design and code.",
          "They replace the need for software engineers entirely.",
          "They are visual watermark stickers placed on exported images."
        ],
        correctIndex: 1,
        explanation: "Tokens (e.g., color-primary-500: #4F46E5) act as the single source of truth connecting Figma variables with Tailwind or CSS code."
      },
      {
        id: "q-f4",
        question: "What visual property determines the 'visual weight' of an element first?",
        options: [
          "Scale, contrast, and positioning.",
          "File size on disk.",
          "The date it was created in Figma.",
          "Whether the layer name starts with a capital letter."
        ],
        correctIndex: 0,
        explanation: "Visual hierarchy is established primarily through scale (size), luminance contrast, and spatial placement on the canvas."
      }
    ]
  },
  "quiz-capstone-design": {
    id: "quiz-capstone-design",
    courseId: "course-2",
    title: "Design Systems & Prototyping Capstone Assessment",
    description: "Comprehensive exam to earn your Certified Design System Specialist Certificate.",
    passingScore: 75,
    questions: [
      {
        id: "q-cd1",
        question: "What is the benefit of Figma's 'Hug Contents' auto-layout property?",
        options: [
          "The parent frame automatically resizes to shrink-wrap its child elements.",
          "It locks the layer from being edited by other team members.",
          "It converts vectors into low-res JPEG files.",
          "It deletes all spacing between children."
        ],
        correctIndex: 0,
        explanation: "'Hug Contents' ensures dynamic sizing: when button text grows from 'Save' to 'Save Changes', the button frame expands automatically."
      },
      {
        id: "q-cd2",
        question: "In component architecture, what is a 'variant' used for?",
        options: [
          "Grouping variations of the same component (such as states, sizes, and colors) into a single master set.",
          "Creating an accidental duplicate of a file.",
          "Writing JavaScript code directly inside Figma.",
          "Changing the frame aspect ratio to 16:9."
        ],
        correctIndex: 0,
        explanation: "Variants group similar components under one container with configurable properties like State=Hover, Size=Large."
      },
      {
        id: "q-cd3",
        question: "When connecting an interactive prototype, what does 'Smart Animate' rely on to animate smoothly?",
        options: [
          "Matching layer names and hierarchies between both frames.",
          "A high-speed internet connection.",
          "Using only circular shapes.",
          "Exporting the frames as GIF files."
        ],
        correctIndex: 0,
        explanation: "Figma looks for identical layer names across screens to interpolate position, scale, opacity, and rotation seamlessly."
      },
      {
        id: "q-cd4",
        question: "Which of the following is essential during design-to-development handoff?",
        options: [
          "Providing responsive specs, interactive states, tokenized colors, and accessible contrast notes.",
          "Sending a single static screenshot without labels.",
          "Asking developers to eyeball pixel measurements.",
          "Deleting the Figma file once development starts."
        ],
        correctIndex: 0,
        explanation: "A robust handoff includes interactive states, token mappings, accessibility guidelines, and responsive behavior specifications."
      }
    ]
  },
  "quiz-data-1": {
    id: "quiz-data-1",
    courseId: "course-3",
    title: "Exploratory Data Analysis & Python Pandas Quiz",
    description: "Test your fluency with Pandas indexing, aggregation, and data visualization.",
    passingScore: 75,
    questions: [
      {
        id: "q-d1",
        question: "In Pandas, what is the key difference between .loc and .iloc?",
        options: [
          ".loc uses label-based indexing while .iloc uses integer position-based indexing.",
          ".loc is only for rows while .iloc is only for columns.",
          ".iloc is deprecated in recent versions of Python.",
          ".loc cannot handle boolean masking."
        ],
        correctIndex: 0,
        explanation: ".loc selects data based on index labels and column names, while .iloc selects data strictly by zero-indexed integer offsets."
      },
      {
        id: "q-d2",
        question: "Why should you avoid using Python for-loops to iterate over DataFrame rows?",
        options: [
          "Vectorized operations in Pandas leverage optimized C/Fortran routines, running orders of magnitude faster.",
          "For-loops corrupt DataFrame column headers.",
          "Python does not support for-loops with numbers.",
          "For-loops cannot read string columns."
        ],
        correctIndex: 0,
        explanation: "Pandas operations are vectorized and execute in compiled C memory buffers. Iterating in Python byte-code removes all performance benefits."
      },
      {
        id: "q-d3",
        question: "What does a correlation coefficient of -0.85 between two variables indicate?",
        options: [
          "A strong negative linear relationship (as one variable increases, the other decreases).",
          "No correlation whatsoever.",
          "A weak positive relationship.",
          "An error in the mathematical calculation."
        ],
        correctIndex: 0,
        explanation: "Correlation ranges from -1 to +1. A value of -0.85 denotes a strong inverse relationship."
      },
      {
        id: "q-d4",
        question: "When dealing with skewed financial distributions, which measure of central tendency is most robust to extreme outliers?",
        options: [
          "Arithmetic Mean",
          "Median",
          "Variance",
          "Standard Deviation"
        ],
        correctIndex: 1,
        explanation: "The median reflects the exact 50th percentile and is unaffected by extreme outliers, unlike the mean which is pulled toward skew."
      }
    ]
  },
  "quiz-capstone-data": {
    id: "quiz-capstone-data",
    courseId: "course-3",
    title: "Machine Learning Capstone Certification Assessment",
    description: "Verify your end-to-end understanding of predictive modeling, validation, and metrics.",
    passingScore: 75,
    questions: [
      {
        id: "q-md1",
        question: "What is data leakage in machine learning?",
        options: [
          "When target information from outside the training dataset is inadvertently used to create the model.",
          "When a hard drive runs out of storage space.",
          "When features have negative numbers.",
          "When training completes faster than expected."
        ],
        correctIndex: 0,
        explanation: "Data leakage happens when information from test/validation sets (e.g. scaling before splitting) contaminates the training set, causing deceptively high metrics."
      },
      {
        id: "q-md2",
        question: "Why is ROC-AUC or F1-Score preferable to Accuracy when evaluating fraud detection models?",
        options: [
          "Because fraud cases are rare (e.g. 0.1%), meaning a naive model predicting 0% fraud would falsely show 99.9% accuracy.",
          "Because Scikit-Learn cannot compute accuracy on binary labels.",
          "Because accuracy requires GPU computation.",
          "Because AUC is always higher than 90%."
        ],
        correctIndex: 0,
        explanation: "In heavily imbalanced datasets, accuracy fails to measure performance on the minority class. Precision, Recall, and ROC-AUC measure true discrimination power."
      },
      {
        id: "q-md3",
        question: "What does L1 Regularization (Lasso) uniquely accomplish compared to L2 Regularization (Ridge)?",
        options: [
          "It forces less important feature coefficients completely to zero, performing automated feature selection.",
          "It doubles the number of features in the dataset.",
          "It converts linear models into deep neural networks.",
          "It eliminates the need for training data."
        ],
        correctIndex: 0,
        explanation: "L1 penalty drives weak feature weights to exact zero due to the diamond geometry of the constraint region, producing sparse, interpretable models."
      },
      {
        id: "q-md4",
        question: "What problem does K-Fold Cross Validation prevent?",
        options: [
          "Overfitting to a single arbitrary train/test split.",
          "Memory exhaustion during inference.",
          "Missing values in the target column.",
          "Internet connection drops."
        ],
        correctIndex: 0,
        explanation: "K-Fold trains and evaluates on K distinct folds, ensuring performance estimates generalize robustly across the entire dataset."
      }
    ]
  },
  "quiz-growth-1": {
    id: "quiz-growth-1",
    courseId: "course-4",
    title: "Growth Metrics & Funnel Optimization Quiz",
    description: "Assess your knowledge of CAC, LTV, conversion funnels, and viral loops.",
    passingScore: 75,
    questions: [
      {
        id: "q-g1",
        question: "What is the healthy benchmark ratio between Customer Lifetime Value (LTV) and Customer Acquisition Cost (CAC) for SaaS?",
        options: [
          "At least 3:1 (LTV is 3x CAC)",
          "1:1 (break-even)",
          "0.5:1",
          "100:1"
        ],
        correctIndex: 0,
        explanation: "An LTV:CAC ratio of 3:1 or higher represents a healthy, sustainable growth engine with sufficient gross margins to fund operations and reinvestment."
      },
      {
        id: "q-g2",
        question: "In the Pirate Metrics (AARRR) framework, which stage directly addresses user onboarding?",
        options: [
          "Activation",
          "Acquisition",
          "Referral",
          "Revenue"
        ],
        correctIndex: 0,
        explanation: "Activation is the user's 'Aha!' moment when they first realize the core value proposition of your product."
      },
      {
        id: "q-g3",
        question: "What is an A/B test sample size calculation designed to prevent?",
        options: [
          "Declaring a false winner due to random statistical noise (Type I / Type II error).",
          "Website traffic from visiting the page.",
          "The marketing budget from exceeding $1,000.",
          "Users from refreshing their browsers."
        ],
        correctIndex: 0,
        explanation: "Adequate sample size ensures adequate statistical power to distinguish genuine uplift from random variance."
      },
      {
        id: "q-g4",
        question: "Why is user retention considered the single most important growth metric?",
        options: [
          "Without retention, acquiring new users is pouring water into a leaky bucket.",
          "Retention is the only metric investors ever look at.",
          "High retention eliminates all server hosting costs.",
          "Retention automatically guarantees Google #1 rank."
        ],
        correctIndex: 0,
        explanation: "Retention forms the foundation of sustainable growth; compounding expansion and referrals are impossible if acquired users quickly churn."
      }
    ]
  },
  "quiz-capstone-mkt": {
    id: "quiz-capstone-mkt",
    courseId: "course-4",
    title: "Digital Marketing Capstone Certification Exam",
    description: "Earn your Certified Growth Marketer Certificate by proving full-funnel mastery.",
    passingScore: 75,
    questions: [
      {
        id: "q-cm1",
        question: "What is search intent in modern SEO?",
        options: [
          "The underlying goal or purpose a user has when typing a query into a search engine.",
          "The speed at which Google crawls an XML sitemap.",
          "The number of backlink anchors pointing to a homepage.",
          "The file size of high-resolution images."
        ],
        correctIndex: 0,
        explanation: "Search engines reward pages that best satisfy the specific user intent: informational, navigational, commercial, or transactional."
      },
      {
        id: "q-cm2",
        question: "What is the primary benefit of automated email drip sequences?",
        options: [
          "Delivering timely, relevant nurture messages based on user behavior triggers with zero manual intervention.",
          "Sending 100 emails an hour to every contact.",
          "Bypassing all spam filters unconditionally.",
          "Guaranteeing 100% conversion rates."
        ],
        correctIndex: 0,
        explanation: "Behavior-triggered automated sequences nurture leads based on exact actions taken, driving higher relevance and conversion."
      },
      {
        id: "q-cm3",
        question: "What is CAC Payback Period?",
        options: [
          "The number of months required for a customer to generate enough gross profit to recoup their acquisition cost.",
          "The date when an invoice is sent to an agency.",
          "The time it takes to set up a Facebook Ads account.",
          "The lifespan of a cookie banner."
        ],
        correctIndex: 0,
        explanation: "CAC Payback measures capital efficiency; top subscription companies aim for payback under 12 months."
      },
      {
        id: "q-cm4",
        question: "What defines a true viral coefficient (K-factor) > 1.0?",
        options: [
          "Each existing customer successfully brings in more than one new customer, causing exponential organic growth.",
          "A video reaching 10,000 views on TikTok.",
          "Spending $10,000 on Google Search Ads.",
          "Having 1,000 followers on LinkedIn."
        ],
        correctIndex: 0,
        explanation: "When K > 1, every customer invites or refers at least 1+ additional active user, resulting in viral compounding without ad spend."
      }
    ]
  },
  "quiz-pm-1": {
    id: "quiz-pm-1",
    courseId: "course-5",
    title: "Product Discovery & User Interviews Quiz",
    description: "Validate your customer problem discovery and Jobs to be Done acumen.",
    passingScore: 75,
    questions: [
      {
        id: "q-pm1",
        question: "According to 'The Mom Test', why shouldn't you ask users if they like your product idea?",
        options: [
          "People will politely lie or flatter you; instead, ask about their past actual behaviors and pain points.",
          "Mothers do not understand software products.",
          "Users always steal product ideas to build competitors.",
          "It violates copyright protection laws."
        ],
        correctIndex: 0,
        explanation: "Hypothetical questions yield polite, unreliable opinions. Past actions, money spent, and actual workarounds reveal genuine demand."
      },
      {
        id: "q-pm2",
        question: "In the Jobs to be Done (JTBD) framework, what does 'Job' represent?",
        options: [
          "The core progress a user is attempting to make in a particular circumstance.",
          "The user's official corporate job title.",
          "The salary paid to an engineer.",
          "The sprint backlog items assigned in Jira."
        ],
        correctIndex: 0,
        explanation: "JTBD emphasizes the functional, social, and emotional transformation the user seeks to accomplish."
      },
      {
        id: "q-pm3",
        question: "What is an MVP (Minimum Viable Product)?",
        options: [
          "The simplest version of a product that allows a team to gather validated learning about customers with the least effort.",
          "A buggy, broken prototype rushed to production.",
          "A complete product missing only the documentation.",
          "The most expensive product in a catalog."
        ],
        correctIndex: 0,
        explanation: "An MVP exists to test core value hypotheses in the market and learn rapidly, not to deliver a half-baked final product."
      },
      {
        id: "q-pm4",
        question: "What is the primary danger of prioritizing features based purely on the highest-paid person's opinion (HiPPO)?",
        options: [
          "Building features that real users do not want or need, wasting engineering capital.",
          "Engineers refusing to attend standup meetings.",
          "The design file becoming too large.",
          "Server CPU utilization increasing by 5%."
        ],
        correctIndex: 0,
        explanation: "Relying on executive intuition rather than validated user evidence routinely produces low-adoption features."
      }
    ]
  },
  "quiz-capstone-pm": {
    id: "quiz-capstone-pm",
    courseId: "course-5",
    title: "Product Leadership Capstone Certification Exam",
    description: "Earn your Certified Product Manager Certificate through strategic roadmap and PRD mastery.",
    passingScore: 75,
    questions: [
      {
        id: "q-cpm1",
        question: "What are the components of the RICE prioritization formula?",
        options: [
          "(Reach × Impact × Confidence) ÷ Effort",
          "Revenue + Innovation + Customers + Engineering",
          "Risk ÷ (Investment × Capital × Efficiency)",
          "Retention × Interaction × Conversion × Execution"
        ],
        correctIndex: 0,
        explanation: "RICE calculates score = (Reach × Impact × Confidence) / Effort to objectively stack-rank competing initiatives."
      },
      {
        id: "q-cpm2",
        question: "What is a North Star Metric?",
        options: [
          "The single key metric that best captures the core value your product delivers to customers.",
          "Total revenue generated on the first day of the year.",
          "The number of lines of code pushed to GitHub.",
          "The company stock price on the NASDAQ."
        ],
        correctIndex: 0,
        explanation: "A North Star Metric aligns the entire company around the fundamental mechanism of sustainable customer value creation."
      },
      {
        id: "q-cpm3",
        question: "Why do great PRDs focus heavily on 'Problem' and 'Success Criteria' rather than prescriptively specifying exact implementation code?",
        options: [
          "It empowers design and engineering teams to invent the optimal solution while staying laser-focused on the user outcome.",
          "Because product managers are not allowed to type.",
          "To keep the document under 50 words.",
          "To avoid having to talk to customers."
        ],
        correctIndex: 0,
        explanation: "PRDs define the 'what' and 'why'; engineers and designers are experts in the 'how'."
      },
      {
        id: "q-cpm4",
        question: "In Agile development, what is the role of a sprint retrospective?",
        options: [
          "To reflect on team processes, celebrate wins, and identify concrete continuous improvements for future sprints.",
          "To assign blame to underperforming individuals publicly.",
          "To negotiate annual salary bonuses.",
          "To rewrite the company vision statement."
        ],
        correctIndex: 0,
        explanation: "Retrospectives provide psychological safety for teams to iteratively improve communication, workflow, and quality."
      }
    ]
  },
  "quiz-fin-1": {
    id: "quiz-fin-1",
    courseId: "course-6",
    title: "Financial Statements & Ratio Analysis Quiz",
    description: "Assess your financial modeling fundamentals and corporate accounting acumen.",
    passingScore: 75,
    questions: [
      {
        id: "q-fn1",
        question: "How does a $10 increase in depreciation affect the three financial statements assuming a 20% tax rate?",
        options: [
          "Operating income drops by $10; net income drops by $8; cash increases by $2 from tax savings.",
          "Cash decreases by $10.",
          "Revenue increases by $10.",
          "No change on the balance sheet."
        ],
        correctIndex: 0,
        explanation: "Depreciation reduces pre-tax income by $10. With 20% tax, Net Income drops by $8. On Cash Flow, depreciation is added back, yielding +$2 net cash from tax shield."
      },
      {
        id: "q-fn2",
        question: "What does Free Cash Flow to Firm (FCFF) measure?",
        options: [
          "Cash generated by operations after capital expenditures, available to all capital providers (both debt and equity holders).",
          "The cash stored in physical bank vaults.",
          "The price of a single share of stock.",
          "The total market value of company assets."
        ],
        correctIndex: 0,
        explanation: "FCFF = NOPAT + D&A - Capex - Change in NWC. It reflects unlevered cash flow generated by core business assets."
      },
      {
        id: "q-fn3",
        question: "In DuPont analysis, Return on Equity (ROE) is decomposed into which three factors?",
        options: [
          "Net Profit Margin × Asset Turnover × Financial Leverage (Equity Multiplier)",
          "Revenue × Operating Margin × Taxes",
          "Gross Profit ÷ Total Assets ÷ Liabilities",
          "EBITDA × P/E Ratio × Dividend Yield"
        ],
        correctIndex: 0,
        explanation: "DuPont breaks ROE into Profitability (Margin), Efficiency (Turnover), and Financial Leverage."
      },
      {
        id: "q-fn4",
        question: "Why is EBITDA frequently used as a proxy for operational cash flow?",
        options: [
          "It strips away non-cash accounting charges (D&A) and capital structure/tax differences for cleaner comparison across firms.",
          "It is required by the IRS for tax returns.",
          "It guarantees that a company cannot go bankrupt.",
          "It is always identical to net cash from operations."
        ],
        correctIndex: 0,
        explanation: "EBITDA normalizes for differing debt structures, tax environments, and historical asset purchase depreciation schedules."
      }
    ]
  },
  "quiz-capstone-fin": {
    id: "quiz-capstone-fin",
    courseId: "course-6",
    title: "Financial Valuation Capstone Certification Exam",
    description: "Demonstrate DCF modeling, WACC calculation, and enterprise valuation mastery.",
    passingScore: 75,
    questions: [
      {
        id: "q-cfn1",
        question: "In a Discounted Cash Flow (DCF) model, what discount rate should be used for Free Cash Flow to Firm (FCFF)?",
        options: [
          "Weighted Average Cost of Capital (WACC)",
          "Cost of Equity only",
          "The Federal Reserve prime interest rate",
          "The yield on a 1-month treasury bill"
        ],
        correctIndex: 0,
        explanation: "Because FCFF represents cash flow available to both equity and debt holders, it must be discounted using the blended cost of all capital: WACC."
      },
      {
        id: "q-cfn2",
        question: "What is Beta in the Capital Asset Pricing Model (CAPM)?",
        options: [
          "A measure of the sensitivity or systematic volatility of an asset's returns relative to the overall market.",
          "The interest rate charged by commercial banks.",
          "A preliminary version of a software product.",
          "The probability of bond default."
        ],
        correctIndex: 0,
        explanation: "Beta > 1 means the stock is more volatile than the benchmark index; Beta < 1 indicates lower systematic market risk."
      },
      {
        id: "q-cfn3",
        question: "What is Enterprise Value (EV)?",
        options: [
          "Market Capitalization + Total Debt + Preferred Stock - Cash and Cash Equivalents",
          "Annual revenue multiplied by 10",
          "The total book value of inventory",
          "The total dividend payments made over 5 years"
        ],
        correctIndex: 0,
        explanation: "Enterprise Value represents the theoretical takeover cost of the core operating business, netting out non-operating cash."
      },
      {
        id: "q-cfn4",
        question: "What does an inverted yield curve historically signal in macroeconomic analysis?",
        options: [
          "Elevated risk of an impending economic recession within the following 12–18 months.",
          "Imminent hyperinflation in commodities.",
          "Zero interest rates across all banks.",
          "Rapid stock market expansion."
        ],
        correctIndex: 0,
        explanation: "When short-term yields surpass long-term yields, bond markets are pricing in future economic slowdown and subsequent rate cuts."
      }
    ]
  },
  "quiz-photo-1": {
    id: "quiz-photo-1",
    courseId: "course-7",
    title: "Studio Lighting & Exposure Physics Quiz",
    description: "Evaluate your understanding of lighting ratios, inverse-square law, and modifiers.",
    passingScore: 75,
    questions: [
      {
        id: "q-ph1",
        question: "According to the Inverse Square Law, if you double the distance between a light source and your subject, what happens to the light intensity?",
        options: [
          "It drops to one-quarter (1/4 or 25%) of its original intensity.",
          "It drops by exactly one-half (50%).",
          "It remains completely unchanged.",
          "It doubles in brightness."
        ],
        correctIndex: 0,
        explanation: "Intensity is inversely proportional to the square of distance (1/d²). Doubling distance from 2m to 4m yields 1/4th the light (a 2-stop loss)."
      },
      {
        id: "q-ph2",
        question: "What creates 'soft light' in photography?",
        options: [
          "A light source that is physically large relative to the subject.",
          "Setting the camera to a low ISO value.",
          "Using a slow shutter speed.",
          "Shooting through dirty glass."
        ],
        correctIndex: 0,
        explanation: "Light softness is determined entirely by the apparent angular size of the source relative to the subject. A huge softbox close to a face creates gentle shadow gradients."
      },
      {
        id: "q-ph3",
        question: "What is the maximum sync speed (X-sync) in most mechanical shutter cameras?",
        options: [
          "Typically around 1/200s to 1/250s",
          "1/8000s without High-Speed Sync",
          "10 seconds",
          "1/10s"
        ],
        correctIndex: 0,
        explanation: "Above maximum sync speed, the rear shutter curtain begins closing before the front curtain fully opens, creating black banding unless HSS is activated."
      },
      {
        id: "q-ph4",
        question: "What is the function of a 'grid' placed on a studio softbox or reflector?",
        options: [
          "It narrows the light beam spread and prevents light from spilling onto backgrounds or lenses.",
          "It changes the color temperature from warm to cool.",
          "It increases the flash recharge speed.",
          "It adds digital watermarks to raw files."
        ],
        correctIndex: 0,
        explanation: "Honey-comb grids collimate light rays, restricting the spill angle while retaining the soft quality of the modifier."
      }
    ]
  },
  "quiz-capstone-photo": {
    id: "quiz-capstone-photo",
    courseId: "course-7",
    title: "Commercial Photography Capstone Assessment",
    description: "Earn your Certified Commercial Photographer Certificate.",
    passingScore: 75,
    questions: [
      {
        id: "q-cph1",
        question: "What is frequency separation in professional commercial retouching?",
        options: [
          "Splitting an image into high-frequency (texture/details) and low-frequency (tone/color) layers to edit each independently.",
          "Deleting high-pitch audio tracks from video clips.",
          "Calibrating monitor refresh rates to 144Hz.",
          "Converting RGB photos to CMYK."
        ],
        correctIndex: 0,
        explanation: "Frequency separation allows smoothing blotchy color gradients on the low layer without blurring skin pores or fabric textures on the high layer."
      },
      {
        id: "q-cph2",
        question: "Why do commercial photographers shoot tethered directly to a monitor in studio?",
        options: [
          "To allow art directors and clients to inspect critical focus, lighting, and color on calibrated displays in real-time.",
          "Because camera memory cards cannot store RAW files.",
          "To charge the camera battery during shooting.",
          "To stream directly to social media."
        ],
        correctIndex: 0,
        explanation: "Tethered shooting provides immediate validation on high-resolution calibrated displays, catching framing errors instantly on set."
      },
      {
        id: "q-cph3",
        question: "What is focus stacking in commercial product photography?",
        options: [
          "Blending multiple exposures focused at different depths to achieve edge-to-edge sharpness impossible in a single shot.",
          "Using multiple autofocus points simultaneously.",
          "Stacking multiple lenses on top of each other.",
          "Setting the aperture to f/64."
        ],
        correctIndex: 0,
        explanation: "Macro and product shots have razor-thin depth of field. Stacking multiple slices creates tack-sharp images without diffraction blur."
      },
      {
        id: "q-cph4",
        question: "What does an X-Rite or Calibrite ColorChecker target ensure?",
        options: [
          "Consistent, true-to-life color profiles under fluctuating studio strobe or ambient lighting conditions.",
          "Faster shutter speeds in low light.",
          "Automatic background removal in Photoshop.",
          "Higher resolution mega-pixel counts."
        ],
        correctIndex: 0,
        explanation: "Spectrophotometrically measured color swatches create custom DNG camera profiles, ensuring product colors match physical items."
      }
    ]
  },
  "quiz-speaking-1": {
    id: "quiz-speaking-1",
    courseId: "course-8",
    title: "Vocal Delivery & Stage Presence Quiz",
    description: "Assess your diaphragmatic breathing, pacing, and filler word elimination.",
    passingScore: 75,
    questions: [
      {
        id: "q-sp1",
        question: "Why is diaphragmatic (belly) breathing essential before stepping onto a stage?",
        options: [
          "It stimulates the vagus nerve and activates the parasympathetic nervous system, lowering heart rate and vocal strain.",
          "It allows you to shout without microphones.",
          "It burns calories faster during a speech.",
          "It prevents you from needing to drink water."
        ],
        correctIndex: 0,
        explanation: "Deep diaphragmatic breathing halts the fight-or-flight adrenal surge, steadying vocal cords and preventing breathy, trembling delivery."
      },
      {
        id: "q-sp2",
        question: "What is the most effective replacement for filler words such as 'um', 'ah', or 'like'?",
        options: [
          "A deliberate, confident silence (pause).",
          "Speaking twice as fast to avoid pauses.",
          "Coughing into the microphone.",
          "Looking down at your shoes."
        ],
        correctIndex: 0,
        explanation: "A purposeful pause conveys thoughtfulness and command of the room, while allowing the audience to absorb previous points."
      },
      {
        id: "q-sp3",
        question: "Where should a speaker's eye contact be directed when addressing an auditorium?",
        options: [
          "Holding meaningful 3–5 second eye contact with individual audience members across different sections.",
          "Staring blankly at the clock on the back wall.",
          "Rapidly scanning like a radar scanner without stopping.",
          "Looking exclusively at the slide projector screen."
        ],
        correctIndex: 0,
        explanation: "Direct individual connection builds authentic intimacy and keeps the entire room engaged."
      },
      {
        id: "q-sp4",
        question: "What role does posture play in executive presence?",
        options: [
          "An open, grounded posture projects confidence, stabilizes breathing, and commands respect non-verbally.",
          "Crossing your arms shows deep analytical thought.",
          "Pacing constantly back and forth demonstrates energy.",
          "Leaning against the podium hides trembling legs."
        ],
        correctIndex: 0,
        explanation: "Grounding your feet shoulder-width apart with an open chest expands the ribcage for vocal projection and communicates composure."
      }
    ]
  },
  "quiz-capstone-speaking": {
    id: "quiz-capstone-speaking",
    courseId: "course-8",
    title: "Executive Leadership & Keynote Capstone Exam",
    description: "Earn your Certified Executive Speaker Certificate.",
    passingScore: 75,
    questions: [
      {
        id: "q-csp1",
        question: "What is Monroe's Motivated Sequence for persuasive speaking?",
        options: [
          "Attention → Need → Satisfaction → Visualization → Action",
          "Introduction → Body Paragraphs → Conclusion",
          "Question → Joke → Slide Deck → Q&A",
          "Problem → Blame → Apology → Exit"
        ],
        correctIndex: 0,
        explanation: "Alan Monroe's 5-step sequence is the gold standard of persuasive rhetoric, guiding listeners from attention to committed action."
      },
      {
        id: "q-csp2",
        question: "Why should a keynote speaker never start with logistical house-keeping announcements?",
        options: [
          "The first 30 seconds are the highest-retention window to hook curiosity and establish emotional connection.",
          "Audiences already know where the fire exits are.",
          "Microphones do not work in the first 30 seconds.",
          "Keynotes are forbidden from having agendas."
        ],
        correctIndex: 0,
        explanation: "Open strong with a story, surprising fact, or bold question when audience attention is at its peak."
      },
      {
        id: "q-csp3",
        question: "When responding to hostile or challenging questions during Q&A, what is the best technique?",
        options: [
          "Acknowledge the concern calmly, reframe to the core positive principle, and answer succinctly.",
          "Argue aggressively with the questioner.",
          "Pretend you did not hear the question.",
          "Immediately end the meeting and walk off."
        ],
        correctIndex: 0,
        explanation: "Reframing diffuse antagonism into an objective business challenge maintains executive authority and preserves audience respect."
      },
      {
        id: "q-csp4",
        question: "What is the primary objective of executive storytelling?",
        options: [
          "To anchor abstract corporate metrics into memorable human emotion that inspires decisive action.",
          "To pass the time until lunch.",
          "To boast about personal accomplishments.",
          "To avoid presenting actual financial data."
        ],
        correctIndex: 0,
        explanation: "Data informs, but stories move people. Stories give numbers emotional context that drives organizational commitment."
      }
    ]
  }
};
