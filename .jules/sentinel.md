## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Iframe SSRF/XSS]
**Vulnerability:** XSS/SSRF vulnerability where a markdown frontmatter field `videoUrl` directly fed the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx` without protocol validation for non-YouTube links.
**Learning:** `iframe src` properties can accept unsafe `javascript:` or `data:` URIs. Using simple string methods (like regex or `startsWith`) to check for safe protocols is insufficient because whitespace padding can bypass these checks.
**Prevention:** For any URL user input used in an `iframe src`, parse it with the native `URL` constructor (providing a fallback base to catch relative paths) and strictly allow-list safe protocols like `http:` or `https:`, falling back to safe paths (e.g., `about:blank`).
