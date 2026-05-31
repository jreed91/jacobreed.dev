## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-05-31 - [HIGH] XSS via Unsafe iframe src
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` accepted arbitrary URLs as fallbacks and passed them directly to the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`. An attacker could exploit this to inject unsafe URIs like `javascript:` or `data:`, leading to a Cross-Site Scripting (XSS) vulnerability.
**Learning:** React's native protections don't validate `iframe src` attributes against unsafe URI schemes (like `javascript:`). Any external URLs provided to iframes or links must be explicitly sanitized to ensure they use a safe protocol.
**Prevention:** Validate protocols using the native `URL` constructor with a safe fallback base (e.g., `new URL(url, 'http://localhost')`). Ensure the parsed `.protocol` is strictly `http:` or `https:`. If the URL represents an unsafe scheme, fallback to a safe default like `about:blank`.
