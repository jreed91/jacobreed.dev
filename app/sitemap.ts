import { getBlogPosts } from 'app/db/blog';
import { getTalks } from 'app/db/talks';

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://jacobreed.dev/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  const talks = getTalks().map((talk) => ({
    url: `https://jacobreed.dev/talks/${talk.slug}`,
    lastModified: talk.metadata.date,
  }));

  const routes = ['', '/blog', '/projects', '/talks'].map((route) => ({
    url: `https://jacobreed.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...talks];
}
