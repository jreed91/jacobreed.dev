## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe SSRF / XSS in TalkLayout]
**Vulnerability:** XSS vulnerability where `videoUrl` read from markdown frontmatter could be an unsafe URI (like `javascript:alert(1)`) and gets injected directly into the `src` attribute of an `iframe` component via `getYouTubeEmbedUrl` in `TalkLayout.tsx`.
**Learning:** React/Next.js assumes strings inside iframe `src` are safe as long as they are plain strings. Unvalidated markdown frontmatter values bypass normal react safety checks.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor before setting them as an iframe `src` to ensure they are `http:` or `https:`, returning a safe default like `about:blank` for invalid protocols.
