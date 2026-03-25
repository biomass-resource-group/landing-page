import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    publishedAt: z.date(),
    category: z.string(),
    audience: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  updates,
};
