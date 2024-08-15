import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    package: z.boolean().optional(),
    url: z.string().url(),
  }),
});

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string(),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects: projectsCollection,
  posts: postsCollection,
};
