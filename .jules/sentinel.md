## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-27 - [XSS via javascript: URIs in getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability in dynamically generated iframe src attributes where unsanitized user input (via MDX frontmatter) could contain javascript: or data: URIs, leading to execution of arbitrary scripts.
**Learning:** React/Next.js iframe src attributes are not natively sanitized against unsafe protocols. A fallback URL in getYouTubeEmbedUrl allowed arbitrary URIs.
**Prevention:** Always validate URL protocols for dynamic iframe src attributes or external links sourced from user input. Use the native URL constructor (e.g., new URL(url, 'http://localhost')) to parse and verify the protocol.

## 2025-02-27 - [TypeError DoS via JSON.stringify in safeJsonStringify]
**Vulnerability:** A DoS vulnerability where passing undefined (or unstringifiable values like functions) to safeJsonStringify resulted in JSON.stringify returning undefined, causing a TypeError when .replace() was subsequently called.
**Learning:** JSON.stringify can return undefined. Blindly chaining methods on its output can cause application crashes (Denial of Service).
**Prevention:** Explicitly check if the result of JSON.stringify is truthy (or specifically undefined) before performing operations like .replace().
