import { describe, it, expect } from 'vitest';
import { GET } from './route';

describe('GET /api/projects', () => {
  it('returns a 200 response', async () => {
    const response = await GET();
    expect(response.status).toBe(200);
  });

  it('response body is valid JSON', async () => {
    const response = await GET();
    const text = await response.text();
    expect(() => JSON.parse(text)).not.toThrow();
  });

  it('returns an array of projects', async () => {
    const response = await GET();
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('each project has the required shape', async () => {
    const response = await GET();
    const projects = await response.json();
    projects.forEach((project: unknown) => {
      expect(project).toHaveProperty('slug');
      expect(project).toHaveProperty('name');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('image');

      const p = project as Record<string, unknown>;
      expect(typeof p.slug).toBe('string');
      expect(typeof p.name).toBe('string');
      expect(typeof p.description).toBe('string');
      expect(typeof p.image).toBe('string');
    });
  });

  it('project slugs are unique', async () => {
    const response = await GET();
    const projects: { slug: string }[] = await response.json();
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});
