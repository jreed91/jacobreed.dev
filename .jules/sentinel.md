## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2023-10-25 - [Fix XSS in getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would return malicious `javascript:` or `data:` URIs which are then rendered into an `iframe src` attribute in `TalkLayout`.
**Learning:** React does not natively sanitize strings passed to `iframe src` attributes. Always validate protocols of external URLs using the native `URL` constructor before injection.
**Prevention:** Explicitly check the `.protocol` property of the parsed URL to ensure it is `http:` or `https:` and safely fall back to an empty string.
