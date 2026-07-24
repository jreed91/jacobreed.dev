## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where user-provided or markdown-sourced `videoUrl` could be rendered directly into `iframe` `src` attributes without protocol validation.
**Learning:** `iframe` `src` attributes do not sanitize content natively and can execute `javascript:` and `data:` URIs, leading to XSS vulnerabilities if an attacker provides a malicious URL.
**Prevention:** Always parse untrusted URLs intended for `iframe` `src` (or external links) using `new URL(url, base)` and validate that the `protocol` is restricted to safe schemes like `http:` and `https:`. Return `about:blank` for invalid protocols.
