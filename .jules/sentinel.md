## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-04-18 - [Fix Stored XSS via Malicious URIs in IFrames]
**Vulnerability:** XSS vulnerability in `getYouTubeEmbedUrl` inside `app/db/talks.ts` where the fallback URL to be rendered in an `iframe`'s `src` attribute did not have its protocol validated, allowing `javascript:` or `data:` URIs.
**Learning:** `javascript:` and `data:` URIs inside `iframe` `src` attributes can execute arbitrary JavaScript in the context of the vulnerable page. When using URLs from untrusted or user-controlled sources (like Markdown frontmatter), validating that the protocol is exactly `http:` or `https:` is required to prevent XSS.
**Prevention:** Use the `new URL(url, base)` constructor to parse external URLs safely and check their `.protocol` property, dropping anything that is not `http:` or `https:`. Do not rely solely on Regex to validate URLs, as malicious payloads can hide behind whitespace or formatting tricks.
