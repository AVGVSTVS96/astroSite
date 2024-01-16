import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    url: z.string().url(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
