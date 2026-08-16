## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS]
**Vulnerability:** XSS vulnerability in `TalkLayout.tsx` where an untrusted markdown frontmatter value (`videoUrl`) was directly bound to an `iframe`'s `src` attribute.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes, making them vulnerable to `javascript:` or `data:` URIs.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g., ensuring `http:` or `https:`) before using them in `iframe` `src` or `a` `href` attributes to prevent XSS.
