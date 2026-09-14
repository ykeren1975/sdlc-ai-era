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
