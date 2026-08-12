## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-03-04 - [Fix XSS in iframe src]
**Vulnerability:** XSS vulnerability where user-provided or markdown-sourced `videoUrl` was injected directly into an `iframe` `src` attribute without protocol validation, allowing `javascript:` URIs.
**Learning:** React does not natively sanitize the `src` attribute of `iframe` elements. Any data source (including MDX frontmatter) that populates an `iframe` `src` could trigger script execution if it contains a `javascript:` or `data:` protocol.
**Prevention:** Always validate protocols of external URLs using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) before injecting them into `iframe` `src` or `a` `href` tags.
