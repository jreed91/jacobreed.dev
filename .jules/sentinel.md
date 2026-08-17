## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Stored XSS via Dynamic Link URLs]
**Vulnerability:** Next.js `<Link>` and `<a>` components constructed `href` attributes directly using unsanitized user-provided (or file-derived) dynamic slugs (e.g., `<Link href={`/blog/${slug}`}>`).
**Learning:** React escapes content inside tags by default but does NOT automatically sanitize or URL-encode interpolated string values used within `href` or `src` attributes. An attacker providing a malicious string like `javascript:alert(1)` or strings with unencoded quotes could break out of the URL context or trigger script execution if the attribute is rendered directly.
**Prevention:** Always wrap dynamically interpolated route parameters or identifiers with `encodeURIComponent()` when constructing URLs for attributes to ensure valid URL encoding and neutralize executable prefixes.
