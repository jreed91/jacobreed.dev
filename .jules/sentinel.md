## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS in Iframe src via talks]
**Vulnerability:** XSS vulnerability where non-YouTube URLs passed to `getYouTubeEmbedUrl` were blindly returned and injected into an `iframe`'s `src` attribute. This allowed execution of arbitrary scripts via `javascript:` URIs.
**Learning:** React does not natively sanitize the `src` attribute of an `iframe`. Always validate external URLs or user inputs injected into `iframe` `src` properties.
**Prevention:** Use the native `URL` constructor (e.g. `new URL(url, 'http://localhost')`) to reliably check the `.protocol` property, ensuring it is `http:` or `https:` before rendering, and falling back to a safe default like `about:blank`.
