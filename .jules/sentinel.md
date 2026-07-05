## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2024-05-15 - XSS Vulnerability in iframe src
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` returned the raw `videoUrl` if it wasn't a YouTube URL, which was then directly embedded into an `iframe`'s `src` attribute in `app/components/TalkLayout.tsx`. This allowed execution of arbitrary code via `javascript:` or `data:` URIs.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. Dynamic `iframe` `src` values need explicit protocol validation to prevent Cross-Site Scripting (XSS).
**Prevention:** Always validate protocols (e.g., ensuring `http:` or `https:`) of external URLs using the native `URL` constructor before injection to prevent XSS vulnerabilities from `javascript:` or `data:` URIs.
