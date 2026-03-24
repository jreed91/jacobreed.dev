## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe XSS via unsafe video URLs]
**Vulnerability:** XSS vulnerability where unvalidated `videoUrl` fields from MDX frontmatter were injected directly into an `iframe`'s `src` attribute in `app/components/TalkLayout.tsx`.
**Learning:** Next.js and React do not automatically validate `src` attributes of `iframes`. Attackers could use `javascript:` or `data:` URIs in the frontmatter `videoUrl` to bypass the YouTube regex and achieve arbitrary script execution when the iframe renders.
**Prevention:** Always validate external URLs to enforce safe protocols (`http://` or `https://`) or allow root-relative paths. If validation fails, provide a safe fallback like `about:blank` instead of returning the original unsafe user input.
