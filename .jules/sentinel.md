## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-15 - [Preventing iframe SSRF and XSS]
**Vulnerability:** External URLs passed into `iframe` `src` attributes without validation allow XSS (via `javascript:` or `data:`) or internal scanning.
**Learning:** Checking for YouTube URLs is not enough if a fallback just uses the raw URL. Native `URL` object allows safe protocol parsing and empty string handling (which relative routes map to `http:` protocol) to validate safe links effectively.
**Prevention:** Always validate protocols (restrict to `http:` or `https:`) using the `URL` constructor (e.g. `new URL(url, 'http://localhost')`) when placing user-controlled strings into `src` attributes, falling back to safe defaults like `'about:blank'`.
