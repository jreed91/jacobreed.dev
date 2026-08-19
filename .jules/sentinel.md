## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS]
**Vulnerability:** XSS vulnerability where untrusted URLs from MDX frontmatter (`videoUrl`) were injected directly into an `iframe` `src` attribute.
**Learning:** React/Next.js do not natively sanitize strings passed to `iframe` `src` attributes. A malicious user could provide a `javascript:` or `data:` URI which executes arbitrary code.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g. `new URL(url, 'http://localhost')`) before injection to ensure they are `http:` or `https:`.
