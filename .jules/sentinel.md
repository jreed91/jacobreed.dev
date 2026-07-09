## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-07-09 - [Prevent XSS via IFRAME SSRF]
**Vulnerability:** The YouTube embed fallback logic in `app/db/talks.ts` used the original URL dynamically in an `iframe` `src` attribute without verifying the scheme/protocol. This permitted `javascript:alert(1)` or `data:` payloads resulting in XSS if an attacker controls MDX frontmatter.
**Learning:** React elements like `<iframe src={...}>` do not natively sanitize URL protocols for execution contexts like scripts. Do not rely on Regex alone for complex scheme enforcement. Using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) with an explicitly checked `.protocol` is more robust against bypasses (e.g., whitespaces before `javascript:`).
**Prevention:** Always parse untrusted or fallback URLs bound to iframe `src`, anchor `href`, or `object` `data` tags. Block schemas other than `http:`, `https:`, or safe application-specific protocols.
