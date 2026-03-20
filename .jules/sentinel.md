## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-03-20 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where untrusted user input from MDX frontmatter (`videoUrl`) was used directly as the fallback URL in an `iframe` `src` attribute. If an attacker provided a `javascript:` or `data:` URI, the iframe could execute malicious scripts.
**Learning:** `iframe` `src` attributes are sensitive to XSS just like `a` `href` attributes. Dynamic URLs must be validated to ensure they use safe protocols.
**Prevention:** Always parse untrusted URLs and validate their protocol (`http:` or `https:`). If falling back, allow explicitly safe patterns (e.g., root-relative paths starting with `/`) or default to `about:blank`.
