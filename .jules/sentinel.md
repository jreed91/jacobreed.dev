## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Sanitize iframe src URL to prevent XSS]
**Vulnerability:** The `videoUrl` read from MDX frontmatter in `app/db/talks.ts` was not sanitized before being injected into the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`. If an attacker were able to provide a URL starting with `javascript:` or `data:`, it could execute malicious JavaScript within the application context.
**Learning:** `iframe` `src` attributes are a prime target for XSS if unvalidated input is passed to them. Next.js does not sanitize these values automatically. Additionally, parsing URLs utilizing `new URL()` with a base URL is a robust way to validate their protocol rather than relying on brittle string prefix matching.
**Prevention:** Validate protocols for dynamic `iframe` `src` attributes. Only allow `http:` or `https:` protocols and fallback to a safe placeholder like `about:blank`. Use the native `URL` constructor for robust validation.
