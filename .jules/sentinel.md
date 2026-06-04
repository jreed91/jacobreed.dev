## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Fix iframe src XSS in Talk Layouts]
**Vulnerability:** XSS/SSRF vulnerability where user-provided `videoUrl` values from talk frontmatter were directly interpolated into `iframe` `src` attributes without protocol validation. This allowed an attacker to potentially supply `javascript:` or `data:` URIs via markdown files, which would execute upon viewing the talk page.
**Learning:** Even URLs meant to be parsed by regexes (like YouTube URLs) have a fallback path. If the regex doesn't match, returning the raw string into an `iframe` opens up XSS opportunities.
**Prevention:** Always validate URL protocols using the native `URL` constructor (e.g., `new URL(url, 'http://localhost')`) before injecting them into `src` or `href` attributes. Ensure only `http:` and `https:` protocols are permitted, or safely fallback to `about:blank`.
