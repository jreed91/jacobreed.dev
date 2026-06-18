## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in Talks]
**Vulnerability:** XSS vulnerability where unvalidated `videoUrl` values from MDX frontmatter were directly assigned to an `iframe`'s `src` attribute in `app/components/TalkLayout.tsx` without proper protocol validation.
**Learning:** Even internal content sources like markdown frontmatter can be an attack vector (e.g. from contributors or dynamic ingestion) if rendered into sensitive attributes like `src` or `href`. If a user injects `javascript:alert(1)`, the script will execute in the user's browser.
**Prevention:** Always validate URLs using the `URL` constructor to ensure they use a safe protocol (e.g., `http:` or `https:`) before using them in `iframe` or dynamic anchors. Unsafe payloads should be rejected or fallback to `about:blank`.
