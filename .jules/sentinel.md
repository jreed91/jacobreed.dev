## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS in Talks]
**Vulnerability:** XSS vulnerability where user-provided `videoUrl` in talk MDX files was directly embedded into `<iframe> src` attributes without protocol validation.
**Learning:** External links sourced from MDX frontmatter (e.g., `videoUrl` fallback in `getYouTubeEmbedUrl`) must enforce `http://` or `https://` protocol validation to prevent `javascript:` or `data:` payloads from being executed in the context of the application when loaded in an iframe.
**Prevention:** Always validate URL protocols using the native `URL` constructor (`new URL(url, 'http://localhost')`) before using them in dynamic `iframe` `src` attributes, explicitly rejecting unsafe schemas and falling back to `about:blank`.
