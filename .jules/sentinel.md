## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS in getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would blindly return an unmatched URL. If a user provided a `javascript:` or `data:` URL as the `videoUrl` in MDX frontmatter, it would be injected directly into the `src` attribute of the `iframe` in `TalkLayout`.
**Learning:** Always validate that URLs used in sensitive attributes like `iframe src` or `a href` start with safe protocols (`http://`, `https://`, or `/`).
**Prevention:** Implement an allowlist approach for URL protocols when falling back to user-provided input.
