## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix Iframe SRC XSS Fallback]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` inside `app/db/talks.ts` where fallback non-YouTube URLs were returned directly. When bound to an `iframe src` in `app/components/TalkLayout.tsx`, this allowed execution of `javascript:` or `data:` URIs if supplied via Markdown frontmatter.
**Learning:** Returning unvalidated fallback URLs for `iframe` `src` attributes is a significant XSS risk. Attackers can pad protocols (e.g., ` javascript:`) to bypass naive regex or `startsWith` checks, making proper parsing via the `URL` API critical.
**Prevention:** Always validate URL protocols using `new URL(url, 'http://localhost')` when accepting arbitrary links or iframe sources. Ensure the `.protocol` is strictly `http:` or `https:`, allowing local relative paths, while blocking unsafe protocols.
