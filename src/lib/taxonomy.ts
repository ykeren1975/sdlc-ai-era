// Fixed vocabularies shared by the content schema and the UI.

export const PHASES = [
  "plan",
  "requirements",
  "design",
  "build",
  "test",
  "deploy",
  "operate",
] as const;
export type Phase = (typeof PHASES)[number];

export const PHASE_LABELS: Record<Phase, string> = {
  plan: "Plan",
  requirements: "Requirements",
  design: "Design",
  build: "Build",
  test: "Test",
  deploy: "Deploy",
  operate: "Operate",
};

export const ROLE_GROUPS = [
  {
    label: "Product & Design",
    roles: ["product-manager", "business-analyst", "ux-designer"],
  },
  {
    label: "Engineering",
    roles: [
      "software-architect",
      "developer",
      "qa-tester",
      "security-engineer",
    ],
  },
  { label: "Operations & Data", roles: ["devops-sre", "data-engineer"] },
  {
    label: "Leadership & Delivery",
    roles: ["project-manager", "scrum-master", "engineering-manager"],
  },
] as const;

export const ROLE_ICONS = [
  "clipboard-list",
  "chart-gantt",
  "code",
  "flask-conical",
  "compass",
  "pen-tool",
  "server-cog",
  "layers",
  "shield-check",
  "database",
  "users",
  "refresh-cw",
] as const;
export type RoleIcon = (typeof ROLE_ICONS)[number];

export const TOOL_CATEGORIES = [
  "ai-coding-assistant",
  "ai-chat-assistant",
  "ai-agent",
  "requirements-and-docs",
  "project-management",
  "design-and-prototyping",
  "testing-and-qa",
  "code-review",
  "devops-and-cloud",
  "observability",
  "security",
  "data-and-analytics",
  "collaboration",
] as const;
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];

export const TOOL_CATEGORY_LABELS: Record<ToolCategory, string> = {
  "ai-coding-assistant": "AI coding assistant",
  "ai-chat-assistant": "AI chat assistant",
  "ai-agent": "AI agent",
  "requirements-and-docs": "Requirements & docs",
  "project-management": "Project management",
  "design-and-prototyping": "Design & prototyping",
  "testing-and-qa": "Testing & QA",
  "code-review": "Code review",
  "devops-and-cloud": "DevOps & cloud",
  observability: "Observability",
  security: "Security",
  "data-and-analytics": "Data & analytics",
  collaboration: "Collaboration",
};

// Source types (rubric in CLAUDE.md "Source types").
export const SOURCE_TYPES = [
  "research",
  "survey",
  "official",
  "vendor",
  "practitioner",
  "news",
] as const;
export type SourceType = (typeof SOURCE_TYPES)[number];

export const SOURCE_TYPE_LABELS: Record<
  SourceType,
  { label: string; one: string; many: string }
> = {
  research: {
    label: "Research paper",
    one: "research paper",
    many: "research papers",
  },
  survey: { label: "Survey", one: "survey", many: "surveys" },
  official: {
    label: "Official guidance",
    one: "official guidance",
    many: "official guidance",
  },
  vendor: { label: "Vendor page", one: "vendor page", many: "vendor pages" },
  practitioner: {
    label: "Practitioner",
    one: "practitioner article",
    many: "practitioner articles",
  },
  news: { label: "News", one: "news article", many: "news articles" },
};

/** "1 survey", "3 vendor pages". */
export function sourceTypeCount(type: SourceType, n: number) {
  return `${n} ${n === 1 ? SOURCE_TYPE_LABELS[type].one : SOURCE_TYPE_LABELS[type].many}`;
}

// Roles that work closely together (editorial). Symmetric: listing a pair once links both ways.
export const ROLE_RELATIONS: [string, string][] = [
  ["developer", "qa-tester"],
  ["developer", "software-architect"],
  ["developer", "devops-sre"],
  ["developer", "security-engineer"],
  ["business-analyst", "product-manager"],
  ["business-analyst", "qa-tester"],
  ["product-manager", "ux-designer"],
  ["project-manager", "scrum-master"],
  ["project-manager", "engineering-manager"],
  ["engineering-manager", "developer"],
  ["data-engineer", "software-architect"],
  ["devops-sre", "security-engineer"],
  ["scrum-master", "product-manager"],
  ["software-architect", "security-engineer"],
  ["ux-designer", "business-analyst"],
  ["data-engineer", "product-manager"],
  ["qa-tester", "product-manager"],
];

export function relatedRoles(id: string): string[] {
  return ROLE_RELATIONS.flatMap(([a, b]) =>
    a === id ? [b] : b === id ? [a] : [],
  );
}
