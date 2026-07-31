## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where unvalidated user input was used in an iframe `src` attribute. `getYouTubeEmbedUrl` returned unmodified URLs.
**Learning:** React does not sanitize strings passed to `iframe` `src` attributes. A malicious user could use `javascript:` or `data:` URIs to execute arbitrary code.
**Prevention:** Always validate URL protocols using the native `URL` constructor before injecting them into `iframe` `src` or external links, ensuring they are `http:` or `https:` or safe relative paths.
