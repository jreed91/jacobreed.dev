## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix Iframe XSS]
**Vulnerability:** XSS vulnerability where user-provided or external URLs could be injected into `iframe` `src` attributes without protocol validation, allowing `javascript:` URIs.
**Learning:** React does not natively sanitize `iframe` `src` attributes. Relying on simple regex or blindly trusting frontmatter URLs leaves the application open to XSS.
**Prevention:** Always validate external URL protocols using the native `URL` constructor, ensuring only `http:` or `https:` are permitted, and fallback to `about:blank` or safe relative paths.
