## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via SSRF in Talks]
**Vulnerability:** XSS vulnerability where untrusted URLs provided in MDX frontmatter (`videoUrl`) were placed into an `iframe`'s `src` attribute without sanitization. An attacker could provide a malicious `javascript:` or `data:` URI which would be executed when the iframe loads.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. A regex check for youtube urls was present but allowed any other url to be returned unchanged, leading to the vulnerability.
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs. Empty URLs or relative paths can be supported but must be evaluated properly.
