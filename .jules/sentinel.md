## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-02-27 - [Fix XSS Vulnerability in Talk Layout Iframe]
**Vulnerability:** XSS vulnerability where unsafe protocols (`javascript:`, `data:`, `vbscript:`) could be passed via `videoUrl` in MDX frontmatter to `getYouTubeEmbedUrl` and rendered as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`.
**Learning:** `iframe` `src` attributes are a powerful vector for XSS if they accept user or external content without validation. A simple fallback `return videoUrl;` allows any arbitrary protocol to execute code. Using the `URL` constructor with a base URL is a robust way to validate protocols.
**Prevention:** Always validate protocols for dynamic `iframe` sources using `new URL(url, base)` and explicitly allowlisting safe protocols like `http:` and `https:`, falling back to safe paths or `about:blank`.
