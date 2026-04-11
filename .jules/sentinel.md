## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2026-04-11 - [Fix iframe src XSS vector]
**Vulnerability:** XSS vulnerability where `getYouTubeEmbedUrl` would return the raw string passed via MDX frontmatter directly into an `<iframe src="...">` without validation. If the string was an unsafe URI scheme like `javascript:`, the browser could execute the payload when the iframe renders or interacts.
**Learning:** `iframe` `src` attributes are sensitive execution contexts. Relying on Regex to match valid URLs is insufficient if you allow the raw input to pass through as a fallback, as malicious payloads can completely bypass the Regex and be directly injected.
**Prevention:** Use the native `URL` constructor (e.g. `new URL(url, 'http://localhost')`) to validate the protocol of user-provided strings used in `iframe` or `a` tags, specifically enforcing `http:` or `https:`. Additionally, handle safe root-relative fallbacks explicitly, defaulting to `about:blank` on failure.
