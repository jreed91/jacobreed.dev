## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS/SSRF vulnerability where frontmatter data (such as `videoUrl` in talks) could contain arbitrary protocols (`javascript:`, `data:`, `vbscript:`, `file:`) and was directly bound to the `src` attribute of an `iframe`.
**Learning:** `iframe` `src` attributes without protocol validation allow executing JavaScript or accessing local resources if an attacker modifies the input metadata. Next.js/React does not sanitize URI protocols for `src` by default.
**Prevention:** Validate protocols and ensure the provided URL starts with HTTP, HTTPS, or a safe local path. If the URL contains an unsafe protocol or is an empty string, always return `'about:blank'`.
