## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix MDX Frontmatter VideoUrl XSS]
**Vulnerability:** XSS vulnerability where untrusted `videoUrl` strings from MDX frontmatter were directly injected into `<iframe> src` attributes via `getYouTubeEmbedUrl` in `app/db/talks.ts`.
**Learning:** If a URL failed a strict YouTube regex check, it was blindly returned as a fallback string. This allowed malicious `javascript:alert(1)` or `data:` URIs placed inside MDX frontmatter to bypass protections and trigger JavaScript execution when a user loads a Talk page.
**Prevention:** Always validate external URL inputs using the `URL` constructor or protocol checks. Ensure fallback URLs start with `http://`, `https://`, or `/`, and reject insecure protocols like `javascript:` and `data:`. Use `about:blank` as a safe fallback when URL parsing fails or protocols are invalid.
