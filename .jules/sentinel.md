## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS via unsafe iframe src]
**Vulnerability:** XSS vulnerability where non-YouTube URLs from `videoUrl` in talk frontmatter were passed directly to an `iframe`'s `src` attribute. If an attacker injects `javascript:alert(1)` into the `videoUrl`, it executes within the application when viewed.
**Learning:** `iframe` `src` attributes are susceptible to `javascript:` and `data:` URI attacks. Any dynamic content placed into an `iframe src` must be validated to ensure it uses a safe protocol (e.g., `http://`, `https://`) or is a relative path.
**Prevention:** Sanitize dynamically generated or user-provided fallback URLs used in `iframe src` by enforcing protocol whitelists (only allowing `http://`, `https://`, or `/`) and falling back to `about:blank`.
