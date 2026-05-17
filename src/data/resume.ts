export const profile = {
  name: "Ayush Salunke",
  role: "Senior Software Engineer",
  tagline: "Builds deployment platforms that ship code faster.",
  location: "San Francisco Bay Area",
};

export const contact = {
  phone: "(669) 220-9962",
  email: "ayush.salunke250497@gmail.com",
  linkedin: "https://linkedin.com/in/ayush-salunke",
  github: "https://github.com/ayushsalunke",
};

export type Stat = { value: string; label: string; suffix?: string; target: number };

export const stats: Stat[] = [
  { value: "6", suffix: "+ years", label: "engineering experience", target: 6 },
  { value: "200", suffix: "+", label: "developers impacted", target: 200 },
  { value: "80", suffix: "%", label: "latency reduction", target: 80 },
  { value: "70", suffix: "%", label: "deploy complexity cut", target: 70 },
];

export const now = {
  title: "Leading deployment platform @ JPMorgan Chase",
  bullets: [
    "Orchestrating CI/CD for hundreds of services across global trading desks.",
    "Designed the next-gen release pipeline adopted org-wide.",
    "Architecting self-serve deploys — dev to prod in under 10 minutes, zero tickets.",
  ],
};

export type Experience = {
  company: string;
  role: string;
  start: string;
  end: string;
  accent: string;
  logo: string;
  achievements: string[];
};

export const experiences: Experience[] = [
  {
    company: "JPMorgan Chase",
    role: "Lead Software Engineer",
    start: "Jun 2022",
    end: "Present",
    accent: "#0b2545",
    logo: "/images/jpmc.png",
    achievements: [
      "Architected and led migration of the enterprise deployment platform from a legacy CLI to a React-based UI — 200+ developers deploying microservices to GCP, cutting deployment complexity ~70%.",
      "Engineered high-performance REST APIs with Dropwizard in Java for seamless data sync between the frontend and complex backend deployment engines.",
      "Architected a unified CI/CD framework in Spinnaker & Harness, tuning Maven and Gradle builds for a 75% reduction in delivery time with automated canary and blue-green deployments.",
    ],
  },
  {
    company: "UBS",
    role: "Software Developer",
    start: "Jul 2019",
    end: "Jun 2021",
    accent: "#ec0016",
    logo: "/images/ubs.jpeg",
    achievements: [
      "Developed and scaled backend services in Java for a global client onboarding platform, adapting system logic to evolving international financial regulations.",
      "Optimized risk assessment by integrating AI and NLP models in Python to automate client background checks — 80% less manual processing time.",
      "Engineered a high-throughput compliance engine with Drools managing 25,000+ global financial regulation rules, ensuring 100% compliance across jurisdictions.",
      "Built a unified gamification platform in ReactJS and Python engaging 20,000+ technology users globally within the organization.",
    ],
  },
  {
    company: "UBS",
    role: "Software Developer Intern",
    start: "Jul 2018",
    end: "Nov 2018",
    accent: "#ec0016",
    logo: "/images/ubs.jpeg",
    achievements: [
      "Designed an automated functional testing framework using Selenium and Java validating 2M+ test scenarios for the core client onboarding platform.",
      "Partnered with Business Analysts and UI developers to translate complex testing requirements into scalable automated suites.",
    ],
  },
];

