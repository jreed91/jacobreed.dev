## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-05 - XSS Vulnerability in iframe src
**Vulnerability:** Unvalidated external URL input used in `iframe` `src` or anchor `href` attributes could contain `javascript:` or `data:` URIs, potentially leading to Cross-Site Scripting (XSS).
**Learning:** The native `URL` constructor provides robust protocol validation, unlike string matching which can easily be bypassed by whitespace padding (e.g. `   javascript:alert(1)`).
**Prevention:** Always validate all dynamic or external URLs used in `src` or `href` attributes to ensure they use safe protocols (`http:`, `https:`) before rendering, and fallback to safe paths (e.g., `about:blank`).
