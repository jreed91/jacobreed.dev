## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-05-18 - XSS Vulnerability in YouTube Embeds
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` extracts a YouTube video ID using a regex. If the regex does not match, it returns the original `videoUrl` unchanged. This returned URL is then used directly as the `src` attribute of an `iframe` in `app/components/TalkLayout.tsx`. An attacker who can control the markdown frontmatter (or if it comes from an untrusted source) can set `videoUrl: 'javascript:alert(1)'` which bypasses the regex and gets injected directly into the iframe `src`, leading to Cross-Site Scripting (XSS).
**Learning:** Fallback logic in URL parsers must enforce safe protocols (like `http:` or `https:`) before using the output in dangerous attributes like `href` or `src`. Returning the raw unvalidated string opens up XSS via `javascript:` or `data:` URIs.
**Prevention:** If the URL does not match expected patterns, validate that it uses an allowed protocol before returning it, or return an empty string/safe default.
