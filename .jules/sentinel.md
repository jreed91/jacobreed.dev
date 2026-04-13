## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS via iframe src]
**Vulnerability:** XSS vulnerability in `TalkLayout.tsx` where an untrusted fallback `videoUrl` could be passed to an `iframe`'s `src` attribute without protocol validation.
**Learning:** `iframe` `src` attributes are vulnerable to `javascript:` and `data:` URIs. Simple regex or `startsWith` checks can be bypassed (e.g. by padding with whitespace). The native `URL` constructor is a reliable way to extract and validate the `.protocol` property.
**Prevention:** Always parse untrusted URIs using the `URL` constructor and enforce an allowlist of safe protocols (`http:`, `https:`). Explicitly handle root-relative paths or fallback safely to `about:blank`.
