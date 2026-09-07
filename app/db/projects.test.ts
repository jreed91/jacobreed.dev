import { describe, it, expect } from 'vitest';
import { getProjects, techTags } from './projects';

describe('getProjects', () => {
  it('loads every project in content/projects', () => {
    expect(getProjects().length).toBe(4);
  });

  it('gives each project a slug taken from its filename', () => {
    const slugs = getProjects().map((p) => p.slug).sort();
    expect(slugs).toEqual(['agentbar', 'groceries', 'hinterland', 'stride']);
  });

  it('parses the frontmatter every project page renders', () => {
    getProjects().forEach((project) => {
      expect(project.metadata.title).toBeTruthy();
      expect(project.metadata.summary).toBeTruthy();
      expect(project.metadata.date).toBeTruthy();
    });
  });

  it('strips the frontmatter block out of the content', () => {
    getProjects().forEach((project) => {
      expect(project.content).not.toContain('---');
      expect(project.content.length).toBeGreaterThan(0);
    });
  });

  it('sorts newest first', () => {
    const dates = getProjects().map((p) => Number(new Date(p.metadata.date)));
    const sorted = [...dates].sort((a, b) => b - a);
    expect(dates).toEqual(sorted);
  });

  it('references screenshots that exist in public/', async () => {
    const fs = await import('fs');
    const path = await import('path');
    const srcs = getProjects().flatMap((project) =>
      [...project.content.matchAll(/src="(\/static\/[^"]+)"/g)].map((m) => m[1])
    );

    expect(srcs.length).toBeGreaterThan(0);
    srcs.forEach((src) => {
      expect(fs.existsSync(path.join(process.cwd(), 'public', src))).toBe(true);
    });
  });
});

describe('techTags', () => {
  it('splits the comma-separated tech frontmatter', () => {
    const project = getProjects().find((p) => p.slug === 'agentbar')!;
    expect(techTags(project)).toContain('Swift');
    expect(techTags(project).length).toBeGreaterThan(1);
  });

  it('returns an empty array when tech is absent', () => {
    const project = {
      slug: 'x',
      content: '',
      metadata: { title: 'x', date: '2026-01-01', summary: 'x' },
    };
    expect(techTags(project)).toEqual([]);
  });

  it('drops empty entries from a trailing comma', () => {
    const project = {
      slug: 'x',
      content: '',
      metadata: { title: 'x', date: '2026-01-01', summary: 'x', tech: 'Swift, , SwiftUI,' },
    };
    expect(techTags(project)).toEqual(['Swift', 'SwiftUI']);
  });
});
