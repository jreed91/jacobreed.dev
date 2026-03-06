## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-05 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability via unsafe URI scheme in `iframe` `src` attribute.
**Learning:** Unvalidated strings passed to `iframe` `src` attributes can be exploited if they contain `javascript:` or `data:` URIs. The `getYouTubeEmbedUrl` function returned the raw input if it wasn't a matching YouTube URL.
**Prevention:** Always validate and sanitize URLs before passing them to sensitive DOM sinks like `iframe.src`, `a.href`, or `form.action`. Ensure they start with safe protocols like `http://` or `https://`.
