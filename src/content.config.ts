import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    legacyPath: z.string().optional(),
    teaser: z.string().optional(),
  }),
});

const works = defineCollection({
  loader: file("src/data/works.yaml"),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    periodStart: z.string(),
    periodEnd: z.string().optional(),
    website: z.string().url().optional(),
    logoText: z.string(),
    bullets: z.array(z.string()),
    current: z.boolean().default(false),
  }),
});

const publications = defineCollection({
  loader: file("src/data/publications.yaml"),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    date: z.string(),
    url: z.string().url().optional(),
    bullets: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, works, publications };
