## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-24 - [Fix] SSRF/XSS in Talk Video URL Fallback
**Vulnerability:** The `getYouTubeEmbedUrl` function returned the original user-provided `videoUrl` directly if it didn't match the YouTube regex. This URL was directly used in the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`, allowing arbitrary protocols like `javascript:` and `data:`, leading to Cross-Site Scripting (XSS).
**Learning:** `iframe src` attributes are execution vectors if arbitrary protocols aren't strictly checked. Regex validation for one domain doesn't secure the fallback case.
**Prevention:** Use the `URL` constructor to reliably validate `.protocol` properties on raw string URLs. Allow only `http:` and `https:`, failing securely to `about:blank`.
