import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type posts = CollectionEntry<'posts'>;

export const sortedBlogPosts: posts[] = (await getCollection('posts')).sort(
  (a, b) =>
    Date.parse(b.data.pubDate.toString()) -
    Date.parse(a.data.pubDate.toString())
);
