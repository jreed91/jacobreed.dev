## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-27 - [Fix XSS vulnerability via unsafe iframe src]
**Vulnerability:** XSS vulnerability where untrusted URLs from MDX metadata could be used in an iframe `src` attribute (e.g. `javascript:alert(1)`) leading to script execution within the context of the iframe.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. Regular expressions for YouTube validation will safely block invalid URLs, but if they fall back to using the string directly, dangerous schemas like `javascript:` and `data:` can bypass the check and execute code.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to reliably check the `.protocol` property, ensuring it strictly matches `http:` or `https:`.
