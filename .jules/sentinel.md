## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-07-26 - [XSS via iframe src]
**Vulnerability:** The application was not validating the protocol of non-YouTube video URLs injected into the `iframe` `src` attribute within `app/components/TalkLayout.tsx`, allowing for arbitrary XSS via `javascript:` or `data:` URIs parsed from markdown frontmatter.
**Learning:** React and Next.js do not natively sanitize strings passed to `iframe` `src` attributes. Regex checks or naive `startsWith` string checks for URLs can easily be bypassed by whitespace padding.
**Prevention:** Always validate the protocol of external URLs dynamically injected into `iframe` or `href` attributes using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) to reliably check the `.protocol` property, defaulting to a safe protocol or `about:blank` for invalid inputs.
