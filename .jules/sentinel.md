## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-24 - XSS via Unsafe Protocols in dynamically generated iframe src
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` directly returned unvalidated `videoUrl` values for non-YouTube strings. This allowed malicious protocols like `javascript:` to be injected into the `src` attribute of `iframe` elements when rendering talk layouts.
**Learning:** React handles basic cross-site scripting (XSS) protections in text bodies but does not validate URLs dynamically passed to sensitive attributes like `href` or `iframe src`. A specific XSS pattern for this codebase includes injecting arbitrary attributes to iframes or links using unsafe URI fallback handlers.
**Prevention:** Always validate URLs dynamically generated for `iframe src` or `href` against an allowlist of safe protocols (`http:`, `https:`). When validating dynamic URLs, use the native `URL` constructor (`new URL(url, 'http://localhost')`) to securely extract and check the `.protocol` property, defaulting to `about:blank` on error.
