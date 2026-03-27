## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS in YouTube Embed Fallback]
**Vulnerability:** XSS vulnerability where unsanitized frontmatter metadata `videoUrl` was used directly in the `iframe` `src` attribute in `app/components/TalkLayout.tsx`.
**Learning:** React/Next.js assumes URLs passed to `iframe` `src` attributes are safe. If the URL is `javascript:alert(1)` or `data:text/html,...`, it can execute arbitrary JavaScript. The vulnerability exists when relying on user-provided metadata directly as fallbacks without URL protocol validation.
**Prevention:** Always validate protocols for URLs passed to attributes like `src` or `href` to ensure they only use safe protocols (`http://`, `https://`) or are root-relative (`/`). For `iframe` fallbacks, return `about:blank` for unsafe URIs.
