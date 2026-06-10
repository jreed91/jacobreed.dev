## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-06-10 - [XSS via iframe src in TalkLayout]
**Vulnerability:** XSS vulnerability in `app/components/TalkLayout.tsx` where an `iframe` `src` attribute was populated using `talk.metadata.videoUrl` (via `getYouTubeEmbedUrl` fallback) without validating the URL protocol. This allowed attackers to inject `javascript:` URIs via MDX frontmatter.
**Learning:** React does not automatically block `javascript:` or `data:` URIs in `iframe` `src` attributes. Any user-provided or externally sourced URL used as an `href` or `src` must be validated to ensure it uses a safe protocol (`http:` or `https:`, or safe relative paths).
**Prevention:** Use the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to reliably extract and validate the `.protocol` property of the URL before using it in sensitive attributes. Fallback to `about:blank` for invalid protocols.
