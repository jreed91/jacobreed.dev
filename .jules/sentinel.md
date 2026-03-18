## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-03-18 - [Fix XSS via Unsafe iframe SRC in Talks]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would return arbitrary strings directly to an `iframe src` if the string didn't match a YouTube URL. This allows malicious MDX frontmatter to inject `javascript:` or `data:` URIs into the iframe.
**Learning:** Fallback return values for URL processing functions must still enforce basic protocol validation (`http://`, `https://`, or root-relative `/`). Even if user input is intended to be a benign URL, any field that eventually sets an `href` or `src` is an XSS vector if not validated.
**Prevention:** Always validate that URLs constructed from unsanitized sources use safe protocols. If a URL is invalid or unsafe, fallback to `about:blank` or an empty string, rather than returning the input unchanged.
