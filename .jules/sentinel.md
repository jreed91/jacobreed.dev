## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-06-29 - [Iframe SRC XSS via Unsafe Protocols]
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` used a regex to extract YouTube video IDs but returned the raw input URL for non-matching URLs. This raw URL was injected directly into an `iframe` `src` attribute in `TalkLayout.tsx`. If an attacker or compromised markdown file provided a `javascript:` or `data:` URI, it would be executed in the context of the domain.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes against unsafe protocols. The native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) must be used to reliably extract and check the `.protocol` property, as regex or `startsWith` checks can be bypassed by whitespace padding.
**Prevention:** Always enforce `http://` or `https://` protocol validation for dynamically generated `iframe` `src` attributes or user-provided links, or safely fall back to root-relative paths starting with `/` or `about:blank`.
