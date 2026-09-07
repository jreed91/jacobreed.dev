import { getBlogPosts } from 'app/db/blog';
import { getTalks } from 'app/db/talks';
import { getProjects } from 'app/db/projects';

export default async function sitemap() {
  const blogs = getBlogPosts().map((post) => ({
    url: `https://jacobreed.dev/blog/${post.slug}`,
    lastModified: post.metadata.date,
  }));

  const talks = getTalks().map((talk) => ({
    url: `https://jacobreed.dev/talks/${talk.slug}`,
    lastModified: talk.metadata.date,
  }));

  const projects = getProjects().map((project) => ({
    url: `https://jacobreed.dev/projects/${project.slug}`,
    lastModified: project.metadata.date,
  }));

  const routes = ['', '/blog', '/projects', '/talks'].map((route) => ({
    url: `https://jacobreed.dev${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  return [...routes, ...blogs, ...talks, ...projects];
}
