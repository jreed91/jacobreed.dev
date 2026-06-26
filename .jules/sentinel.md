## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS via Unsafe Protocols]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` (`app/db/talks.ts`) where unrecognized external links fell back to returning the raw string. This could allow execution of `javascript:` or `data:` URIs if injected into the `src` attribute of an iframe.
**Learning:** Next.js and React do not natively sanitize or block `javascript:` URIs passed dynamically to iframe `src` or standard anchor `href` tags.
**Prevention:** Always validate external URL protocols using the native `URL` constructor (which reliably normalizes padded strings) to ensure they are `http:` or `https:` before rendering them into HTML attributes. Default unsafe paths to `about:blank`.
