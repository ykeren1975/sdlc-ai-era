import { defineCollection, reference } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";
import { PHASES, ROLE_ICONS, TOOL_CATEGORIES } from "./lib/taxonomy";

const idPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

const tools = defineCollection({
  loader: file("src/data/tools.yaml"),
  schema: z.object({
    id: z.string().regex(idPattern),
    name: z.string(),
    vendor: z.string(),
    url: z.url(),
    category: z.enum(TOOL_CATEGORIES),
    description: z.string().max(160),
    status: z.enum(["active", "deprecated"]),
    lastVerified: z.coerce.date(),
  }),
});

// Ready-made Agent Skills from public catalogs.
const agentSkills = defineCollection({
  loader: file("src/data/agent-skills.yaml"),
  schema: z.object({
    id: z.string().regex(idPattern),
    name: z.string(),
    catalog: z.string(),
    url: z.url(),
    description: z.string().max(160),
    license: z.enum([
      "open-source",
      "source-available",
      "vendor-terms",
      "unspecified",
    ]),
    lastVerified: z.coerce.date(),
  }),
});

// Starter skills: real skill folders, validated against the agentskills.io spec.
// Strict object, so fields outside our allowed subset (e.g. allowed-tools) fail the build.
const starterSkills = defineCollection({
  loader: glob({
    pattern: "*/*/SKILL.md",
    base: "./src/starter-skills",
    generateId: ({ entry }) => entry.replace(/\/SKILL\.md$/, ""), // "<role>/<skill-name>"
  }),
  schema: z.strictObject({
    name: z
      .string()
      .min(1)
      .max(64)
      .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/),
    description: z.string().min(1).max(1024),
    license: z.string().optional(),
    metadata: z.record(z.string(), z.string()).optional(),
  }),
});

const sourceIds = z.array(z.string().regex(idPattern));

const roles = defineCollection({
  loader: glob({ pattern: "[^_]*.md", base: "./src/content/roles" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    icon: z.enum(ROLE_ICONS),
    summary: z.string().max(220),
    // Skimmable layer: condensed from `summary` / each shift's `aiEra`, never new claims.
    tagline: z.string().max(70),
    lastReviewed: z.coerce.date(),
    sdlcPhases: z.array(z.enum(PHASES)).min(1),
    shifts: z
      .array(
        z.object({
          phase: z.enum(PHASES),
          activity: z.string(),
          headline: z.string().max(80),
          highlight: z.boolean().optional(),
          traditional: z.string(),
          aiEra: z.string(),
          sourceIds: sourceIds.min(1),
        }),
      )
      .min(5)
      .max(8),
    tools: z
      .array(
        z.object({
          tool: reference("tools"),
          useFor: z.string(),
          recommendation: z.enum(["should", "could"]),
          sourceIds: sourceIds.optional(),
        }),
      )
      .min(4)
      .max(8),
    skills: z.object({
      new: z.array(z.string()).min(1),
      amplified: z.array(z.string()).min(1),
      lessImportant: z.array(z.string()).min(1),
    }),
    risks: z
      .array(z.object({ text: z.string(), sourceIds: sourceIds.optional() }))
      .min(2),
    first30Days: z.array(z.string()).optional(),
    agentSkills: z
      .array(z.object({ skill: reference("agentSkills"), useFor: z.string() }))
      .max(3)
      .optional(),
    starterSkills: z.array(z.string().regex(idPattern)).max(3).optional(),
    sources: z
      .array(
        z.object({
          id: z.string().regex(idPattern),
          title: z.string(),
          publisher: z.string(),
          url: z.url(),
          published: z.coerce.date().optional(),
          accessed: z.coerce.date(),
          quote: z.string().optional(),
        }),
      )
      .min(3)
      .max(12),
  }),
});

export const collections = { tools, agentSkills, starterSkills, roles };
