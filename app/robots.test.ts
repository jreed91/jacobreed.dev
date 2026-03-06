import { describe, it, expect } from 'vitest';
import robots from './robots';

describe('robots', () => {
  it('returns a rules array', () => {
    const result = robots();
    expect(Array.isArray(result.rules)).toBe(true);
    expect(result.rules.length).toBeGreaterThan(0);
  });

  it('allows all user agents to crawl /', () => {
    const result = robots();
    const rule = result.rules.find((r) => r.userAgent === '*');
    expect(rule).toBeDefined();
    expect(rule!.allow).toBe('/');
  });

  it('includes the sitemap URL', () => {
    const result = robots();
    expect(result.sitemap).toBe('https://jacobreed.dev/sitemap.xml');
  });
});
