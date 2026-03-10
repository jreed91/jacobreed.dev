## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-09 - [Fix XSS via iframe src]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` inside `app/db/talks.ts` where the fallback URL for `iframe src` was not validated.
**Learning:** If a `videoUrl` doesn't match the YouTube regex, returning it directly and rendering it in an `iframe` allows attackers to inject `javascript:` or `data:` URIs via MDX frontmatter, which execute arbitrary code.
**Prevention:** Validate fallback URLs to ensure they only use safe protocols (`http://`, `https://`) or are relative paths (`/`). Reject all others by returning an empty string.
