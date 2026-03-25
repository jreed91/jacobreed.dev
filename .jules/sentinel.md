## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2023-10-27 - [Fix iframe src XSS]
**Vulnerability:** XSS vulnerability where unsafe protocols (`javascript:`, `data:`, `vbscript:`) could be passed via the `videoUrl` frontmatter field of a Talk and directly injected into the `src` attribute of an `iframe` component.
**Learning:** `iframe src` attributes evaluate JavaScript when `javascript:` protocols are used. Validating or sanitizing external URLs supplied through Markdown metadata is critical, even when they're not explicitly `dangerouslySetInnerHTML`. Relying strictly on Next.js/React component properties doesn't protect against `src` exploits.
**Prevention:** Always validate URLs meant for `iframe src`, `a href`, or similar sensitive attributes to ensure they use allowed protocols (`http://`, `https://`) or are valid root-relative paths. Fall back to safe defaults like `about:blank` for invalid or unsafe URLs.
