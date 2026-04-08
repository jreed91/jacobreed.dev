## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-04-08 - [Prevent XSS in dynamically generated iframe sources]
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` used a frontmatter URL (`videoUrl`) as a fallback value directly in an iframe's `src` attribute. This could lead to Cross-Site Scripting (XSS) if an unsafe protocol like `javascript:` or `data:` was provided.
**Learning:** Even if an input is expected to be a YouTube embed URL, fallbacks passed to sensitive contexts (like `iframe` `src`) must strictly validate protocols to block execution of potentially malicious payload.
**Prevention:** Always parse untrusted or fallback URLs (e.g. using `new URL(url, 'http://localhost')`) and strictly enforce safe protocols (`http:`, `https:`) or specific safe relative paths before embedding them in an iframe.
