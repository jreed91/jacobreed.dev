## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-03-21 - [XSS via iframe src in Talks]
**Vulnerability:** XSS vulnerability through `javascript:` or `data:` URIs in the `iframe` `src` attribute. This was possible because the `getYouTubeEmbedUrl` function returned non-YouTube URLs exactly as provided.
**Learning:** Returning user-controlled URLs as-is into `iframe` `src` (or similar active attributes) can allow arbitrary JavaScript execution if the input is a malicious URI like `javascript:alert(1)`.
**Prevention:** Always parse and validate URL protocols (`http:` or `https:`) before injecting them into HTML attributes such as `src` or `href`. For internal/relative routes, explicitly verify they begin with `/`.
