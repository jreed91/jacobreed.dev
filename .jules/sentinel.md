## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix iframe XSS]
**Vulnerability:** XSS/SSRF vulnerability where a fallback `videoUrl` in `getYouTubeEmbedUrl` was inserted into an `iframe` `src` attribute without verifying the protocol, allowing execution of arbitrary code via `javascript:` or `data:` URLs.
**Learning:** Even internal content from MDX frontmatter can be treated as a vulnerability vector. Dynamically generated `iframe` `src` attributes must validate the URL protocol using the native `URL` constructor to protect against XSS/SSRF vulnerabilities.
**Prevention:** Always validate protocols using `new URL(url, base)` instead of regex or `startsWith`, and provide a safe default like `about:blank` for unsafe inputs.
