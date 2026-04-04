## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in Talk Layout]
**Vulnerability:** XSS vulnerability in `app/db/talks.ts` where unvalidated external fallback URLs could be used as an iframe `src` attribute in `app/components/TalkLayout.tsx`. If a user specifies a `javascript:` or `data:` URI, it could lead to script execution.
**Learning:** Content that populates `iframe src` attributes must be validated against a whitelist of safe protocols. Unvalidated input falling through to the `src` attribute is dangerous.
**Prevention:** Always validate and enforce `http://`, `https://`, or root-relative (`/`) prefixes for user-controlled fallback URLs that populate iframe or link locations, defaulting to `about:blank` for safe failure.
