## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-05-23 - [HIGH] Fix XSS/SSRF vulnerability in YouTube iframe fallback
**Vulnerability:** XSS/SSRF vulnerability in `app/db/talks.ts` where the `getYouTubeEmbedUrl` fallback returned unvalidated user input (the original `videoUrl`), which could contain dangerous protocols like `javascript:` or `data:`, allowing XSS within the `iframe src`.
**Learning:** If an application falls back to rendering raw user-provided URLs in `iframe` or `a` tags when a specific platform match (like YouTube) fails, those fallback URLs must be validated for safe protocols (`http`, `https`) to prevent XSS/SSRF.
**Prevention:** Always parse and validate dynamically generated or fallback URLs using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to ensure they use safe protocols before embedding them in HTML attributes.
