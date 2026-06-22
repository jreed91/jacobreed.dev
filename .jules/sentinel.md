## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-05 - [Fix iframe src XSS via videoUrl]
**Vulnerability:** XSS vulnerability where user-provided `videoUrl` from frontmatter was passed directly into an `iframe`'s `src` attribute without validating the URL protocol in `app/components/TalkLayout.tsx` (via `getYouTubeEmbedUrl`).
**Learning:** Next.js and React do not natively sanitize `iframe` `src` attributes. Attackers can provide a malicious URI like `javascript:alert(1)` which executes directly when the iframe loads.
**Prevention:** Always validate protocols using the native `URL` constructor to enforce `http:` or `https:`, returning a safe fallback like `about:blank` for invalid or unsafe protocols.
