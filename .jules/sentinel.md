## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-14 - [XSS via Unsafe iframe src]
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` returned `videoUrl` directly if it didn't match the YouTube regex, allowing MDX authors to potentially inject unsafe protocols like `javascript:` or `data:` into the `iframe` `src` attribute in `app/components/TalkLayout.tsx`.
**Learning:** User-provided URLs (or markdown frontmatter URLs) used in `href` or `src` attributes must always be validated against an allowlist of safe protocols (`http:`, `https:`) or verified as relative paths. Falling back to an empty string `""` on error can cause iframe recursive loading; returning `"about:blank"` is safer.
**Prevention:** Use `new URL(url, "http://localhost")` to safely parse URLs and check `url.protocol` against `["http:", "https:"]`, explicitly handling root-relative paths. Return `about:blank` for invalid URLs.