export type SkillItem = { name: string; slug: string };
export type SkillCategory = { name: string; items: SkillItem[] };

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & Agentic",
    items: [
      { name: "Claude Code", slug: "anthropic" },
      { name: "GitHub Copilot", slug: "githubcopilot" },
      { name: "Cursor", slug: "cursor" },
      { name: "Codex", slug: "openai" },
      { name: "AI Agents", slug: "anthropic" },
      { name: "Agent Skills", slug: "anthropic" },
      { name: "MCP Servers", slug: "modelcontextprotocol" },
    ],
  },
  {
    name: "Languages",
    items: [
      { name: "TypeScript", slug: "typescript" },
      { name: "Python", slug: "python" },
      { name: "Java", slug: "openjdk" },
      { name: "Go", slug: "go" },
      { name: "SQL", slug: "mysql" },
      { name: "Bash", slug: "gnubash" },
    ],
  },
  {
    name: "Backend & Data",
    items: [
      { name: "Spring Boot", slug: "springboot" },
      { name: "Node.js", slug: "nodedotjs" },
      { name: "GraphQL", slug: "graphql" },
      { name: "PostgreSQL", slug: "postgresql" },
      { name: "Kafka", slug: "apachekafka" },
      { name: "Redis", slug: "redis" },
    ],
  },
  {
    name: "Frontend",
    items: [
      { name: "React", slug: "react" },
      { name: "Next.js", slug: "nextdotjs" },
      { name: "Tailwind", slug: "tailwindcss" },
      { name: "Framer Motion", slug: "framer" },
      { name: "Vite", slug: "vite" },
      { name: "GSAP", slug: "greensock" },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { name: "Amazon Web", slug: "/images/aws.svg" },
      { name: "Google Cloud", slug: "googlecloud" },
      { name: "Microsoft Azure", slug: "microsoftazure" },
      { name: "Kubernetes", slug: "kubernetes" },
      { name: "Docker", slug: "docker" },
      { name: "Terraform", slug: "terraform" },
      { name: "Spinnaker", slug: "spinnaker" },
      { name: "Harness", slug: "harness" },
      { name: "Jenkins", slug: "jenkins" },
      { name: "GitHub Actions", slug: "githubactions" },
    ],
  },
  {
    name: "Observability",
    items: [
      { name: "Prometheus", slug: "prometheus" },
      { name: "Grafana", slug: "grafana" },
      { name: "Datadog", slug: "datadog" },
      { name: "OpenTelemetry", slug: "opentelemetry" },
      { name: "Splunk", slug: "splunk" },
      { name: "ELK", slug: "elasticsearch" },
    ],
  },
];

export const potholeProject = {
  title: "Pothole Detection",
  subtitle: "Published · ICIAMR 2019",
  url: "http://www.ijeam.com/Published%20Paper/Volume%2054/Issue%203/38.pdf",
  phases: [
    {
      label: "Problem",
      body: "Roads degrade silently. Manual surveys are slow and dangerous. We needed on-device vision that spots potholes from a dashcam in real time.",
    },
    {
      label: "CNN architecture",
      body: "MobileNet backbone fine-tuned on a custom Indian-roads dataset. Quantized for edge inference on a Raspberry Pi-class device.",
    },
    {
      label: "Results",
      body: "94% precision on held-out footage. Paper accepted at IEEE ICIAMR 2019.",
    },
  ],
};

export const parkSafeProject = {
  title: "ParkSafe",
  blurb: "Flask + OpenStreetMap mashup surfacing the safest legal parking near any destination, ranked by crime density.",
  stack: ["Flask", "OpenStreetMap", "Leaflet", "SQLite"],
  url: "https://devpost.com/software/parksafe",
};

export type School = { school: string; degree: string; gpa: string; years: string };

export const education: School[] = [
  {
    school: "Santa Clara University",
    degree: "MS, Computer Science & Engineering",
    gpa: "3.815",
    years: "2021 – 2023",
  },
  {
    school: "VIT Pune",
    degree: "B.Tech, Computer Engineering",
    gpa: "3.64",
    years: "2015 – 2019",
  },
];

export type Agent = { name: string; role: string };

export const agentTeam = {
  eyebrow: "Internal tooling · JPMorgan Chase",
  title: "An agentic engineering crew, bootstrapped per repo",
  blurb:
    "One command spins up a self-managing team of AI agents on any codebase. It builds a knowledge graph of the repo, auto-detects the stack, and runs the full loop — plan, edit, security-review, test, keep the graph live — so every engineer ships with an always-on context and review layer. Built so any team can stand up the same crew on their own repo.",
  agents: [
    {
      name: "agent-manager",
      role: "Breaks a request into tasks and delegates each to the right agent.",
    },
    {
      name: "code-editor",
      role: "Makes the code changes — always grounding decisions in the code knowledge graph first.",
    },
    {
      name: "security-reviewer",
      role: "Runs a validation report on every change and sends risks back to code-editor to fix.",
    },
    {
      name: "tester",
      role: "Auto-created for Java / Python repos. Runs unit tests on changes and reports bugs back.",
    },
    {
      name: "knowledge-seeker",
      role: "Keeps the code knowledge graph in sync as logic evolves.",
    },
  ] as Agent[],
  integrations: [
    "Terraform Registry",
    "Confluence",
    "Engineer Portal",
    "Bitbucket",
    "JIRA",
  ],
  usage: [
    {
      cmd: "/bootstrap-agents <project description>",
      note: "generates the agents + the codebase knowledge graph",
    },
    {
      cmd: "@agent-manager Understand JIRA-1234 and create a plan to implement it",
      note: "delegate work in plain English",
    },
  ],
};
