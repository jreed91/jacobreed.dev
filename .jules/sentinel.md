## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-24 - [Fix Stored XSS via URL missing proper protocol validation]
**Vulnerability:** XSS/SSRF via unsanitized or poorly sanitized URL parameters in YouTube embed logic.
**Learning:** Returning unvalidated input (e.g. `javascript:alert(1)`) into an `iframe src` allows for XSS when the fallback is used.
**Prevention:** Validate protocols using the `new URL()` API and only allow `http:` or `https:`, falling back safely.
