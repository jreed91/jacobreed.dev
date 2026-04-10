## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-04-10 - [Fix XSS via iframe src URI Fallback]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` in `app/db/talks.ts` blindly returned non-YouTube strings unmodified, which were then used as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`. This allowed arbitrary JS execution via `javascript:` URIs provided in MDX frontmatter.
**Learning:** Returning unvalidated fallbacks for URLs used in active DOM contexts like `iframe src` or `a href` creates XSS vectors. Simple string matching is insufficient for protocol validation since whitespace padding (e.g. `   javascript:`) can bypass it.
**Prevention:** Always parse and validate URIs before rendering them in sensitive attributes. Use the native `URL` constructor with a dummy base (e.g., `new URL(uri, 'http://localhost')`) to reliably extract and validate the `.protocol` property against a strict allowlist (like `http:` and `https:`), and fail securely by falling back to `about:blank`.
