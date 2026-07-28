## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.
## 2025-02-14 - Prevent XSS in YouTube Embeds
**Vulnerability:** XSS vulnerability in Talk layout via `getYouTubeEmbedUrl`. The function fell back to returning the unsanitized `videoUrl` directly for non-YouTube strings. If a malicious user controlled the markdown frontmatter, they could inject `javascript:` or `data:` URLs into the `src` attribute of the `iframe` in `TalkLayout.tsx`.
**Learning:** Returning strings directly for external links or `iframe` sources without validating the protocol is dangerous. Even with a regex that matches valid domains (like YouTube), the fallback path must also be sanitized.
**Prevention:** Always validate protocols of fallback URLs for `iframe` `src` attributes or dynamic links using `new URL()` to enforce safe schemes like `http:` or `https:`. Reject or neutralize other protocols (like `javascript:`).
