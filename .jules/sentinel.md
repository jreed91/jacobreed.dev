## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix SSRF/XSS in Iframe SRC via Fallback]
**Vulnerability:** XSS and SSRF vulnerability in `app/db/talks.ts` where an unvalidated `videoUrl` was used as a direct fallback for the `<iframe>` `src` attribute if it did not match a YouTube pattern.
**Learning:** Using untrusted data directly in an `<iframe>` `src` allows execution of `javascript:` or `data:` URIs, leading to XSS. Regular expression checks may fail to match, unexpectedly falling back to the original payload.
**Prevention:** Always parse and validate protocols using `new URL(url, 'http://localhost')` when accepting arbitrary input for `src` attributes. Only allow explicit safe protocols like `http:` and `https:`, or fallback to `about:blank`.
