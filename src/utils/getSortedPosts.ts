import { getCollection, type CollectionEntry } from 'astro:content';

type posts = CollectionEntry<'posts'>[];

export const sortedBlogPosts: posts = (await getCollection('posts')).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
