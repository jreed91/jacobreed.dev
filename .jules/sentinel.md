## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS via Untrusted URLs]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would return untrusted, unsanitized input URLs (like `javascript:` or `data:`) when rendering an `iframe`'s `src` attribute in `TalkLayout`.
**Learning:** Returning unvalidated fallback URLs for `iframe` sources is dangerous, even if the primary use-case is a YouTube embed. Attackers could supply malicious payloads via MDX frontmatter that execute when the component mounts the iframe.
**Prevention:** Always validate protocols of dynamically-provided URLs for `iframe` tags. Use the native `URL` constructor to enforce `http:` or `https:` protocols, or fallback to a safe default like `about:blank` or a relative path.
