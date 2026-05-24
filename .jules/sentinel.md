## 2025-03-03 - [Fix JSON-LD XSS]
**Vulnerability:** XSS vulnerability where standard `JSON.stringify` was used in `dangerouslySetInnerHTML` for JSON-LD `<script type="application/ld+json">` tags in `app/blog/[slug]/page.tsx`.
**Learning:** React/Next.js assumes strings inside `dangerouslySetInnerHTML` are safe. Using `JSON.stringify` does not escape `<` or `>` characters, allowing attackers to close the script tag early with `</script>` and execute arbitrary code if malicious content gets into the metadata.
**Prevention:** Always use a utility like `safeJsonStringify` which replaces `<` with `\u003c`, `>` with `\u003e`, and `&` with `\u0026` before injecting JSON into `<script>` tags.

## 2025-03-03 - [Stored XSS via Iframe Fallback URIs]
**Vulnerability:** XSS vulnerability where untrusted user input from MDX frontmatter (`videoUrl`) was embedded directly into an `iframe` `src` attribute as a fallback in `getYouTubeEmbedUrl` inside `app/db/talks.ts` without validating the protocol. This allowed malicious payloads like `javascript:alert(1)`.
**Learning:** Returning unvalidated input as a fallback URL is dangerous when the URL is rendered in executable contexts like `iframe src` or `a href`. Standard Regex matching may miss malformed or cleverly padded URIs.
**Prevention:** Always validate URLs using the native `URL` constructor (with a safe base like `http://localhost` for relative paths) and explicitly check that the `.protocol` is `http:` or `https:` before returning the URL, otherwise fallback to a safe default like `about:blank`.
