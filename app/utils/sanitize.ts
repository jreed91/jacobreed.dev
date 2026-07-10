/**
 * Safely stringifies JSON to prevent XSS attacks when embedded in HTML <script> tags.
 * Replaces <, >, and & with their unicode escape sequences.
 */
export function safeJsonStringify(data: unknown): string {
  const json = JSON.stringify(data);
  if (json === undefined) {
    return 'null';
  }
  return json
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\//g, '\\u002f')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
