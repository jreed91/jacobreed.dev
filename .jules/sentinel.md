## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS via video embed URL in iframe]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would blindly return an unsanitized video URL, which is placed inside an iframe's `src` attribute. This allowed `javascript:alert(1)` to be executed if a malicious user updated the markdown's `videoUrl`.
**Learning:** Iframes can execute JavaScript code if their `src` attribute is set to `javascript:...`. Furthermore, using `data:text/html,...` can run arbitrary code or render anything. You must enforce that the URLs originate from a safe protocol (e.g., `http://` or `https://`) or are an absolute path.
**Prevention:** Always sanitize dynamically constructed iframe URLs by testing if they start with `http://`, `https://`, or `/`. Fall back to `about:blank` or block the render entirely.
