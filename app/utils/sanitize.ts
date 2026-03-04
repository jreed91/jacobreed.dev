/**
 * Safely stringifies JSON to prevent XSS attacks when embedded in HTML <script> tags.
 * Replaces <, >, and & with their unicode escape sequences.
 */
export function safeJsonStringify(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}
