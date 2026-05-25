## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix XSS vulnerability in iframe src]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` in `app/db/talks.ts` used unvalidated frontmatter fallback `videoUrl` for iframe `src` rendering in `TalkLayout.tsx`, allowing `javascript:` URIs.
**Learning:** Returning unvalidated input that goes directly into an iframe's `src` attribute allows attackers to inject `javascript:alert(1)` to execute malicious code within the iframe.
**Prevention:** Validate the protocol of the provided URL before falling back to it for iframe `src` attributes. Only allow explicit safe protocols like `http:` and `https:`, returning `about:blank` for unsanctioned protocols.
