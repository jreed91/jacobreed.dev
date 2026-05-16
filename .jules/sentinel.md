## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe SSRF/XSS in TalkLayout]
**Vulnerability:** XSS and Server-Side Request Forgery (SSRF) vulnerability. The `getYouTubeEmbedUrl` function in `app/db/talks.ts` used the raw `videoUrl` directly as a fallback if it was not a YouTube URL. This unverified fallback was directly rendered as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`. An attacker who can influence the frontmatter could provide `javascript:alert(1)` or a `data:` URI which executes JavaScript when the user loads the page.
**Learning:** `iframe` `src` attributes are sensitive execution contexts that can run arbitrary code if populated with unsafe protocols like `javascript:` or `data:`. When a dynamic input is used for a URL, always validate its protocol before embedding it.
**Prevention:** Use `new URL(url, base)` to reliably extract the protocol instead of trusting `startsWith`. If the protocol is not safe (e.g., `http:` or `https:`), use a safe fallback such as `about:blank`.
