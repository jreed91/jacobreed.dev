## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-18 - [Fix XSS in getYouTubeEmbedUrl]
**Vulnerability:** Unvalidated protocols in Markdown frontmatter `videoUrl` allowed `javascript:` and `data:` URIs to be injected into `<iframe src={...}>`.
**Learning:** `iframe` `src` attributes are naturally vulnerable to XSS if the URL protocol is unvalidated. Next.js does not sanitize string input into `iframe` properties automatically.
**Prevention:** Always validate URL protocols using the native `URL` constructor (e.g. `new URL(url, 'http://localhost')`) before injecting user-provided links into DOM attributes. Ensure it matches `http:` or `https:`.
