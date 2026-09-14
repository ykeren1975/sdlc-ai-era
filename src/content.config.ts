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

const sourceIds = z.array(z.string().regex(idPattern));

const roles = defineCollection({
  loader: glob({ pattern: "[^_]*.md", base: "./src/content/roles" }),
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    icon: z.enum(ROLE_ICONS),
    summary: z.string().max(220),
    lastReviewed: z.coerce.date(),
    sdlcPhases: z.array(z.enum(PHASES)).min(1),
    shifts: z
      .array(
        z.object({
          phase: z.enum(PHASES),
          activity: z.string(),
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

export const collections = { tools, roles };
