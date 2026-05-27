## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix SSRF/XSS in iframe src fallback]
**Vulnerability:** XSS and SSRF vulnerability in `getYouTubeEmbedUrl` where unvalidated external URLs (like `javascript:alert(1)` or `data:text/html,...`) were returned as a fallback and directly injected into `iframe` `src` attributes.
**Learning:** Returning unvalidated input strings directly into HTML attributes (even as fallbacks when a primary regex fails) is dangerous. If attackers can control the input string, they can inject malicious URL protocols.
**Prevention:** Always parse and validate fallback URLs using `new URL()` to enforce a safe protocol allowlist (e.g., `http:` and `https:`) before rendering them in `src` or `href` attributes. Fall back to a safe neutral value like `about:blank` for invalid protocols.
