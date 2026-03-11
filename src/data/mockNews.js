export const categories = ["All", "Tech", "AI", "Business", "World"];

export const mockArticles = [
  {
    id: "ai-chip-race",
    title: "AI chip race accelerates as new edge devices target faster local inference",
    category: "AI",
    sentiment: "Positive",
    source: "Neural Dispatch",
    author: "Ava Menon",
    publishedAt: "2026-03-09T08:15:00Z",
    readMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Hardware startups are shifting focus from cloud-heavy pipelines to efficient on-device AI, promising lower latency and stronger privacy guarantees.",
    content:
      "New AI hardware vendors are racing to build edge-first compute platforms that can power assistants, cameras, and industrial systems without depending on round trips to the cloud. Investors see the space as a bridge between mobile chips and full data center accelerators.",
    summary:
      "Edge AI hardware is becoming a major focus as companies try to run models locally. The shift reduces latency, improves privacy, and lowers cloud costs. Startups that can balance performance with power efficiency are getting the most attention.",
    takeaways: [
      "On-device inference is becoming commercially viable.",
      "Privacy and latency are the strongest adoption drivers.",
      "Energy-efficient chips are emerging as a competitive moat."
    ],
    simplified:
      "Companies are building smarter chips so AI can work directly on phones, cameras, and devices instead of always using the internet."
  },
  {
    id: "tech-browser-agents",
    title: "Browser-based AI agents push productivity tools into a new competitive phase",
    category: "Tech",
    sentiment: "Neutral",
    source: "Signal Weekly",
    author: "Rohan Iyer",
    publishedAt: "2026-03-08T12:40:00Z",
    readMinutes: 5,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Product suites are embedding task-running agents directly inside browsers, creating a race around workflow automation and human oversight.",
    content:
      "AI agents that operate within browser sessions are moving from experimental demos into mainstream productivity products. Teams are still debating trust, permissions, and how much autonomy should be given to tools that can click, search, and summarize in real time.",
    summary:
      "Browser-native agents are becoming a core feature in productivity apps. Vendors are trying to automate more routine work while preserving user control. The market is now differentiating on reliability and safety instead of novelty alone.",
    takeaways: [
      "AI agent interfaces are moving into everyday tools.",
      "Permission design is now a product differentiator.",
      "Enterprise adoption depends on trust and auditability."
    ],
    simplified:
      "Software companies want AI to help do web tasks for users, but they still need to make sure people stay in control."
  },
  {
    id: "business-earnings-cloud",
    title: "Cloud spending remains resilient as enterprise software vendors beat forecasts",
    category: "Business",
    sentiment: "Positive",
    source: "Market Ledger",
    author: "Megha Kapoor",
    publishedAt: "2026-03-07T15:20:00Z",
    readMinutes: 4,
    image:
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Quarterly earnings suggest companies are still prioritizing data, AI tooling, and modern infrastructure even while trimming other budgets.",
    content:
      "Enterprise buyers remain selective, but software companies exposed to analytics, collaboration, and AI-enablement posted stronger-than-expected numbers this quarter. Analysts say spending is increasingly concentrated around tools that can show measurable productivity improvements.",
    summary:
      "Cloud and enterprise software demand held up better than expected. Businesses are still spending in areas tied to measurable efficiency gains. AI infrastructure and analytics platforms are capturing the biggest budgets.",
    takeaways: [
      "Enterprise tech budgets are narrowing around ROI-heavy tools.",
      "AI and analytics remain protected budget lines.",
      "Investors are rewarding durable software demand."
    ],
    simplified:
      "Companies are cutting some costs, but they are still paying for software that clearly saves time or improves work."
  },
  {
    id: "world-regulation-open-models",
    title: "Global policymakers debate how open AI models should be governed",
    category: "World",
    sentiment: "Negative",
    source: "Worldline Press",
    author: "Nikhil Sharma",
    publishedAt: "2026-03-06T10:00:00Z",
    readMinutes: 7,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Officials are split between encouraging open innovation and imposing stricter controls on high-capability models with public access.",
    content:
      "The regulatory debate around open AI systems is intensifying as governments consider how to address misuse, transparency, and accountability. Advocates warn that overly broad rules could hurt research, while critics argue that unrestricted access creates systemic risk.",
    summary:
      "Governments are struggling to balance innovation with safety in the open-model debate. The main tension is whether public access increases progress or risk. New rules may focus on transparency and developer responsibility.",
    takeaways: [
      "Open model policy remains fragmented across regions.",
      "Safety and innovation are being weighed against each other.",
      "Transparency obligations could become the common ground."
    ],
    simplified:
      "Leaders are trying to decide how much freedom AI creators should have while still keeping people safe."
  },
  {
    id: "ai-healthcare-copilots",
    title: "Clinical copilots show promise, but hospitals still demand tighter evidence",
    category: "AI",
    sentiment: "Neutral",
    source: "Health Compute",
    author: "Sana Joseph",
    publishedAt: "2026-03-05T09:45:00Z",
    readMinutes: 8,
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Healthcare pilots are moving ahead cautiously as providers evaluate whether AI tools reduce paperwork without increasing clinical risk.",
    content:
      "Hospitals are testing AI copilots for note generation, triage support, and workflow coordination. Procurement teams remain cautious, requiring stronger evidence on reliability, bias, and integration with existing clinical systems.",
    summary:
      "Healthcare organizations are interested in AI copilots but remain highly selective. Productivity wins are attractive, yet patient safety and evidence standards remain non-negotiable. Adoption will likely stay gradual until evaluation frameworks mature.",
    takeaways: [
      "Healthcare is receptive but evidence-driven.",
      "Workflow gains alone are not enough for rollout.",
      "Risk management will shape procurement decisions."
    ],
    simplified:
      "Hospitals like the idea of AI helpers, but they want much stronger proof that the tools are safe and useful."
  },
  {
    id: "tech-open-source-security",
    title: "Open-source security tooling gains traction after supply-chain scare",
    category: "Tech",
    sentiment: "Negative",
    source: "Stack Journal",
    author: "Priya Das",
    publishedAt: "2026-03-04T18:05:00Z",
    readMinutes: 5,
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Engineering teams are investing in dependency visibility and package verification tools after a high-profile compromise rippled across ecosystems.",
    content:
      "Recent supply-chain incidents have renewed urgency around package signing, provenance tracking, and dependency governance. Security leaders say many organizations still lack reliable inventory data for critical open-source components.",
    summary:
      "A supply-chain scare has pushed open-source security back to the top of engineering priorities. Teams are looking for better visibility into dependencies and package integrity. Tooling adoption is rising, but process maturity still varies widely.",
    takeaways: [
      "Security investment often spikes after ecosystem incidents.",
      "Software provenance is becoming a board-level concern.",
      "Visibility gaps remain a major operational weakness."
    ],
    simplified:
      "After a software security problem, teams are using better tools to check which outside code they depend on."
  },
  {
    id: "business-creator-economy",
    title: "Creator economy platforms chase subscription growth with bundled perks",
    category: "Business",
    sentiment: "Positive",
    source: "Commerce Now",
    author: "Diya Bhat",
    publishedAt: "2026-03-03T14:10:00Z",
    readMinutes: 3,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Platforms are experimenting with higher-value memberships, community layers, and premium analytics to improve creator retention.",
    content:
      "Subscription growth is becoming the key battleground in the creator economy as platforms move beyond basic fan payments. New offerings combine exclusive content, analytics, and community features to increase recurring revenue and reduce churn.",
    summary:
      "Creator platforms are leaning into bundles to improve subscription growth. The winning formula appears to combine content access with analytics and community. Retention, not just acquisition, is shaping product design.",
    takeaways: [
      "Recurring revenue is the dominant creator-platform metric.",
      "Bundled features improve platform stickiness.",
      "Premium analytics are becoming a monetization lever."
    ],
    simplified:
      "Creator apps want fans to keep paying every month, so they are adding more useful benefits to subscriptions."
  },
  {
    id: "world-energy-data-centers",
    title: "Energy policy enters the AI discussion as data center demand climbs",
    category: "World",
    sentiment: "Neutral",
    source: "Global Current",
    author: "Arjun Patel",
    publishedAt: "2026-03-02T07:30:00Z",
    readMinutes: 6,
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Officials and utilities are reassessing energy planning as AI workloads drive higher electricity demand from new data centers.",
    content:
      "Rapid data center expansion is putting fresh pressure on power grids and permitting processes. Policymakers are increasingly discussing how AI growth intersects with energy resilience, local infrastructure, and sustainability targets.",
    summary:
      "AI growth is now influencing energy planning discussions. New data centers are increasing demand on power systems and infrastructure. Governments may need updated policy tools to manage both growth and sustainability.",
    takeaways: [
      "AI infrastructure has become an energy policy issue.",
      "Grid resilience is part of the compute conversation.",
      "Sustainability targets are colliding with expansion plans."
    ],
    simplified:
      "Because AI uses a lot of computing power, leaders are also thinking more about electricity and energy supply."
  }
];
