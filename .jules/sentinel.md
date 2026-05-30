## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix SSRF/XSS via Iframe Src in Talks]
**Vulnerability:** XSS/SSRF risk in `app/db/talks.ts` where `getYouTubeEmbedUrl` returned the original unvalidated `videoUrl` directly into an `<iframe src={...}>` in `app/components/TalkLayout.tsx` if it wasn't a standard YouTube URL. This allowed malicious payloads like `javascript:alert(1)` or `data:text/html,...` to be injected via MDX frontmatter.
**Learning:** Returning unvalidated fallbacks for embedded resources creates open pathways for executing arbitrary code inside iframes if the source data (e.g. Markdown metadata) becomes compromised.
**Prevention:** Always validate URLs against an explicit allowlist of protocols (`http:`, `https:`, or root-relative paths via empty base handling) using the `URL` constructor before assigning them to sensitive attributes like `src` or `href`.
