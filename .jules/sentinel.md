## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Stored XSS via MDX Slug Interpolation]
**Vulnerability:** Slugs extracted from MDX files were directly interpolated into URL paths (e.g., `<Link href={'/blog/' + slug}>` or `editUrl`) without sanitization in `TalkCard.tsx`, `BlogPostCard.tsx`, `BlogPost.tsx`, and `BlogLayout.tsx`. If a maliciously crafted slug containing unexpected characters or path traversal sequences were to be processed, it could lead to Stored XSS or broken links.
**Learning:** File-derived variables, even those assumed to be safe like filenames or slugs, must be treated as untrusted user input when injected into URLs, attributes, or HTML contexts. CodeQL checks flag these direct interpolations as potential XSS vulnerabilities.
**Prevention:** Always sanitize dynamic URL segments using `encodeURIComponent()` (e.g., `/blog/${encodeURIComponent(slug)}`) to ensure any special characters are safely URL-encoded before being rendered into `href` attributes.
