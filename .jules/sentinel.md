## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via javascript: URLs]
**Vulnerability:** XSS vulnerability where unvalidated `videoUrl` values from MDX frontmatter are passed directly to `iframe` `src` attributes in `app/components/TalkLayout.tsx` via `getYouTubeEmbedUrl`.
**Learning:** React does not natively sanitize strings passed to `iframe` `src` attributes. External URLs or fallback paths must have their protocols strictly validated to prevent execution of `javascript:` or `data:` URIs.
**Prevention:** Always validate URL protocols using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) before injecting them into `iframe` `src` attributes or user-provided links to ensure they are safe protocols like `http:` or `https:`.
