import { describe, it, expect } from 'vitest';
import { safeJsonStringify } from './sanitize';

describe('safeJsonStringify', () => {
  it('escapes <, >, and & characters', () => {
    const data = { html: '<script>alert("XSS & fun")</script>' };
    const result = safeJsonStringify(data);
    expect(result).toBe('{"html":"\\u003cscript\\u003ealert(\\"XSS \\u0026 fun\\")\\u003c/script\\u003e"}');
  });

  it('handles undefined input safely', () => {
    expect(safeJsonStringify(undefined)).toBe('{}');
  });

  it('handles null input safely', () => {
    expect(safeJsonStringify(null)).toBe('null');
  });

  it('handles functions safely (JSON.stringify returns undefined)', () => {
    expect(safeJsonStringify(() => {})).toBe('{}');
  });

  it('handles regular JSON data correctly', () => {
    const data = { name: "Test", count: 123, isTrue: true };
    expect(safeJsonStringify(data)).toBe('{"name":"Test","count":123,"isTrue":true}');
  });
});
