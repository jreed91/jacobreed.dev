## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS]
**Vulnerability:** XSS vulnerability where untrusted user input from MDX frontmatter `videoUrl` could bypass the YouTube regex check in `getYouTubeEmbedUrl` and fallback directly into an `iframe src` attribute in `app/components/TalkLayout.tsx`. This allowed unsafe protocols like `javascript:alert(1)` or `data:text/html,<script>alert(1)</script>` to be executed.
**Learning:** React safely handles strings in text content, but attributes like `href` or `src` require their own protocol-level validation if they can be influenced by malicious content.
**Prevention:** Always validate URLs that flow into sensitive attributes (like `src`, `href`) to ensure they use a safe protocol (`http:` or `https:`) using the native `URL` constructor (`new URL(url, 'http://localhost')`), returning a safe fallback (e.g. `'about:blank'`) if validation fails.
