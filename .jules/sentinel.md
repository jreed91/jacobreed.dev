## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS in TalkLayout via getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability where non-YouTube fallback URLs parsed from markdown frontmatter were directly assigned to the `src` attribute of an `<iframe>` in `TalkLayout`. By supplying a payload like `javascript:alert(1)`, arbitrary code execution could occur.
**Learning:** Returning unvalidated input strings as a fallback URL is dangerous when interpolated into security-sensitive contexts like `<iframe>` `src` or `<a>` `href` properties.
**Prevention:** Validate user-supplied URLs using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to ensure the resolved protocol is either `http:` or `https:`. If validation fails (or for malicious schemes like `javascript:`), return a safe fallback like `about:blank`.
