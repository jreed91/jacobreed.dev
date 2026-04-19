## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-10-24 - [XSS via Unsafe iframe src]
**Vulnerability:** The `TalkLayout` component renders an `iframe` with a `src` derived from `talk.metadata.videoUrl`. The `getYouTubeEmbedUrl` function did not validate the URL protocol, allowing execution of XSS payloads if an unsafe URL like `javascript:alert(1)` was provided in the MDX frontmatter.
**Learning:** Returning a raw string directly to an `iframe src` attribute allows `javascript:` execution. If a URL doesn't match an expected trusted format (like YouTube domains), its protocol must be verified before rendering.
**Prevention:** Use the native `URL` constructor to validate that the `.protocol` is safe (`http:`, `https:`). If unsafe, fallback to `about:blank`.
