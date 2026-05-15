## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS/SSRF vulnerability where a user-provided or malicious `videoUrl` in MDX frontmatter for talks could bypass the YouTube regex validation in `getYouTubeEmbedUrl` and be passed directly as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`. This allowed `javascript:`, `data:`, or `vbscript:` URIs to be executed when the iframe loads.
**Learning:** `iframe src` attributes are execution vectors for URIs. A fallback return path that simply echoes the input without strict validation enables these attacks if the primary regex doesn't match. Relying on simple string matching rather than robust URL parsing often leaves gaps for bypasses (like padded whitespace).
**Prevention:** When falling back on a provided URL for `iframe src`, always parse the URL using the native `URL` constructor to reliably extract and check the `.protocol` property. Ensure it strictly matches safe protocols (like `http:` or `https:`) and fail securely by returning a safe default like `about:blank`.
