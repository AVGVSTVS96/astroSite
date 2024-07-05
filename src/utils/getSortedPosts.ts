import { getCollection, type CollectionEntry } from 'astro:content';

type Posts = CollectionEntry<'posts'>[];

export const sortedBlogPosts: Posts = (await getCollection('posts')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
