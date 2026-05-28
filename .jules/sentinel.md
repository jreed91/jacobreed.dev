## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS in TalkLayout]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would return malicious payloads like `javascript:alert(1)` unchanged if they did not match the YouTube regex, leading to XSS when rendered in the `<iframe>` `src` attribute within `app/components/TalkLayout.tsx`.
**Learning:** `<iframe>` src attributes are a common XSS vector if arbitrary URLs from untrusted sources (like MDX frontmatter) are allowed. `javascript:` or `data:` URIs execute script within the context of the page if no sandboxing is implemented.
**Prevention:** Always validate external URL inputs for iframe src attributes. Check if the parsed URL protocol strictly matches `http:` or `https:`, and fall back to `about:blank` otherwise.
