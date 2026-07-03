/**
 * Safely stringifies JSON to prevent XSS attacks when embedded in HTML <script> tags.
 * Replaces <, >, and & with their unicode escape sequences.
 */
export function safeJsonStringify(data: unknown): string {
  const stringified = JSON.stringify(data);
  // Security enhancement: Prevent TypeError DoS crashes if data is undefined or functions
  if (!stringified) return 'null';

  return stringified
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
