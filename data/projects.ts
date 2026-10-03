/**
 * Projects. Case-study copy describes design goals and concepts —
 * edit freely, but keep it honest (no invented metrics or users).
 */

export type FlowNode = { label: string; note?: string };

export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  stack: string[];
  concepts: string[];
  github?: string;
  live?: string;
  /** Visual accent for the artifact card */
  tone: "amber" | "blue" | "cream" | "ink" | "yellow";
  /** Flow shown on the card + in the case study */
  flow: FlowNode[];
  caseStudy: {
    problem: string;
    why: string;
    architecture: string;
    decisions: string[];
    challenges: string[];
    learned: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "messaging-platform",
    index: "01",
    title: "Messaging Platform",
    category: "Real-time Systems",
    summary:
      "A real-time messaging platform focused on reliable WebSocket communication and scalable backend architecture.",
    stack: ["Node.js", "Express", "WebSockets", "Socket.IO", "Redis", "PostgreSQL", "Prisma", "JWT", "Docker"],
    concepts: [
      "WebSocket reliability",
      "Message recovery",
      "Redis Pub/Sub",
      "Horizontal WS scaling",
      "Idempotency",
      "Unified message pipeline",
      "Graceful shutdown",
      "Observability",
      "Load testing",
    ],
    github: "https://github.com/TridibeshSam31/messaging-platform",
    tone: "amber",
    flow: [
      { label: "Client", note: "WS connection" },
      { label: "WS Node", note: "any instance" },
      { label: "Pipeline", note: "validate · dedupe" },
      { label: "Postgres", note: "persist first" },
      { label: "Redis Pub/Sub", note: "fan-out" },
      { label: "Recipients", note: "+ recovery on reconnect" },
    ],
    caseStudy: {
      problem:
        "A chat demo works on one server. Real messaging has to survive dropped connections, duplicate sends, multiple server instances and deploys — without losing or double-delivering messages.",
      why:
        "I wanted to treat chat as a backend systems problem: what actually happens to a message between the sender's socket and every recipient, and what breaks when you add a second server.",
      architecture:
        "Clients connect over WebSockets to any stateless Node instance. Every message — regardless of entry point — flows through one pipeline that validates it, checks an idempotency key, persists it to PostgreSQL, then publishes it over Redis Pub/Sub so whichever instance holds the recipient's socket can deliver it. Reconnecting clients ask for everything after their last-seen message.",
      decisions: [
        "Persist before fan-out, so a delivered message is always a stored message.",
        "Client-generated idempotency keys so retries never create duplicates.",
        "Redis Pub/Sub between instances instead of sticky in-memory state.",
        "A single unified message pipeline instead of per-event special cases.",
        "Graceful shutdown: stop accepting, drain sockets, then exit.",
      ],
      challenges: [
        "Defining ordering and 'last seen' semantics for message recovery.",
        "Keeping instances stateless while sockets are inherently stateful.",
        "Making failures visible — structured logs and load tests instead of guessing.",
      ],
      learned: [
        "Reliability is mostly about the unhappy paths.",
        "Idempotency turns 'at-least-once' into something users can trust.",
        "You don't understand a system until you've load tested it.",
      ],
    },
  },
  {
    slug: "eventra",
    index: "02",
    title: "EVENTRA",
    category: "Agentic AI",
    summary:
      "An agentic event orchestration platform that turns an event requirement into coordinated tasks — venue discovery, vendor discovery, communication, approvals and execution.",
    stack: ["Python", "FastAPI", "LangGraph", "AI Agents", "PostgreSQL", "Google Maps", "Comms integrations"],
    concepts: [
      "Agent orchestration",
      "State machines",
      "Tool calling",
      "Vendor discovery",
      "Human-in-the-loop",
      "Event-driven workflows",
    ],
    github: "https://github.com/TridibeshSam31/EVENTRA",
    tone: "blue",
    flow: [
      { label: "Requirement", note: "\"40 people, Saturday\"" },
      { label: "Planner", note: "LangGraph state" },
      { label: "Venue agent", note: "maps / location" },
      { label: "Vendor agent", note: "discovery" },
      { label: "Comms", note: "outreach" },
      { label: "Human approval", note: "checkpoint" },
      { label: "Execution" },
    ],
    caseStudy: {
      problem:
        "Planning an event is a long chain of dependent tasks — find a venue, find vendors, contact them, wait, compare, confirm. It's exactly the kind of messy, multi-step work a single LLM prompt can't do reliably.",
      why:
        "I wanted to build an agent system where the LLM is one component inside a real workflow — with explicit state, tools, and points where a human stays in control.",
      architecture:
        "A FastAPI backend drives a LangGraph state machine. A planner breaks the requirement into tasks; specialised agents call tools for venue discovery (location APIs), vendor discovery and communication. State is persisted in PostgreSQL so long-running workflows survive restarts, and approval nodes pause the graph until a human signs off.",
      decisions: [
        "Model the workflow as an explicit graph instead of free-form agent loops.",
        "Tool calling with structured outputs so each step is checkable.",
        "Persist agent state so workflows can pause, resume and be inspected.",
        "Human-in-the-loop approval before anything is committed externally.",
      ],
      challenges: [
        "Keeping agents on-task across many steps.",
        "Handling async, real-world responses that arrive late or not at all.",
        "Deciding which decisions an agent may take alone, and which need a human.",
      ],
      learned: [
        "Agents are a backend problem: state, retries, timeouts, idempotency.",
        "Constraining an LLM well matters more than prompting it cleverly.",
      ],
    },
  },
  {
    slug: "retail-store-agent",
    index: "03",
    title: "Retail Store Agent",
    category: "Agentic Systems",
    summary:
      "A multi-agent retail system that detects inventory shortages and negotiates restocking — finding surplus elsewhere in the chain, with a neutral arbitrator and a human approving the outcome.",
    stack: ["TypeScript", "LangGraph", "PostgreSQL", "LLM APIs", "ML demand forecasting"],
    concepts: [
      "Real-time + batch triggers",
      "Inventory monitoring",
      "Negotiation agents",
      "Router",
      "Human approval",
      "Persistent agent state",
    ],
    github: "https://github.com/TridibeshSam31/retail-store-agent",
    live: "https://retail-store-agent.vercel.app/",
    tone: "yellow",
    flow: [
      { label: "Inventory event" },
      { label: "Trigger", note: "real-time / batch" },
      { label: "Agent", note: "router" },
      { label: "Negotiation" },
      { label: "Arbitrator" },
      { label: "Human approval" },
      { label: "Resolution" },
    ],
    caseStudy: {
      problem:
        "Stock-outs are noticed late, restocking is a slow manual back-and-forth, and decisions are often gut-feel — even when another store in the chain has surplus. The decision has to be fast, but moving money and stock still needs a human.",
      why:
        "A good testbed for multi-agent coordination: agents with competing goals (one per store) negotiating inside hard constraints, with a neutral party deciding.",
      architecture:
        "Each store has its own negotiating agent, informed by a demand forecaster. Inventory changes fire triggers — immediately for critical events, or in scheduled batches. A router hands the case to the relevant agents, who look for surplus elsewhere in the chain and negotiate; a neutral arbitrator evaluates proposals against constraints; the graph then pauses for human approval before resolving. Agent state is persisted in PostgreSQL.",
      decisions: [
        "Two trigger paths: real-time for urgency, batch for efficiency.",
        "A router node instead of one monolithic agent.",
        "A separate arbitrator so negotiators don't grade their own work.",
        "Persistent state so every negotiation is auditable.",
      ],
      challenges: [
        "Stopping negotiation loops from running forever.",
        "Turning fuzzy LLM output into decisions a system can act on.",
      ],
      learned: [
        "Separation of concerns applies to agents too.",
        "Human approval is a feature, not a fallback.",
      ],
    },
  },
  {
    slug: "codearena",
    index: "04",
    title: "CodeArena",
    category: "Developer Infrastructure",
    summary:
      "An online judge platform focused on executing untrusted user code safely — asynchronous, sandboxed, resource-limited execution with real-time submission tracking.",
    stack: ["Next.js", "TypeScript", "BullMQ", "Redis", "Prisma", "PostgreSQL", "Docker"],
    concepts: [
      "Docker sandboxing",
      "Isolated execution",
      "Resource constraints",
      "Secure code execution",
      "Job queues + workers",
      "Real-time submission status",
    ],
    github: "https://github.com/TridibeshSam31/CodeArena",
    tone: "ink",
    flow: [
      { label: "Code", note: "untrusted · queued (BullMQ)" },
      { label: "Sandbox", note: "worker → container" },
      { label: "Execution" },
      { label: "Resource limits", note: "cpu · mem · time" },
      { label: "Result" },
    ],
    caseStudy: {
      problem:
        "Running strangers' code on your server is a security problem first and a feature second: infinite loops, memory bombs, file system access, network calls.",
      why:
        "I wanted to understand what's actually underneath every online judge — isolation, limits and the plumbing that gets a verdict back to the user.",
      architecture:
        "Submissions are enqueued with BullMQ on Redis instead of being executed inside the request. Background workers pick up jobs and run each one inside an isolated Docker container with CPU, memory and time limits, capture the output, tear the container down and record the verdict via Prisma/PostgreSQL — while the client tracks submission status in real time.",
      decisions: [
        "Queue + workers so slow executions never block the API.",
        "One disposable container per execution.",
        "Hard CPU / memory / wall-clock limits.",
        "Treat every submission as hostile by default.",
      ],
      challenges: [
        "Balancing container start-up cost against isolation.",
        "Reliably killing runaway processes and cleaning up.",
      ],
      learned: [
        "Security is a set of layered constraints, not one switch.",
        "Containers are a tool, not a security guarantee — limits matter.",
      ],
    },
  },
  {
    slug: "workbench",
    index: "05",
    title: "Workbench",
    category: "Browser IDE & Systems",
    summary:
      "A browser-native development environment built with Next.js, WebContainers, Monaco Editor, and local AI models powered by Ollama.",
    stack: ["Next.js", "TypeScript", "WebContainers", "Monaco Editor", "Ollama", "Tailwind CSS", "Node.js"],
    concepts: [
      "In-browser Node runtime",
      "WebContainers isolation",
      "Monaco IDE",
      "Local LLM inference",
      "Virtual file system",
      "Embedded PTY terminal",
    ],
    github: "https://github.com/TridibeshSam31/Workbench",
    tone: "cream",
    flow: [
      { label: "Client IDE", note: "Monaco editor" },
      { label: "Virtual FS", note: "in-memory tree" },
      { label: "WebContainer", note: "Node.js in Wasm" },
      { label: "Embedded PTY", note: "terminal runner" },
      { label: "Ollama", note: "local AI agent" },
      { label: "Live Preview", note: "in-tab output" },
    ],
    caseStudy: {
      problem:
        "Setting up dev environments, installing runtimes, and managing dependencies friction slows developers down, while cloud IDEs suffer from latency, cost, and vendor lock-in.",
      why:
        "I wanted to explore the cutting edge of browser capabilities: running a complete sandboxed Node.js operating environment and local AI inference directly inside the client without spinning up costly server containers.",
      architecture:
        "Next.js orchestrates Monaco Editor and WebContainers (running Node.js in WebAssembly directly in the browser tab). File operations interact with an in-memory virtual filesystem, commands execute in an embedded terminal with full PTY support, and Ollama provides local AI code assistance via streaming completions.",
      decisions: [
        "WebContainers over remote VMs for zero cloud compute costs and instant boot times.",
        "Monaco Editor for full VS Code keybindings, IntelliSense, and syntax highlighting.",
        "Local Ollama model integration for zero-cost, private AI code generation and debugging.",
        "Virtual in-memory filesystem with GitHub repo import capability.",
      ],
      challenges: [
        "Managing SharedArrayBuffer and cross-origin isolation headers required for WebContainers.",
        "Streaming local LLM tokens directly into editor state without locking the UI thread.",
      ],
      learned: [
        "Browsers have evolved into full-fledged operating systems.",
        "WebContainers + local AI redefine what is possible in client-side developer tooling.",
      ],
    },
  },
];
