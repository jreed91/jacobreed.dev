## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-04-02 - [Iframe SRC XSS Prevention]
**Vulnerability:** XSS vulnerability through iframe `src` attributes where an attacker could provide `javascript:` or `data:` URLs via MDX frontmatter (e.g., `videoUrl` fallback in `getYouTubeEmbedUrl`).
**Learning:** Iframes and links directly sourced from markdown frontmatter are not automatically sanitized by React. Unsafe protocols can execute arbitrary JavaScript in the context of the user's browser.
**Prevention:** Enforce strict allowlists for protocols (e.g., `http://`, `https://`, or root-relative `/`). Fallback to `about:blank` if the source does not conform to safe protocols.
