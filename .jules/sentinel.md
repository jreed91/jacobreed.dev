## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in getYouTubeEmbedUrl]
**Vulnerability:** XSS vulnerability where untrusted user input from talk frontmatter (`videoUrl`) was used as the `src` attribute for an `iframe` in `app/components/TalkLayout.tsx` via `getYouTubeEmbedUrl` in `app/db/talks.ts` without protocol validation.
**Learning:** React/Next.js assumes strings used in `iframe` `src` attributes are safe if they look like URLs. Without validating the URL scheme, an attacker could supply `javascript:alert(1)` or `data:text/html,...` to execute arbitrary code within the context of the domain.
**Prevention:** Always validate dynamically generated `iframe` `src` attributes or external links against an allowlist of safe protocols (e.g., `http:`, `https:`). Using the `new URL(url, base)` constructor is a reliable way to extract and check the protocol property. Fall back to a safe URI like `about:blank` for invalid protocols.
