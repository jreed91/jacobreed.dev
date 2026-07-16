## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-28 - XSS vulnerability in iframe src
**Vulnerability:** XSS vulnerability where user-provided `videoUrl` variables embedded in dynamic `iframe` `src` attributes allowed execution of `javascript:` or `data:` URIs.
**Learning:** Next.js and React do not natively sanitize strings passed to `iframe` `src` attributes. A malicious user or frontmatter author could embed arbitrary javascript URIs into `videoUrl` and bypass typical XSS protections since `iframe` allows executing embedded protocols.
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
