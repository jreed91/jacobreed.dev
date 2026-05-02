## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via unsafe URIs]
**Vulnerability:** The `iframe` `src` attribute in `TalkLayout.tsx` was vulnerable to XSS if `videoUrl` in the MDX frontmatter contained an unsafe URI protocol (e.g., `javascript:` or `data:`). Since `getYouTubeEmbedUrl` returned non-YouTube URLs unchanged, these URIs were injected directly into the DOM.
**Learning:** React prevents XSS in standard element content but DOES NOT prevent XSS in `iframe` `src` or `a` `href` attributes if the provided URL uses `javascript:`. String filtering or Regex for this is often bypassable via whitespace (`   javascript:`).
**Prevention:** Always validate URL protocols using the native `URL` constructor (e.g., `new URL(videoUrl, 'http://localhost')`) and strictly allow only secure protocols (`http:`, `https:`) or specific root-relative paths. If validation fails, safely fallback to `about:blank`.
