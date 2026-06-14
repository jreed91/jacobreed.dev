## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-06-14 - [Fix XSS in getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability via unsafe URIs in the `getYouTubeEmbedUrl` function which could be used as an `iframe` `src` attribute. When MDX frontmatter contained `javascript:` or `data:` URIs for a video url, it was not validated as safe before being output to the frontend.
**Learning:** Never trust string inputs that are used in `src` or `href` attributes. `javascript:` URIs in an iframe `src` can execute arbitrary code in the user's browser in the context of the current domain.
**Prevention:** Validate protocols via `new URL(url, base)` prior to passing them through to UI elements. Reject `javascript:`, `data:`, `vbscript:`, and other unsafe schemes. Return safe fallbacks like `about:blank`.
