## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## $(date +%Y-%m-%d) - [Fix XSS vulnerability in talks iframe fallback URL]
**Vulnerability:** XSS vulnerability in `TalkLayout.tsx` where a malformed `videoUrl` could be mapped directly to an `iframe` `src` attribute containing unsafe URI schemes like `javascript:`.
**Learning:** `iframe` `src` attributes do not automatically sanitize unsafe protocols. If user input or MDX frontmatter overrides a URL without standardizing it, malicious payloads like `javascript:alert(1)` could execute scripts within the iframe's context.
**Prevention:** Always validate external URL protocols when dynamically passing them to `iframe` `src` or `<Link>` parameters using the `new URL(url, 'http://localhost')` pattern and only allow `http:` or `https:`. Fallback to `about:blank` for safe defaults.
