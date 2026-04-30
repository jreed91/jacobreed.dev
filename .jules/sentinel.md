## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where untrusted URLs provided in frontmatter (like `javascript:alert(1)`) were injected directly into the `src` attribute of an `iframe` via `getYouTubeEmbedUrl` in `app/db/talks.ts`.
**Learning:** `iframe` `src` attributes can execute arbitrary JavaScript if the protocol is `javascript:`. Even seemingly innocent link handling can be an attack vector if data is user-controlled or malicious content enters the system via external sources like MDX files.
**Prevention:** Always validate the protocol of dynamically generated or external URLs using the native `URL` constructor. If the URL doesn't use `http:` or `https:`, return a safe fallback like `about:blank`.
