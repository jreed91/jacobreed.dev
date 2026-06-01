## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in TalkLayout]
**Vulnerability:** XSS vulnerability where untrusted user input from `talk.metadata.videoUrl` could be embedded in an `<iframe src="...">` without protocol validation, allowing `javascript:` payloads to execute in the context of the domain.
**Learning:** Returning unvalidated fallback URLs from match functions (like `getYouTubeEmbedUrl`) and plugging them directly into iframe `src` attributes creates a dangerous injection vector. Even simple string fallbacks need robust validation.
**Prevention:** Always validate protocols for dynamic `iframe` `src` properties. Use `new URL(url, 'http://localhost')` to parse inputs safely and ensure only `http:` or `https:` protocols are returned, falling back to `about:blank`.
