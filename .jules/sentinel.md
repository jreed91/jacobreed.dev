## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-05-09 - [Fix Iframe Src XSS]
**Vulnerability:** XSS vulnerability where unvalidated user input or markdown frontmatter (e.g., `videoUrl`) could be directly interpolated into an `iframe` `src` attribute. This allows execution of arbitrary code via `javascript:` URIs.
**Learning:** Browsers execute Javascript when `javascript:` URIs are passed to `iframe` `src` attributes. Simple regex or `startsWith` checks can be bypassed by prepending whitespaces or using different casing.
**Prevention:** Always validate URLs meant for `iframe` `src` or external links by using the native `URL` constructor and strictly enforcing safe protocols like `http:` or `https:`. Fall back to `about:blank` for unsafe URIs.
