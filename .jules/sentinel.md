## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS Vulnerability in iframe src attributes]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` in `app/db/talks.ts` directly returned unvalidated non-YouTube URLs. This allowed attackers to provide `javascript:` or `data:` URLs via MDX frontmatter, which were then used directly in the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`.
**Learning:** `iframe` `src` attributes (and `a` tag `href`s) are powerful injection points for XSS if they evaluate `javascript:` or malicious `data:` URIs. Even if data originates from Markdown frontmatter, it should never be assumed safe if it dictates security-critical attributes.
**Prevention:** Always validate external URL protocols when assigning to `src` or `href`. The native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) provides a reliable way to extract the `.protocol` property and strictly enforce an allowlist of `http:` and `https:`. Return `about:blank` for safe fallback when encountering unknown protocols or invalid inputs.
