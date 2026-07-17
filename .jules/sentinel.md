## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-24 - SSRF/XSS via Unsanitized iframe src
**Vulnerability:** `getYouTubeEmbedUrl` in `app/db/talks.ts` returned unvalidated strings for non-YouTube URLs. This was passed directly into an `iframe` `src` attribute in `app/components/TalkLayout.tsx`, allowing attackers to supply `javascript:` or `data:` URIs and execute arbitrary scripts or load malicious content if `talk.metadata.videoUrl` is controlled by them.
**Learning:** React does not inherently validate URL protocols passed to `iframe` `src` (or similar attributes like `href`), meaning `javascript:` URIs can be used for XSS.
**Prevention:** Always validate and enforce safe protocols (`http:`, `https:`) or allow controlled local paths for user-provided URLs that are dynamically injected into `src` or `href` attributes. Fallback to `about:blank` for invalid inputs. Use the native `URL` constructor to reliably parse protocols.
