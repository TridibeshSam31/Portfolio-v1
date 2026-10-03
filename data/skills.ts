export const heroStickers = [
  "AI Agents",
  "Backend",
  "System Design Fundamentals",
  "Postgres",
  "Redis",
  "WebSockets",
  "Dist. Fundamentals",
  "DSA",
];

export const principles = [
  {
    n: "01",
    title: "Build the system",
    body: "Tutorials end where the real problems start. I learn by building the whole thing — and then breaking it.",
  },
  {
    n: "02",
    title: "Understand the abstraction",
    body: "Frameworks are borrowed time. I want to know what the ORM, the socket and the agent loop are doing underneath.",
  },
  {
    n: "03",
    title: "Design for failure",
    body: "Connections drop, processes crash, LLMs hallucinate. Good systems assume it and recover.",
  },
  {
    n: "04",
    title: "Measure before optimizing",
    body: "Logs, EXPLAIN ANALYZE, load tests. Opinions are cheap; numbers aren't.",
  },
  {
    n: "05",
    title: "Ship it",
    body: "A working system with rough edges teaches more than a perfect design doc.",
  },
];

export const systemsCards = [
  {
    key: "db",
    title: "Databases",
    code: "§1",
    items: ["PostgreSQL", "SQL", "Indexes", "Transactions", "ACID", "EXPLAIN ANALYZE", "Prisma"],
    note: "where the truth lives",
  },
  {
    key: "dist",
    title: "System Design & Distributed",
    code: "§2",
    items: [
      "System Design Fundamentals",
      "Redis Caching & State",
      "Pub/Sub & Event Streams",
      "Horizontal WebSocket Scaling",
      "Idempotency & Retries",
      "Message Recovery Patterns",
      "CAP & Trade-off Basics",
    ],
    note: "studying fundamentals",
    link: "https://github.com/TridibeshSam31/System-Design",
    linkLabel: "System-Design repo ↗",
  },
  {
    key: "sec",
    title: "Security",
    code: "§3",
    items: ["JWT", "Refresh tokens", "OIDC", "Authentication", "Authorization", "Secure APIs"],
    note: "trust nothing",
  },
  {
    key: "ai",
    title: "AI Infrastructure",
    code: "§4",
    items: ["LLM APIs", "Agents", "RAG", "LangGraph", "Evaluations", "Tool calling", "Structured outputs", "LLM gateways", "Async AI workflows"],
    note: "LLMs are just another service",
  },
  {
    key: "infra",
    title: "Infrastructure",
    code: "§5",
    items: ["Docker", "CI/CD", "Git / GitHub", "Cloud deployment", "Observability", "Logging", "Load testing"],
    note: "it works on more than my machine",
  },
];

export const languages = ["TypeScript", "JavaScript", "Python", "SQL"];
export const backendTools = ["Node.js", "Express", "FastAPI", "REST APIs", "WebSockets", "Prisma"];
/** Frontend is deliberately listed small. */
export const frontendTools = ["React", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS"];

/** No progress claims — just the route being travelled. */
export const dsaTopics = [
  "Arrays",
  "Linked Lists",
  "Stacks & Queues",
  "Recursion",
  "Backtracking",
  "Sorting",
  "Trees",
  "Graphs",
  "Dynamic Programming",
];
