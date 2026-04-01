## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-31 - [Fix XSS via malicious iframe src in TalkLayout]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` in `app/db/talks.ts` allowing malicious URIs (e.g., `javascript:`, `data:`) in MDX frontmatter to be injected into an `iframe`'s `src` attribute.
**Learning:** Returning user-provided fallback URLs unmodified opens the door to XSS attacks via iframe source injection if the URL protocol is not validated.
**Prevention:** Always validate protocols of fallback URLs (e.g., enforcing `http://`, `https://`, or relative paths starting with `/`) and return a safe fallback like `about:blank` for invalid inputs.
