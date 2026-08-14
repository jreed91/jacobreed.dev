## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS vulnerability in `app/components/TalkLayout.tsx` where an unfiltered `talk.metadata.videoUrl` fallback from `getYouTubeEmbedUrl` could render `javascript:` or `data:` URIs directly into an `<iframe src="...">` attribute.
**Learning:** Next.js and React do not natively sanitize strings passed to `iframe` `src` attributes. A malicious payload in MDX frontmatter could execute arbitrary code in the user's browser.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g., ensuring `http:` or `https:`) before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
