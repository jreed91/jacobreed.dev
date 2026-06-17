## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe XSS]
**Vulnerability:** XSS/SSRF via unsanitized iframe src attributes in `TalkLayout.tsx`. External/non-YouTube URLs in talk metadata (`videoUrl`) were passed unvalidated to the iframe, allowing execution of `javascript:` or injection via `data:` URLs.
**Learning:** React safely handles general text, but attributes like `src` on `iframe` or `href` on `a` tags are sensitive to the URL's protocol. Simply bypassing YouTube regex isn't enough; fallback cases must be checked.
**Prevention:** Always validate external URLs used in `iframe src` or `a href` by parsing them (e.g. `new URL(url, base)`) and ensuring the `protocol` is restricted to safe options like `http:` and `https:`, falling back to `about:blank` otherwise.
