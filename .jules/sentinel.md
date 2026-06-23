## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS via Invalid Protocol]
**Vulnerability:** XSS/SSRF vulnerability where user-supplied fallback URLs (e.g., `videoUrl` in MDX frontmatter) were directly injected into `<iframe>` `src` attributes without protocol validation if they didn't match the standard YouTube regex. This allowed injection of `javascript:` or `data:` URIs.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. Regex checks can often be bypassed by padding (e.g. ` javascript:alert(1)`).
**Prevention:** Always use the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to reliably parse and validate the `.protocol` property (e.g., ensuring `http:` or `https:`) before rendering external links or dynamic iframe sources.
