## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via Unsafe URIs]
**Vulnerability:** XSS vulnerability where `iframe` `src` attribute derived from external user-provided or markdown metadata was not validated against unsafe URI protocols (like `javascript:` or `data:`). Empty spaces preceding the protocol could bypass simple string checks.
**Learning:** `iframe src` can execute XSS if it resolves to a `javascript:` or `data:` protocol. Never assume markdown metadata is inherently safe. Always validate protocols robustly using the native `URL` constructor (`new URL(url, base)`) and strictly allowlist safe protocols like `http:` and `https:`.
**Prevention:** Use `new URL(url, 'http://localhost')` to parse incoming URLs, checking `.protocol` for `http:` or `https:`, and fallback to a safe path or `about:blank` on failure or unsafe matches. Empty string URLs safely resolve to `http:` due to the base URL and can return the original empty string or be handled appropriately.
