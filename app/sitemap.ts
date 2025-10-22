import { getBlogPosts } from 'app/db/blog';

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://jacobreed.dev/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  const routes = ['', '/blog', '/case-studies'].map((route) => ({
    url: `https://jacobreed.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs];
}
