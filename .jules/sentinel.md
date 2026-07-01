## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in Talk Layouts]
**Vulnerability:** XSS/SSRF vulnerability where user-provided `videoUrl` from MDX frontmatter was directly embedded into `iframe` `src` attributes without protocol validation if it didn't match the YouTube regex. This could allow execution of `javascript:` or `data:` URIs.
**Learning:** `iframe` `src` attributes are sensitive sinks. Even if a field is expected to be a standard URL (like a YouTube video link), it's essential to enforce strict protocol validation (e.g., `http:` or `https:`) because dynamic content sources (like MDX files) can be easily manipulated to include malicious payloads.
**Prevention:** Always validate protocols using the native `URL` constructor before injecting dynamic URLs into sensitive attributes like `src` or `href`. Fallback to `about:blank` or relative safe paths for non-matching protocols.
