## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-28 - [XSS via Unvalidated Iframe Fallback Source]
**Vulnerability:** Cross-Site Scripting (XSS) and SSRF vulnerability in `TalkLayout.tsx` where an attacker could provide a malicious `javascript:` or `data:` URL in the MDX frontmatter `videoUrl` field. `getYouTubeEmbedUrl` failed to validate the URL schema for non-YouTube fallbacks, allowing arbitrary script execution when the payload was passed to the `iframe src` attribute.
**Learning:** Fallbacks from parsed external inputs into `iframe` tags must validate URL schemes. Using the native `URL` constructor to enforce `http:`, `https:`, or root-relative paths prevents execution of `javascript:` or `data:` URIs and ensures isolation.
**Prevention:** Always validate URL schemes (using the native `URL` constructor, not Regex) before assigning external input to potentially dangerous DOM attributes like `iframe src` or `a href`. If the scheme is invalid, fallback to `about:blank`.
