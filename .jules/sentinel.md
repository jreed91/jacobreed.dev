## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in Talk Layouts]
**Vulnerability:** XSS vulnerability where unvalidated `videoUrl` values from MDX frontmatter were used directly in `iframe` `src` attributes in `app/components/TalkLayout.tsx` via `getYouTubeEmbedUrl`.
**Learning:** `iframe` `src` attributes can execute Javascript if given `javascript:` URIs. Regular expressions or simple string checks can be bypassed by whitespace padding.
**Prevention:** Use the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to reliably extract and validate the `.protocol` property against `http:` and `https:`, returning `about:blank` for invalid URLs.
