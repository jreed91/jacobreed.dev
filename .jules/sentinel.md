## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix XSS in getYouTubeEmbedUrl]
**Vulnerability:** The `getYouTubeEmbedUrl` function returned non-YouTube URLs exactly as provided. This allowed MDX frontmatter to specify a `videoUrl` with a `javascript:` or `data:` protocol, which would be directly injected into an iframe `src` in `TalkLayout.tsx`, leading to XSS.
**Learning:** React does not automatically sanitize `iframe` `src` attributes for dangerous protocols. External links coming from user data or content files need explicit protocol validation to prevent `javascript:` and `data:` URIs.
**Prevention:** Always parse untrusted URLs using the `new URL(url, base)` constructor and validate that the `.protocol` property is `http:` or `https:`. If it is invalid, fallback to an empty string or `about:blank`.
