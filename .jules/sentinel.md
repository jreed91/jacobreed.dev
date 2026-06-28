## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2024-06-28 - [High] Prevent XSS in YouTube Embed URLs
**Vulnerability:** The `getYouTubeEmbedUrl` function in `app/db/talks.ts` accepted raw input and returned it unchanged if it didn't match the YouTube video regex. When this output was fed directly into an `iframe src` attribute in `TalkLayout.tsx`, it allowed for potentially executing `javascript:` or `data:` URIs, leading to Cross-Site Scripting (XSS).
**Learning:** Even fallback outputs from regex parser functions can act as injection vectors when passed into dangerous sinks like `iframe src`. We should explicitly validate the protocol of the final output. The native `URL` constructor with a safe localhost base handles checking both absolute and relative URLs robustly.
**Prevention:** Use `new URL(url, 'http://localhost')` to extract the `.protocol` property and ensure it is strictly `http:` or `https:`. Return a safe fallback like `about:blank` otherwise.
