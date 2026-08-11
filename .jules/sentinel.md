## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-03 - [Fix Stored XSS in Link Interpolations]
**Vulnerability:** File-derived variables like `talk.slug` and `blog.slug` were directly interpolated into Next.js `<Link href={...}>` and other URLs without sanitization, posing a Stored XSS risk.
**Learning:** Even file-derived content used in Next.js internal links can trigger Stored XSS warnings by security analyzers like CodeQL if not explicitly sanitized, because the source of truth could theoretically be manipulated.
**Prevention:** Sanitize variables that don't represent absolute paths or URLs (like slugs) using `encodeURIComponent()` when interpolating them into links.
