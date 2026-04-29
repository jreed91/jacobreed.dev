## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix URL Protocol XSS in iframes]
**Vulnerability:** XSS via unsafe URL protocols (`javascript:`, `data:`) in dynamic `iframe` `src` attributes generated from user-provided MDX frontmatter (`videoUrl`).
**Learning:** Checking for safe URL protocols must use the `URL` constructor (e.g. `new URL(url, 'http://localhost')`) because simple string matching or regex can be bypassed using whitespace padding (like `   javascript:alert(1)`).
**Prevention:** Always validate protocols dynamically using the native `URL` parsing API before using unverified inputs in `iframe` or `a` tags, falling back to a safe default like `about:blank`.
