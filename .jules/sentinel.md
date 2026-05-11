## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Stored XSS in Link Components and iframe]
**Vulnerability:** XSS vulnerability where unsafe URIs like `javascript:` and `data:` could be injected into `iframe` `src` attributes, and dynamically generated slugs interpolated into Next.js `<Link href={...}>` paths without URL encoding (satisfying CodeQL prevention of stored cross-site scripting).
**Learning:** Always validate protocols for externally sourced URLs or use `new URL(url, base)` to reliably extract the protocol. When interpolating user-controlled data into `href` paths, `encodeURIComponent()` is necessary to prevent injection.
**Prevention:** Use `encodeURIComponent()` for dynamically generated paths in `Link` components. Parse and validate `URL` objects for custom attributes like `iframe` `src` to enforce `http:` or `https:` protocols.
