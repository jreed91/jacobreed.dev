## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-08-15 - [XSS via Missing URL Encoding in Link Hrefs]
**Vulnerability:** File-derived variables like `talk.slug` and `blog.slug` were directly interpolated into Next.js `<Link href={...}>` and external URLs without URL encoding. This could allow for Stored Cross-Site Scripting (XSS) if a malicious slug contains characters like quotes or brackets.
**Learning:** Always sanitize user-controllable or file-derived variables (like slugs) using `encodeURIComponent()` when constructing URLs or paths, as these variables can bypass normal text sanitization if placed within URL contexts.
**Prevention:** Use `encodeURIComponent(slug)` whenever dynamically creating `href` or `src` attributes with variables. Avoid blindly applying it to variables meant to hold full URLs or paths with slashes.
